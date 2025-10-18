"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, ArrowDown, ThumbsUp, Paperclip } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { db } from '@/services/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, setDoc, getDocs, writeBatch } from 'firebase/firestore';

import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';

const useIsMounted = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    return isMounted;
};


export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);
  const [showScrollDown, setShowScrollDown] = useState(false);
  
  const viewportRef = useRef(null);
  const fileInputRef = useRef(null);
  const isMounted = useIsMounted();

  const welcomeMessage = {
    id: 'welcome-message',
    text: 'আসসালামু আলাইকুম, Ponno Kenakata- তে আপনাকে স্বাগতম। কিভাবে সহযোগিতা করতে পারি?',
    sender: 'admin',
    timestamp: new Date(),
  };
  
  useEffect(() => {
    if (isMounted) {
        let localSessionId = localStorage.getItem('chatSessionId');
        if (!localSessionId) {
          localSessionId = doc(collection(db, 'chatSessions')).id;
          localStorage.setItem('chatSessionId', localSessionId);
        }
        setSessionId(localSessionId);

        const timer = setTimeout(() => {
            if(!isOpen && showWelcomeBubble) {
              setShowWelcomeBubble(true);
            }
        }, 1500);
        
        return () => {
            clearTimeout(timer);
        };
    }
  }, [isMounted, isOpen, showWelcomeBubble]);

  const scrollToBottom = (behavior = 'auto') => {
      if (viewportRef.current) {
          viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior });
      }
  };

  useEffect(() => {
    if (!sessionId) {
        setMessages([welcomeMessage]);
        return;
    };

    const sessionRef = doc(db, 'chatSessions', sessionId);
    setDoc(sessionRef, { 
        createdAt: serverTimestamp(),
        lastMessageTimestamp: serverTimestamp(),
    }, { merge: true });


    const messagesQuery = query(collection(db, `chatSessions/${sessionId}/messages`), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(messagesQuery, async (querySnapshot) => {
      const firestoreMessages = [];
      let unreadCount = 0;
      
      const isScrolledToBottom = viewportRef.current ?
          Math.abs(viewportRef.current.scrollHeight - viewportRef.current.clientHeight - viewportRef.current.scrollTop) < 10
          : true;

      querySnapshot.forEach((doc) => {
          const msg = { id: doc.id, ...doc.data() }
          firestoreMessages.push(msg);
          if (!isOpen && msg.sender === 'admin' && !msg.read) {
              unreadCount++;
          }
      });
      
      setMessages([welcomeMessage, ...firestoreMessages]);
      setUnreadMessages(unreadCount);

      if (isOpen) {
        const batch = writeBatch(db);
        let hasUnread = false;
        querySnapshot.forEach(docSnap => {
            const msg = docSnap.data();
            if (msg.sender === 'admin' && !msg.read) {
                batch.update(docSnap.ref, { read: true });
                hasUnread = true;
            }
        });
        if (hasUnread) {
            await batch.commit();
        }
        await setDoc(doc(db, 'chatSessions', sessionId), { hasUnreadAdminMessage: false }, { merge: true });
      }
      
      if (isOpen) {
        if (querySnapshot.docChanges().some(change => change.type === 'added')) {
          if(isScrolledToBottom) {
              setTimeout(() => scrollToBottom(), 100);
          } else {
              setShowScrollDown(true);
          }
        }
      }


    }, (error) => {
        console.error("Error fetching messages:", error);
        setMessages([welcomeMessage]);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, isOpen]);


  const sendMessage = async (messageText) => {
    if (!messageText.trim() || !sessionId) return;
  
    const messageData = {
      text: messageText,
      sender: 'customer',
      timestamp: serverTimestamp(),
    };
  
    try {
      await addDoc(collection(db, `chatSessions/${sessionId}/messages`), messageData);
      await setDoc(doc(db, 'chatSessions', sessionId), {
        lastMessageTimestamp: serverTimestamp(),
        lastMessage: messageText,
        hasUnreadCustomerMessage: true,
      }, { merge: true });
    } catch (error) {
      console.error("Failed to send message: ", error);
      // Optionally, handle the error in the UI, e.g., show a toast notification
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const currentMessage = newMessage;
    setNewMessage('');
    await sendMessage(currentMessage);
  };

  const handleLikeSend = () => {
    sendMessage("👍");
  }

  const handleFileClick = () => {
      fileInputRef.current?.click();
  }

  const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
          // TODO: Implement file upload to Firebase Storage
          console.log("Selected file:", file.name);
          alert("File upload functionality is not yet implemented.");
      }
  }
  
  const toggleChat = () => {
    const newIsOpenState = !isOpen;
    setIsOpen(newIsOpenState);
    if (newIsOpenState) {
        setShowWelcomeBubble(false);
        setUnreadMessages(0);
        setTimeout(() => scrollToBottom(), 250);
    }
  };
  
  const handleScroll = (e) => {
    const target = e.target;
    const isScrolledToBottom = Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) < 10;
    setShowScrollDown(!isScrolledToBottom);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-8 left-8 z-50">
        <AnimatePresence>
            {isOpen && (
                 <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="w-[280px] sm:w-[320px] h-[400px] sm:h-[420px] bg-background rounded-lg shadow-2xl border flex flex-col absolute bottom-20 left-0"
                >
                    <header className="flex items-center justify-between p-3 border-b bg-primary text-primary-foreground rounded-t-lg">
                        <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-sm">Live Chat</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={toggleChat} className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground h-7 w-7">
                            <X className="h-5 w-5" />
                        </Button>
                    </header>
                    <div className="flex-grow p-4 bg-secondary/30 relative overflow-hidden">
                        <ScrollArea className="h-full" viewportRef={viewportRef} onScroll={handleScroll}>
                            <div className="space-y-3 pr-2">
                                {messages.map(msg => (
                                <div key={msg.id} className={cn("flex items-end gap-2 text-sm", msg.sender === 'customer' ? 'justify-end' : 'justify-start')}>
                                    {msg.sender === 'admin' && <Avatar className="h-6 w-6"><AvatarFallback className="text-xs">A</AvatarFallback></Avatar>}
                                    <p className={cn("px-2.5 py-1.5 rounded-lg max-w-xs shadow-sm", msg.sender === 'customer' ? 'bg-primary text-primary-foreground' : 'bg-background')}>
                                    {msg.text}
                                    </p>
                                </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <AnimatePresence>
                        {showScrollDown && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-2 left-1/2 -translate-x-1/2"
                            >
                                <Button 
                                    size="icon" 
                                    className="rounded-full h-8 w-8 shadow-lg"
                                    onClick={() => scrollToBottom('smooth')}
                                >
                                    <ArrowDown className="h-4 w-4"/>
                                </Button>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    <form onSubmit={handleSendMessage} className="p-2 border-t flex items-center gap-1 bg-background">
                         <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={handleFileClick}>
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                        <Input
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            placeholder="Type..."
                            autoComplete="off"
                            className="h-8 text-sm"
                        />
                         <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={handleLikeSend}>
                            <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button type="submit" size="icon" className="h-8 w-8">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>

        <AnimatePresence>
            {!isOpen && showWelcomeBubble && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute bottom-full left-0 mb-2 w-64 bg-background border rounded-lg shadow-lg p-3 text-sm"
                >
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => setShowWelcomeBubble(false)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    <p className="pr-4">{welcomeMessage.text}</p>
                </motion.div>
            )}
        </AnimatePresence>
        
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <Button
                onClick={toggleChat}
                className="w-14 h-14 rounded-full shadow-lg relative"
            >
                {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
                {!isOpen && unreadMessages > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-6 w-6 justify-center p-0 bg-accent text-accent-foreground">{unreadMessages}</Badge>
                )}
            </Button>
        </motion.div>
    </div>
  );
}

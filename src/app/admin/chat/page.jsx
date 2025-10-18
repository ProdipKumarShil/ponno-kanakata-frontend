"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { db } from '@/services/firebase';
import { collection, query, onSnapshot, orderBy, doc, getDoc, addDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Paperclip, Send, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isToday, isYesterday } from 'date-fns';

export default function AdminChatPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const content = {
      en: {
          conversations: "Conversations",
          user: "User",
          typeMessage: "Type your message...",
          selectConversation: "Select a conversation to start chatting",
          fileUploadNotImplemented: "File upload functionality is not yet implemented."
      },
      bn: {
          conversations: "কথোপকথন",
          user: "ব্যবহারকারী",
          typeMessage: "আপনার বার্তা টাইপ করুন...",
          selectConversation: "চ্যাট শুরু করতে একটি কথোপকথন নির্বাচন করুন",
          fileUploadNotImplemented: "ফাইল আপলোড কার্যকারিতা এখনও প্রয়োগ করা হয়নি।"
      }
  }
  const t = content[language];

  useEffect(() => {
    const q = query(collection(db, 'chatSessions'), orderBy('lastMessageTimestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sessionsData = [];
      querySnapshot.forEach((doc) => {
        sessionsData.push({ id: doc.id, ...doc.data() });
      });
      setSessions(sessionsData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedSessionId) {
      const q = query(collection(db, `chatSessions/${selectedSessionId}/messages`), orderBy('timestamp', 'asc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() });
        });
        setMessages(messagesData);
      });

      // Mark messages as read by admin when session is selected
      const sessionRef = doc(db, 'chatSessions', selectedSessionId);
      setDoc(sessionRef, { hasUnreadCustomerMessage: false }, { merge: true });

      return () => unsubscribe();
    }
  }, [selectedSessionId]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedSessionId || !user) return;
    
    const messageText = newMessage;
    setNewMessage('');

    const messageData = {
      text: messageText,
      sender: 'admin',
      adminName: user.displayName,
      adminAvatar: user.photoURL,
      timestamp: serverTimestamp(),
      read: false, // Customer has not read it yet
    };

    await addDoc(collection(db, `chatSessions/${selectedSessionId}/messages`), messageData);
    await setDoc(doc(db, 'chatSessions', selectedSessionId), {
      lastMessageTimestamp: serverTimestamp(),
      lastMessage: messageText,
      hasUnreadCustomerMessage: false, // Admin is replying, so customer unread is false
      hasUnreadAdminMessage: true, // New message from admin for customer to read
    }, { merge: true });
  };
  
  const handleLikeSend = async () => {
    if (!selectedSessionId || !user) return;
    const messageData = {
      text: "👍",
      sender: 'admin',
      adminName: user.displayName,
      adminAvatar: user.photoURL,
      timestamp: serverTimestamp(),
      read: false,
    };
    await addDoc(collection(db, `chatSessions/${selectedSessionId}/messages`), messageData);
    await setDoc(doc(db, 'chatSessions', selectedSessionId), {
      lastMessageTimestamp: serverTimestamp(),
      lastMessage: "👍",
      hasUnreadCustomerMessage: false,
      hasUnreadAdminMessage: true,
    }, { merge: true });
  };

  const handleFileClick = () => {
      fileInputRef.current?.click();
  }

  const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
          console.log("Selected file:", file.name);
          alert(t.fileUploadNotImplemented);
      }
  }
  
  const formatTimestamp = (timestamp) => {
      if (!timestamp?.toDate) return '';
      const date = timestamp.toDate();
      if (isToday(date)) return format(date, 'p');
      if (isYesterday(date)) return 'Yesterday';
      return format(date, 'dd/MM/yyyy');
  }

  const selectedSession = useMemo(() => {
      return sessions.find(s => s.id === selectedSessionId)
  }, [sessions, selectedSessionId]);

  const handleSelectSession = (sessionId) => {
      setSelectedSessionId(sessionId);
      const sessionRef = doc(db, 'chatSessions', sessionId);
      setDoc(sessionRef, { hasUnreadCustomerMessage: false }, { merge: true });
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      <Card className="w-1/3 flex flex-col">
        <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-8rem)]">
                 <div className="p-3 border-b">
                    <h2 className="text-xl font-semibold">{t.conversations}</h2>
                 </div>
                {sessions.map(session => (
                <div
                    key={session.id}
                    className={cn(
                    "flex items-center gap-3 p-3 cursor-pointer hover:bg-secondary border-b",
                    selectedSessionId === session.id && "bg-secondary"
                    )}
                    onClick={() => handleSelectSession(session.id)}
                >
                    <Avatar>
                        <AvatarFallback>{session.id.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow overflow-hidden">
                        <div className="flex justify-between">
                            <p className="font-semibold truncate text-sm">{`${t.user}: ${session.id.substring(0, 8)}...`}</p>
                             <p className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatTimestamp(session.lastMessageTimestamp)}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground truncate">{session.lastMessage}</p>
                            {session.hasUnreadCustomerMessage && <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 ml-2"></span>}
                        </div>
                    </div>
                </div>
                ))}
            </ScrollArea>
        </CardContent>
      </Card>
      <Card className="w-2/3 flex flex-col">
        {selectedSessionId ? (
          <>
            <div className="p-3 border-b flex items-center gap-3">
                 <Avatar>
                    <AvatarFallback>{selectedSession?.id.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                     <p className="font-semibold">{`${t.user}: ${selectedSession?.id.substring(0, 8)}...`}</p>
                     {/* User details can be added here */}
                </div>
            </div>
            <ScrollArea className="flex-grow p-4 bg-secondary/30">
                <div className="space-y-4">
                    {messages.map(msg => (
                    <div key={msg.id} className={cn("flex items-end gap-2 text-sm", msg.sender === 'admin' ? 'justify-end' : 'justify-start')}>
                        {msg.sender === 'customer' && <Avatar className="h-6 w-6"><AvatarFallback className="text-xs">C</AvatarFallback></Avatar>}
                        <div className={cn("px-3 py-2 rounded-lg max-w-sm shadow-sm", msg.sender === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-background')}>
                            <p>{msg.text}</p>
                        </div>
                        {msg.sender === 'admin' && <Avatar className="h-6 w-6"><AvatarImage src={user?.photoURL || undefined} /><AvatarFallback className="text-xs">A</AvatarFallback></Avatar>}
                    </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="p-3 border-t flex items-center gap-2 bg-background">
                 <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground" onClick={handleFileClick}>
                    <Paperclip className="h-5 w-5" />
                </Button>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                <Input
                    name="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={t.typeMessage}
                    autoComplete="off"
                    className="h-9"
                />
                 <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground" onClick={handleLikeSend}>
                    <ThumbsUp className="h-5 w-5" />
                </Button>
                <Button type="submit" size="icon" className="h-9 w-9">
                    <Send className="h-5 w-5" />
                </Button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>{t.selectConversation}</p>
          </div>
        )}
      </Card>
    </div>
  );
}

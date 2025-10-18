"use client";

import { useCart } from "@/context/cart-context";
import { useLanguage } from "@/context/language-context";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { useState, useEffect, useRef } from "react";
import Checkout from "./checkout";
import { toBengaliNumber } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";


export default function CartSheet() {
    const { cart, removeFromCart, updateQuantity, setCartIconRef } = useCart();
    const { language } = useLanguage();
    const [isMounted, setIsMounted] = useState(false);
    const [view, setView] = useState('cart');
    const [isAnimating, setIsAnimating] = useState(false);
    const cartIconRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
        if (cartIconRef.current) {
            setCartIconRef(cartIconRef);
        }
    }, [setCartIconRef]);
    
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const prevCartItemCount = useRef(cartItemCount);

    // Animate cart icon when item count increases
    useEffect(() => {
        if (cartItemCount > prevCartItemCount.current) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 500); // Animation duration
            return () => clearTimeout(timer);
        }
        prevCartItemCount.current = cartItemCount;
    }, [cartItemCount]);

    const content = {
        bn: {
            shoppingCart: "শপিং কার্ট",
            checkout: "চেকআউট",
            items: "টি আইটেম",
            yourCartIsEmpty: "আপনার কার্ট খালি",
            startShopping: "কেনাকাটা শুরু করুন",
            viewCart: "কার্ট দেখুন",
            proceedToCheckout: "অর্ডার করতে এগিয়ে যান",
        },
        en: {
            shoppingCart: "Shopping Cart",
            checkout: "Checkout",
            items: "items",
            yourCartIsEmpty: "Your cart is empty",
            startShopping: "Start Shopping",
            viewCart: "View Cart",
            proceedToCheckout: "Proceed to Checkout",
        }
    };
    
    useEffect(() => {
        if(cart.length === 0) {
            setView('cart');
        }
    }, [cart])

    if (!isMounted) {
        return (
             <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
            </Button>
        )
    }

    const handleProceed = () => {
        setView('checkout');
    }

    const handleBack = () => {
        setView('cart');
    }
    
    const cartIconVariants = {
      initial: { scale: 1, rotate: 0 },
      animate: { 
        scale: [1, 1.2, 1],
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5, ease: "easeInOut" }
      },
    };

    return (
        <Sheet onOpenChange={(open) => !open && setView('cart')}>
            <SheetTrigger asChild>
                <Button ref={cartIconRef} variant="ghost" size="icon" className="relative">
                    <motion.div
                        variants={cartIconVariants}
                        animate={isAnimating ? "animate" : "initial"}
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </motion.div>
                    <span className="sr-only">Shopping Cart</span>
                    {cartItemCount > 0 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            className="absolute -top-1 -right-1"
                        >
                            <Badge
                            className="h-5 w-5 text-xs justify-center p-0 bg-accent text-accent-foreground"
                            >
                            {language === 'bn' ? toBengaliNumber(cartItemCount) : cartItemCount}
                            </Badge>
                        </motion.div>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[350px] sm:w-[450px] flex flex-col p-0">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center gap-2">
                        {view === 'cart' 
                            ? (language === 'bn' ? content.bn.shoppingCart : content.en.shoppingCart)
                            : (language === 'bn' ? content.bn.checkout : content.en.checkout)
                        }
                        {cartItemCount > 0 && <Badge variant="secondary">{language === 'bn' ? toBengaliNumber(cartItemCount) : cartItemCount} {language === 'bn' ? content.bn.items : content.en.items}</Badge>}
                    </SheetTitle>
                </SheetHeader>
                {cart.length > 0 ? (
                    <div className="flex-grow overflow-hidden">
                        <AnimatePresence mode="wait">
                        {view === 'cart' ? (
                            <motion.div 
                                key="cart"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col flex-grow h-full"
                            >
                                <ScrollArea className="flex-grow">
                                    <div className="p-6 space-y-4">
                                            {cart.map(item => (
                                                <motion.div 
                                                    key={item.id} 
                                                    layout
                                                    initial={{ opacity: 0, y: 50 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                                                    className="flex gap-4"
                                                >
                                                    <Image 
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        width={80}
                                                        height={80}
                                                        className="rounded-md object-cover"
                                                        data-ai-hint={`${item.category?.slug || 'product'} product`}
                                                    />
                                                    <div className="flex-grow flex flex-col justify-between">
                                                        <div>
                                                            <SheetTrigger asChild>
                                                                <Link href={`/products/${item.slug}`} className="font-semibold hover:underline text-sm">
                                                                    {language === 'bn' ? item.name_bn : item.name}
                                                                </Link>
                                                            </SheetTrigger>
                                                            <p className="text-primary font-bold text-sm">৳{language === 'bn' ? toBengaliNumber((item.price || 0).toLocaleString()) : (item.price || 0).toLocaleString()}</p>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center border rounded-md">
                                                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                                                                <span className="w-7 text-center text-sm font-bold">{language === 'bn' ? toBengaliNumber(item.quantity || 0) : (item.quantity || 0)}</span>
                                                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                                                            </div>
                                                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </div>
                                </ScrollArea>
                                 <div className="p-6 border-t bg-background mt-auto">
                                    <Button className="w-full" size="lg" onClick={handleProceed}>
                                        {language === 'bn' ? content.bn.proceedToCheckout : content.en.proceedToCheckout}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="checkout"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col flex-grow h-full"
                            >
                                <Checkout onBack={handleBack} isSheet={true} />
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <ShoppingCart className="h-20 w-20 text-muted-foreground/30 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{content[language].yourCartIsEmpty}</h3>
                        <SheetTrigger asChild>
                            <Link href="/products">
                                <Button>{content[language].startShopping}</Button>
                            </Link>
                        </SheetTrigger>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}

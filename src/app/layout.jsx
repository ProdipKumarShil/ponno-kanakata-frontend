"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ChatWidget from "@/components/chat-widget";
import { Providers } from "@/context/providers";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";


const AppLayout = ({ children }) => {
  const { flyingItem, setFlyingItem } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
        <>
            {children}
            <ChatWidget />
            <Toaster />
        </>
    )
  }

  return (
    <>
      {children}
      <ChatWidget />
      <Toaster />
      <AnimatePresence>
        {flyingItem && (
          <motion.div
            className="fixed z-[100] rounded-lg overflow-hidden"
            initial={{
              top: flyingItem.startPosition.top,
              left: flyingItem.startPosition.left,
              width: flyingItem.startPosition.width,
              height: flyingItem.startPosition.height,
            }}
            animate={{
              top: flyingItem.endPosition.top,
              left: flyingItem.endPosition.left,
              width: 20,
              height: 20,
              rotate: 360,
            }}
            exit={{
                opacity: 0,
                scale: 0,
                transition: { duration: 0.1 }
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              duration: 0.8,
            }}
            onAnimationComplete={() => setFlyingItem(null)}
          >
            <Image
              src={flyingItem.image}
              alt="Flying item"
              width={flyingItem.startPosition.width}
              height={flyingItem.startPosition.height}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Ponno Kenakata</title>
        <meta name="description" content="একটি বাংলাদেশি E-commerce প্ল্যাটফর্ম।" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Providers>
            <AppLayout>
                {children}
            </AppLayout>
        </Providers>
      </body>
    </html>
  );
}

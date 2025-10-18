"use client";

import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const TikTokIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 7.5a4.5 4.5 0 0 1-4.5 4.5H12v6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 4.5-4.5V3h4.5a4.5 4.5 0 0 1 4.5 4.5z" />
    </svg>
);


export default function Footer() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const { toast } = useToast();


  const content = {
    bn: {
      tagline: "বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম।",
      aboutUs: "আমাদের সম্পর্কে",
      about: "পরিচিতি",
      contact: "যোগাযোগ",
      careers: "ক্যারিয়ার",
      support: "সাপোর্ট",
      faq: "সাধারণ জিজ্ঞাসা",
      returnPolicy: "রিটার্ন পলিসি",
      refundPolicy: "রিফান্ড পলিসি",
      privacyPolicy: "প্রাইভেসি পলিসি",
      terms: "শর্তাবলী",
      stayConnected: "যুক্ত থাকুন",
      newsletter: "আপডেট এবং অফার পান।",
      emailPlaceholder: "আপনার ইমেইল",
      subscribe: "সাবস্ক্রাইব",
      subscribeSuccess: "সাবস্ক্রিপশনের জন্য ধন্যবাদ!",
      invalidEmail: "দয়া করে একটি বৈধ ইমেল ঠিকানা লিখুন।",
      contactInfo: "যোগাযোগ:",
      emailInfo: "ইমেইল:",
    },
    en: {
      tagline: "The most trusted online shopping platform in Bangladesh.",
      aboutUs: "About Us",
      about: "About",
      contact: "Contact Us",
      careers: "Careers",
      support: "Support",
      faq: "FAQ",
      returnPolicy: "Return Policy",
      refundPolicy: "Refund Policy",
      privacyPolicy: "Privacy Policy",
      terms: "Terms of Service",
      stayConnected: "Stay Connected",
      newsletter: "Get updates and offers.",
      emailPlaceholder: "Your email",
      subscribe: "Subscribe",
      subscribeSuccess: "Thank you for subscribing!",
      invalidEmail: "Please enter a valid email address.",
      contactInfo: "Contact:",
      emailInfo: "Email:",
    }
  }
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      // In a real app, you'd send this to your backend
      console.log("New subscriber:", email);
      toast({
        title: language === 'bn' ? content.bn.subscribeSuccess : content.en.subscribeSuccess,
      });
      setEmail("");
    } else {
      toast({
        title: language === 'bn' ? content.bn.invalidEmail : content.en.invalidEmail,
        variant: "destructive",
      });
    }
  };

  const copyrightText = `© ${new Date().getFullYear()} Ponno Kenakata. All Rights Reserved.`;

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
             <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src="https://i.postimg.cc/d1CCFy7K/Ponno-Kenakata-Transparent-BG-2.png"
                  alt="Ponno Kenakata Logo"
                  width={32}
                  height={32}
                />
              <span className="text-xl font-bold font-headline text-primary">
                Ponno Kenakata
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {content[language].tagline}
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/ponnokenakataofficial/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Facebook className="h-6 w-6" /></Link>
              <Link href="https://m.me/ponnokenakataofficial" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><MessageCircle className="h-6 w-6" /></Link>
              <Link href="https://www.instagram.com/ponnokenakata/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Instagram className="h-6 w-6" /></Link>
              <Link href="https://www.tiktok.com/@ponnokenakata" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><TikTokIcon className="h-6 w-6" /></Link>
              <Link href="https://www.linkedin.com/company/ponnokenakata/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Linkedin className="h-6 w-6" /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">{content[language].aboutUs}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">{content[language].about}</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-primary">{content[language].careers}</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">{content[language].contact}</Link></li>
            </ul>
             <div className="mt-4 pt-4 border-t border-border/50 text-sm">
                <p className="font-medium text-secondary-foreground">{language === 'bn' ? content.bn.contactInfo : content.en.contactInfo} +880 1990-457545</p>
                <p className="font-medium text-secondary-foreground">{language === 'bn' ? content.bn.emailInfo : content.en.emailInfo} support@ponnokenakata.com</p>
             </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">{content[language].support}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary">{content[language].faq}</Link></li>
              <li><Link href="/return-policy" className="text-muted-foreground hover:text-primary">{content[language].returnPolicy}</Link></li>
              <li><Link href="/refund-policy" className="text-muted-foreground hover:text-primary">{content[language].refundPolicy}</Link></li>
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">{content[language].privacyPolicy}</Link></li>
              <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">{content[language].terms}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">{content[language].stayConnected}</h3>
            <p className="text-sm text-muted-foreground mb-2">{content[language].newsletter}</p>
            <form onSubmit={handleSubscribe} className="flex">
              <Input 
                type="email" 
                placeholder={content[language].emailPlaceholder} 
                className="rounded-r-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="rounded-l-none">{content[language].subscribe}</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}

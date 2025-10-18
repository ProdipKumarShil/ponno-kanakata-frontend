"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Send, Facebook, Instagram, MessageCircle, MapPin, Linkedin } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import Image from 'next/image';


const TikTokIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 7.5a4.5 4.5 0 0 1-4.5 4.5H12v6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 4.5-4.5V3h4.5a4.5 4.5 0 0 1 4.5 4.5z" />
    </svg>
);


export default function ContactPage() {
    const { language } = useLanguage();

    const content = {
        bn: {
            title: "যোগাযোগ করুন",
            subtitle: "যেকোনো প্রশ্ন, মতামত বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন। আমরা আপনার বার্তা শোনার জন্য প্রস্তুত।",
            contactInfo: "যোগাযোগের তথ্য",
            address: "ফুলতলা, খুলনা, বাংলাদেশ",
            socialMedia: "সোশ্যাল মিডিয়াতে আমাদের খুঁজুন",
            formTitle: "আপনার বার্তা পাঠান",
            formName: "আপনার নাম",
            formEmail: "আপনার ইমেইল",
            formSubject: "বিষয়",
            formMessage: "আপনার বার্তা",
            sendMessage: "বার্তা পাঠান",
            formDisabledNote: "ফর্ম কার্যকারিতা শীঘ্রই যোগ করা হবে।"
        },
        en: {
            title: "Contact Us",
            subtitle: "For any questions, feedback, or support, please contact us. We are ready to hear from you.",
            contactInfo: "Contact Information",
            address: "Phultala, Khulna, Bangladesh",
            socialMedia: "Find Us on Social Media",
            formTitle: "Send Us a Message",
            formName: "Your Name",
            formEmail: "Your Email",
            formSubject: "Subject",
            formMessage: "Your Message",
            sendMessage: "Send Message",
            formDisabledNote: "Form functionality will be added soon."
        }
    };
    
    const currentContent = content[language];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-12 lg:py-16 bg-primary/5">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold font-headline text-foreground flex items-center justify-center gap-3">
                           <Mail className="h-10 w-10" /> {currentContent.title}
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{currentContent.subtitle}</p>
                    </div>
                </section>

                <section className="py-16 lg:py-24 bg-background">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                           
                            <Card className="shadow-lg border-primary/20">
                                <CardHeader>
                                    <CardTitle>{currentContent.contactInfo}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4 text-lg">
                                         <p className="flex items-center gap-3 font-medium">
                                            <MapPin className="h-6 w-6 text-primary"/>
                                            <span>{currentContent.address}</span>
                                        </p>
                                        <p className="flex items-center gap-3 font-medium">
                                            <Phone className="h-6 w-6 text-primary"/>
                                            <span>+880 1990-457545</span>
                                        </p>
                                        <p className="flex items-center gap-3 font-medium">
                                            <Mail className="h-6 w-6 text-primary"/>
                                            <span>support@ponnokenakata.com</span>
                                        </p>
                                        <p className="flex items-center gap-3 font-medium">
                                            <MessageCircle className="h-6 w-6 text-primary"/>
                                            <span>WhatsApp: 01990-457545</span>
                                        </p>
                                    </div>
                                    <div className="pt-6 border-t">
                                        <h3 className="font-semibold mb-4 text-lg">{currentContent.socialMedia}</h3>
                                        <div className="flex space-x-6">
                                            <Link href="https://www.facebook.com/ponnokenakataofficial/" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-8 w-8" /></Link>
                                            <Link href="https://www.instagram.com/ponnokenakata/" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-8 w-8" /></Link>
                                            <Link href="https://www.tiktok.com/@ponnokenakata" className="text-muted-foreground hover:text-primary transition-colors"><TikTokIcon className="h-8 w-8" /></Link>
                                            <Link href="https://www.linkedin.com/company/ponnokenakata/" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-8 w-8" /></Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle>{currentContent.formTitle}</CardTitle>
                                    <CardDescription>{currentContent.subtitle}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">{currentContent.formName}</Label>
                                            <Input id="name" placeholder={language === 'bn' ? 'যেমন: রহিম উদ্দিন' : 'e.g., John Doe'} disabled />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">{currentContent.formEmail}</Label>
                                            <Input id="email" type="email" placeholder={language === 'bn' ? 'your@email.com' : 'your@email.com'} disabled />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">{currentContent.formSubject}</Label>
                                        <Input id="subject" placeholder={language === 'bn' ? 'আপনার বার্তার বিষয়...' : 'Subject of your message...'} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">{currentContent.formMessage}</Label>
                                        <Textarea id="message" placeholder={language === 'bn' ? 'এখানে আপনার বার্তা লিখুন...' : 'Type your message here...'} rows={5} disabled />
                                    </div>
                                    <Button type="submit" className="w-full" disabled>
                                        <Send className="mr-2 h-4 w-4" />
                                        {currentContent.sendMessage}
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground pt-2">{currentContent.formDisabledNote}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

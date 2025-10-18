"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Lightbulb, Mail, Paperclip, Phone, Send, Sparkles, Star, Users } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CareersPage() {
    const { language } = useLanguage();

    const content = {
        bn: {
            title: "Ponno Kenakata-তে ক্যারিয়ার",
            joinTeam: "আমাদের ক্রমবর্ধমান দলে যোগ দিন!",
            intro: "Ponno Kenakata-তে আমরা বিশ্বাস করি – আমাদের সাফল্য আমাদের দলের প্রতিটি সদস্যের দক্ষতা, উদ্যম এবং ক্রিয়েটিভিটি-র ওপর নির্ভরশীল। আমরা সর্বদা নতুন, উদ্যমী এবং প্রতিশ্রুতিবদ্ধ মানুষদের খুঁজছি যারা আমাদের মিশনকে এগিয়ে নিতে সাহায্য করবে।",
            whyWorkWithUs: "কেন আমাদের সাথে কাজ করবেন?",
            whyPoints: [
                { icon: Star, title: "প্রফেশনাল গ্রোথ", text: "আমরা আমাদের দলের প্রতিটি সদস্যকে নিয়মিত প্রশিক্ষণ এবং স্কিল ডেভেলপমেন্টের সুযোগ দিই।" },
                { icon: Lightbulb, title: "সৃজনশীল পরিবেশ", text: "আপনার আইডিয়া ও উদ্ভাবনকে আমরা গুরুত্ব দিই।" },
                { icon: Users, title: "ডাইনামিক টিম", text: "আমাদের টিম বন্ধুত্বপূর্ণ, সহযোগিতামূলক এবং উদ্যমী।" },
                { icon: Sparkles, title: "কার্যকরী কাজ", text: "এখানে আপনার কাজ সরাসরি গ্রাহক সন্তুষ্টি এবং ব্যবসার বৃদ্ধিতে প্রভাব ফেলবে।" }
            ],
            currentOpenings: "বর্তমান সুযোগ",
            openingsIntro: "বর্তমানে আমাদের কোনো পদ খালি নেই। তবে, আমরা সবসময় মেধাবী এবং আগ্রহী প্রার্থীদের খুঁজছি।",
            openingsNote: "আপনি যদি আমাদের সাথে কাজ করতে আগ্রহী হন, তবে আপনার সিভি পাঠিয়ে রাখতে পারেন। ভবিষ্যতে কোনো সুযোগ তৈরি হলে আমরা আপনার সাথে যোগাযোগ করব।",
            howToApply: "কিভাবে আবেদন করবেন",
            applyIntro: "আপনার Updated Resume / CV আমাদের কাছে পাঠান:",
            applyEmail: "careers@ponnokenakata.com",
            callToAction: "Ponno Kenakata-তে যোগ দিন এবং আমাদের সাথে এগিয়ে চলুন – আপনার প্রতিভা এখানে সত্যিই প্রভাব ফেলবে!"
        },
        en: {
            title: "Careers at Ponno Kenakata",
            joinTeam: "Join Our Growing Team!",
            intro: "At Ponno Kenakata, we believe that our success depends on the skills, enthusiasm, and creativity of each member of our team. We are always looking for new, energetic, and committed people to help us advance our mission.",
            whyWorkWithUs: "Why Work With Us?",
            whyPoints: [
                { icon: Star, title: "Professional Growth", text: "We provide regular training and skill development opportunities for every member of our team." },
                { icon: Lightbulb, title: "Creative Environment", text: "We value your ideas and innovations." },
                { icon: Users, title: "Dynamic Team", text: "Our team is friendly, collaborative, and energetic." },
                { icon: Sparkles, title: "Impactful Work", text: "Here, your work will directly impact customer satisfaction and business growth." }
            ],
            currentOpenings: "Current Openings",
            openingsIntro: "We do not have any open positions at the moment. However, we are always looking for talented and interested candidates.",
            openingsNote: "If you are interested in working with us, you can send us your CV. We will contact you if any opportunities arise in the future.",
            howToApply: "How to Apply",
            applyIntro: "Send your Updated Resume / CV to us at:",
            applyEmail: "careers@ponnokenakata.com",
            callToAction: "Join Ponno Kenakata and grow with us – your talent can make a real impact!"
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
                           <Briefcase className="h-10 w-10" /> {currentContent.title}
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{currentContent.joinTeam}</p>
                         <p className="mt-2 max-w-3xl mx-auto text-muted-foreground">{currentContent.intro}</p>
                    </div>
                </section>

                <section className="py-16 lg:py-24 bg-background">
                    <div className="container mx-auto px-4 space-y-12 max-w-5xl">
                        
                        <Card className="border-none shadow-none">
                            <CardHeader className="text-center">
                                <h2 className="text-3xl font-bold font-headline">{currentContent.whyWorkWithUs}</h2>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {currentContent.whyPoints.map((point, index) => (
                                    <Card key={index} className="text-center p-6">
                                        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                                            <point.icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
                                        <p className="text-sm text-muted-foreground">{point.text}</p>
                                    </Card>
                                ))}
                            </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-1 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3"><Paperclip /> {currentContent.currentOpenings}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-center">
                                    <p className="text-muted-foreground">{currentContent.openingsIntro}</p>
                                     <p className="text-muted-foreground pt-2">{currentContent.openingsNote}</p>
                                     <Button asChild variant="outline" className="mt-4">
                                        <Link href={`mailto:${currentContent.applyEmail}`}>
                                             <Mail className="mr-2 h-4 w-4"/> {currentContent.applyEmail}
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        
                         <Card className="text-center">
                            <CardHeader>
                                <CardTitle>{currentContent.callToAction}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-muted-foreground">{language === 'en' ? 'If you have any questions, feel free to contact us.' : 'আপনার কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করতে পারেন।'}</p>
                                <div className="flex items-center justify-center gap-4 pt-2">
                                    <p className="font-semibold flex items-center gap-2"><Phone className="h-4 w-4" /> WhatsApp: 01990-457545</p>
                                    <p className="font-semibold flex items-center gap-2"><Mail className="h-4 w-4" /> Email: careers@ponnokenakata.com</p>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

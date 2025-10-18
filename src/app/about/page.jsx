"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Target, Users, Handshake, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import Image from 'next/image';

const teamMembers = [
    {
        name: "MD. Hasib Molla",
        name_bn: "মোঃ হাসিব মোল্লা",
        title: "Managing Director & Founder",
        title_bn: "ব্যবস্থাপনা পরিচালক ও প্রতিষ্ঠাতা",
        bio: "With a vision to revolutionize e-commerce in Bangladesh, Hasib leads the company with strategic direction and a passion for customer satisfaction.",
        bio_bn: "বাংলাদেশে ই-কমার্স শিল্পে একটি বিপ্লব আনার লক্ষ্যে, হাসিব কৌশলগত দিকনির্দেশনা এবং গ্রাহক সন্তুষ্টির প্রতি অনুরাগ নিয়ে কোম্পানিকে নেতৃত্ব দেন।",
        image: "https://i.postimg.cc/qvHT470G/1.png",
    },
    {
        name: "Tanvir Ahamed",
        name_bn: "তানভীর আহমেদ",
        title: "CEO & Founder",
        title_bn: "প্রধান নির্বাহী কর্মকর্তা ও প্রতিষ্ঠাতা",
        bio: "Tanvir oversees the daily operations, ensuring that everything from logistics to customer service runs smoothly and efficiently.",
        bio_bn: "তানভীর প্রতিদিনের কার্যক্রম তত্ত্বাবধান করেন, লজিস্টিকস থেকে শুরু করে গ্রাহক পরিষেবা পর্যন্ত সবকিছু যাতে মসৃণ এবং দক্ষতার সাথে চলে তা নিশ্চিত করেন।",
        image: "https://i.postimg.cc/7Y0LgdZm/2.png",
    },
    {
        name: "Riajul Islam",
        name_bn: "রিয়াজুল ইসলাম",
        title: "Co-Founder & Partner",
        title_bn: "সহ-প্রতিষ্ঠাতা ও অংশীদার",
        bio: "Riajul is the technical mastermind, driving innovation and ensuring our platform is robust, secure, and user-friendly.",
        bio_bn: "রিয়াজুল হলেন প্রযুক্তিগত মূল কারিগর, যিনি উদ্ভাবনকে উৎসাহিত করেন এবং আমাদের প্ল্যাটফর্মটিকে শক্তিশালী, সুরক্ষিত ও ব্যবহারকারী-বান্ধব নিশ্চিত করেন।",
        image: "https://i.postimg.cc/2Sx8tWvW/3.png",
    }
];

const values = [
    {
        icon: Handshake,
        title: "Trust",
        title_bn: "বিশ্বাস",
        text: "We build relationships based on transparency and reliability.",
        text_bn: "আমরা স্বচ্ছতা এবং নির্ভরযোগ্যতার উপর ভিত্তি করে সম্পর্ক তৈরি করি।"
    },
    {
        icon: ShieldCheck,
        title: "Quality",
        title_bn: "গুণগত মান",
        text: "We are committed to offering only the best products to our customers.",
        text_bn: "আমরা আমাদের গ্রাহকদের শুধুমাত্র সেরা পণ্য সরবরাহ করতে প্রতিশ্রুতিবদ্ধ।"
    },
    {
        icon: Users,
        title: "Customer First",
        title_bn: "গ্রাহকই প্রথম",
        text: "Our customers are at the heart of everything we do.",
        text_bn: "আমাদের সকল কাজের কেন্দ্রবিন্দুতে রয়েছে আমাদের গ্রাহকরা।"
    }
];

export default function AboutPage() {
    const { language } = useLanguage();

    const content = {
        bn: {
            title: "আমাদের সম্পর্কে",
            intro: "Ponno Kenakata একটি অনলাইন প্ল্যাটফর্মের চেয়েও বেশি কিছু। এটি বিশ্বাস, গুণমান এবং ব্যতিক্রমী গ্রাহক সেবার একটি প্রতিশ্রুতি। আমাদের লক্ষ্য হলো বাংলাদেশের মানুষের জন্য অনলাইন কেনাকাটাকে একটি সহজ, নিরাপদ এবং আনন্দদায়ক অভিজ্ঞতা করে তোলা।",
            missionTitle: "আমাদের লক্ষ্য",
            missionText: "সর্বোচ্চ মানের পণ্য এবং গ্রাহক সেবা নিশ্চিত করার মাধ্যমে বাংলাদেশের সবচেয়ে বিশ্বস্ত ই-কমার্স প্ল্যাটফর্ম হওয়া।",
            teamTitle: "আমাদের নেতৃত্ব",
        },
        en: {
            title: "About Us",
            intro: "Ponno Kenakata is more than just an online platform; it's a promise of trust, quality, and exceptional customer service. Our goal is to make online shopping an easy, safe, and enjoyable experience for the people of Bangladesh.",
            missionTitle: "Our Mission",
            missionText: "To become the most trusted e-commerce platform in Bangladesh by ensuring the highest quality products and customer service.",
            teamTitle: "Meet Our Leadership",
        }
    };
    
    const currentContent = content[language];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-12 lg:py-16 bg-primary/5">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold font-headline text-foreground">{currentContent.title}</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{currentContent.intro}</p>
                    </div>
                </section>

                <section className="py-16 lg:py-24 bg-background">
                    <div className="container mx-auto px-4 max-w-5xl text-center">
                        <Card className="inline-block border-primary/20 shadow-lg">
                            <CardHeader>
                                 <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                                    <Target className="h-10 w-10 text-primary" />
                                </div>
                                <CardTitle className="text-3xl font-bold font-headline mt-2">{currentContent.missionTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg text-muted-foreground">{currentContent.missionText}</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="py-16 lg:py-24 bg-primary/5">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <h2 className="text-3xl font-bold text-center mb-12 font-headline text-foreground">{currentContent.teamTitle}</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {teamMembers.map((member, index) => (
                                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader className="items-center p-8">
                                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                width={400}
                                                height={400}
                                                className="object-cover w-full h-full"
                                                data-ai-hint="male portrait"
                                            />
                                        </div>
                                        <CardTitle className="mt-4">{language === 'bn' ? member.name_bn : member.name}</CardTitle>
                                        <CardDescription className="text-primary font-semibold">{language === 'bn' ? member.title_bn : member.title}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
                 <section className="py-16 lg:py-24 bg-background">
                    <div className="container mx-auto px-4 max-w-5xl">
                         <h2 className="text-3xl font-bold text-center mb-12 font-headline">Our Values</h2>
                          <div className="grid md:grid-cols-3 gap-8 text-center">
                                {values.map((value, index) => (
                                    <div key={index}>
                                        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                                            <value.icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-xl mb-2">{language === 'bn' ? value.title_bn : value.title}</h3>
                                        <p className="text-muted-foreground">{language === 'bn' ? value.text_bn : value.text}</p>
                                    </div>
                                ))}
                            </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}

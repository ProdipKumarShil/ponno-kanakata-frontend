"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Clock, ListChecks, Info, LifeBuoy, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RefundPolicyPage() {
    const { language } = useLanguage();

    const content = {
        bn: {
            title: "রিফান্ড নীতিমালা",
            refundTypesTitle: "🔄 রিফান্ডের ধরন",
            refundTypesIntro: "রিফান্ড আপনার অর্ডারের ধরন অনুযায়ী প্রক্রিয়া করা হবে:",
            refundTypesCases: [
                "রিটার্ন থেকে রিফান্ড: আপনার ফেরত দেওয়া পণ্য আমাদের গুদামে পৌঁছানোর পর এবং কিউসি (Quality Check) সম্পন্ন হওয়ার পর রিফান্ড শুরু হবে।",
                "বাতিলকৃত অর্ডার থেকে রিফান্ড: আপনি যদি অর্ডার ডেলিভারির আগে বাতিল করেন এবং তা সফলভাবে প্রক্রিয়াজাত হয়, তবে রিফান্ড স্বয়ংক্রিয়ভাবে শুরু হবে।",
                "ব্যর্থ ডেলিভারি থেকে রিফান্ড: যদি কোনো কারণে আপনার অর্ডার ডেলিভারি সম্পন্ন না হয় এবং পণ্য বিক্রেতার কাছে ফিরে আসে, তবে রিফান্ড প্রক্রিয়া শুরু হবে।"
            ],
            refundTypesNote: "দয়া করে মনে রাখবেন, আপনার অবস্থান (এলাকা) অনুসারে ডেলিভারি ও রিফান্ডের সময় কিছুটা ভিন্ন হতে পারে।",
            timelineTitle: "⏳ রিফান্ডের সময়সীমা",
            timelineIntro: "রিফান্ড প্রক্রিয়া শুরু হওয়ার পর সম্পন্ন হতে সাধারণত ৩–৭ কার্যদিবস সময় লাগে।",
            timelineMethods: "ব্যাংক ট্রান্সফার, বিকাশ/নগদ/রকেট বা শপিং ভাউচারের মাধ্যমে রিফান্ড পাওয়া যাবে।",
            conditionsTitle: "📦 রিটার্নকৃত পণ্যের শর্তাবলি",
            conditionsIntro: "রিফান্ড পেতে হলে আপনার ফেরত দেওয়া পণ্য অবশ্যই নিম্নলিখিত শর্ত পূরণ করতে হবে –",
            conditionsList: [
                "পণ্যটি অব্যবহৃত, পরিষ্কার এবং ত্রুটিমুক্ত হতে হবে।",
                "আসল ট্যাগ, ব্যবহারকারীর ম্যানুয়াল, ওয়ারেন্টি কার্ড, চালান, ফ্রি গিফট ও অন্যান্য আনুষঙ্গিক জিনিসপত্র ফেরত দিতে হবে।",
                "আসল প্যাকেজিং/বাক্সে পণ্য ফেরত দিতে হবে।",
                "যদি Ponno Kenakata এর বিশেষ প্যাকেজিং এ ডেলিভারি হয়ে থাকে, তবে সেটিও ফেরত দিতে হবে।",
                "প্যাকেজিং-এর উপর সরাসরি টেপ/স্টিকার লাগানো যাবে না।"
            ],
            instructionsTitle: "📝 গুরুত্বপূর্ণ নির্দেশনা",
            instructionsList: [
                "রিটার্ন প্যাকেজের সাথে অবশ্যই অর্ডার নম্বর ও রিটার্ন ট্র্যাকিং নম্বর উল্লেখ করতে হবে।",
                "পণ্য ফেরতের সময় কুরিয়ার এজেন্ট/ড্রপ-অফ স্টেশনের কাছ থেকে একটি রিটার্ন রসিদ/স্বীকৃতি সংগ্রহ করুন এবং ভবিষ্যতের জন্য সংরক্ষণ করুন।",
                "যাচাইয়ের পর যদি দেখা যায় ফেরত দেওয়া পণ্য রিটার্ন শর্ত পূরণ করছে না, তবে রিফান্ড প্রক্রিয়া বাতিল হতে পারে।"
            ],

            customerSupportTitle: "📞 কাস্টমার সাপোর্ট",
            customerSupportText: "রিটার্ন বা রিফান্ড সংক্রান্ত যেকোনো সহায়তার জন্য আমাদের কাস্টমার সাপোর্ট টিমের সাথে যোগাযোগ করুন:",
            whatsapp: "WhatsApp: 01990-457545",
            email: "ইমেইল: support@ponnokenakata.com",
            returnPolicyLink: "রিটার্ন পলিসি দেখুন"
        },
        en: {
            title: "Refund Policy",
            refundTypesTitle: "🔄 Types of Refunds",
            refundTypesIntro: "Refunds will be processed according to the type of your order:",
            refundTypesCases: [
                "Refund from Return: The refund will be initiated after your returned product reaches our warehouse and completes Quality Check (QC).",
                "Refund from Canceled Order: If you cancel your order before delivery and it is processed successfully, the refund will be initiated automatically.",
                "Refund from Failed Delivery: If your order delivery fails for any reason and the product is returned to the seller, the refund process will begin."
            ],
            refundTypesNote: "Please note that delivery and refund times may vary slightly depending on your location (area).",
            timelineTitle: "⏳ Refund Timeline",
            timelineIntro: "It usually takes 3–7 working days to complete the refund process after it has been initiated.",
            timelineMethods: "Refunds are available via Bank Transfer, bKash/Nagad/Rocket, or Shopping Voucher.",
            conditionsTitle: "📦 Conditions for Returned Products",
            conditionsIntro: "To receive a refund, your returned product must meet the following conditions:",
            conditionsList: [
                "The product must be unused, clean, and free of defects.",
                "Original tags, user manuals, warranty cards, invoices, free gifts, and other accessories must be returned.",
                "The product must be returned in its original packaging/box.",
                "If delivered in Ponno Kenakata's special packaging, that must also be returned.",
                "Tape/stickers should not be applied directly to the packaging."
            ],
            instructionsTitle: "📝 Important Instructions",
            instructionsList: [
                "The order number and return tracking number must be mentioned on the return package.",
                "Collect a return receipt/acknowledgment from the courier agent/drop-off station when returning the product and save it for future reference.",
                "If after verification it is found that the returned product does not meet the return conditions, the refund process may be canceled."
            ],
            customerSupportTitle: "📞 Customer Support",
            customerSupportText: "For any assistance regarding returns or refunds, please contact our customer support team:",
            whatsapp: "WhatsApp: 01990-457545",
            email: "Email: support@ponnokenakata.com",
            returnPolicyLink: "View Return Policy"
        },
    };

    const currentContent = content[language];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-12 lg:py-16 bg-primary/5">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold font-headline text-foreground">💳 {currentContent.title}</h1>
                    </div>
                </section>

                <section className="py-16 lg:py-24 bg-background">
                    <div className="container mx-auto px-4 space-y-8 max-w-4xl">

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3"><RefreshCw className="h-6 w-6 text-blue-600" />{currentContent.refundTypesTitle}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">{currentContent.refundTypesIntro}</p>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.refundTypesCases.map((text, index) => <li key={index}>{text}</li>)}
                                </ul>
                                <p className="text-sm text-muted-foreground italic">{currentContent.refundTypesNote}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3"><Clock className="h-6 w-6 text-green-600" />{currentContent.timelineTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{currentContent.timelineIntro}</p>
                                <p className="text-muted-foreground mt-2 font-semibold">{currentContent.timelineMethods}</p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3"><ListChecks className="h-6 w-6 text-purple-600" />{currentContent.conditionsTitle}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-muted-foreground">{currentContent.conditionsIntro}</p>
                                 <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                     {currentContent.conditionsList.map((text, index) => <li key={index}>{text}</li>)}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3"><Info className="h-6 w-6 text-yellow-600" />{currentContent.instructionsTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground list-decimal list-inside">
                                    {currentContent.instructionsList.map((text, index) => <li key={index}>{text}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                        
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3"><LinkIcon className="h-6 w-6 text-gray-600" />{currentContent.returnPolicyLink}</CardTitle>
                            </CardHeader>
                            <CardContent>
                               <Link href="/return-policy">
                                    <Button variant="outline">{currentContent.returnPolicyLink}</Button>
                               </Link>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3"><LifeBuoy className="h-6 w-6 text-cyan-600" />{currentContent.customerSupportTitle}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-muted-foreground">{currentContent.customerSupportText}</p>
                                <p className="font-semibold">📱 {currentContent.whatsapp}</p>
                                <p className="font-semibold">✉️ {currentContent.email}</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Truck, CreditCard, RefreshCw, UserCheck, AlertTriangle, Copyright, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsOfServicePage() {
    const { language } = useLanguage();

    const content = {
        bn: {
            title: "সেবার শর্তাবলী",
            intro: "Ponno Kenakata-তে আপনাকে স্বাগতম। আমাদের ওয়েবসাইট/পেজ/অ্যাপ ব্যবহার করে আপনি নিচের শর্তাবলীর সাথে একমত হচ্ছেন। অনুগ্রহ করে এগুলো মনোযোগ সহকারে পড়ুন।",

            generalTitle: "1️⃣ সাধারণ শর্তাবলী",
            generalList: [
                "আমাদের প্ল্যাটফর্ম ব্যবহার করার সময় আপনাকে সঠিক ও সত্য তথ্য প্রদান করতে হবে।",
                "আমরা যেকোনো সময়ে এই শর্তাবলী পরিবর্তন বা আপডেট করার অধিকার রাখি। পরিবর্তিত শর্তাবলী আমাদের ওয়েবসাইটে প্রকাশের সাথে সাথেই কার্যকর হবে।"
            ],

            orderTitle: "2️⃣ অর্ডার এবং ডেলিভারি",
            orderList: [
                "অর্ডার নিশ্চিত হওয়ার পর আমরা নির্ধারিত সময়ের মধ্যে পণ্য ডেলিভারি করার চেষ্টা করি (সাধারণত ৩–৫ কার্যদিবস)।",
                "যেকোনো প্রি-অর্ডার, বিশেষ অফার বা অনাকাঙ্ক্ষিত পরিস্থিতির কারণে ডেলিভারিতে বিলম্ব হলে আপনাকে জানানো হবে।",
                "ডেলিভারির সময় কাস্টমারকে অবশ্যই সঠিক ঠিকানা ও যোগাযোগ নম্বর প্রদান করতে হবে।"
            ],

            paymentTitle: "3️⃣ পেমেন্ট নীতিমালা",
            paymentList: [
                "আমরা ক্যাশ অন ডেলিভারি (COD), বিকাশ/নগদ/রকেট এবং ব্যাংক ট্রান্সফার গ্রহণ করি।",
                "পেমেন্ট সম্পন্ন হওয়ার পর গ্রাহককে প্রমাণস্বরূপ ইনভয়েস/কনফার্মেশন প্রদান করা হবে।",
                "কোনো প্রতারণামূলক বা অবৈধ পেমেন্টের ক্ষেত্রে অর্ডার বাতিল করা হবে।"
            ],

            returnTitle: "4️⃣ রিটার্ন ও রিফান্ড",
            returnList: [
                "পণ্য গ্রহণের ৭ দিনের মধ্যে বৈধ কারণে (ক্ষতিগ্রস্ত, ভুল, অসম্পূর্ণ বা বিবরণের সাথে অমিল) রিটার্ন গ্রহণযোগ্য।",
                "রিটার্নকৃত পণ্য যাচাইয়ের পর রিফান্ড প্রক্রিয়া শুরু হবে।"
            ],
            returnLink: "বিস্তারিত জানতে আমাদের [Return & Refund Policy] দেখুন।",

            customerDutyTitle: "5️⃣ গ্রাহকের দায়িত্ব",
            customerDutyList: [
                "অর্ডার দেওয়ার সময় প্রদত্ত তথ্য (ঠিকানা, নাম্বার, ইমেইল) অবশ্যই সঠিক হতে হবে।",
                "পণ্য গ্রহণের সময় প্যাকেজিং ও পণ্য ভালোভাবে যাচাই করার দায়িত্ব গ্রাহকের।",
                "আমাদের সাইট বা সার্ভিস অপব্যবহার (স্প্যাম, ভুয়া অর্ডার, প্রতারণা) কঠোরভাবে নিষিদ্ধ।"
            ],
            
            serviceLimitTitle: "6️⃣ সেবার সীমাবদ্ধতা",
            serviceLimitList: [
                "প্রাকৃতিক দুর্যোগ, প্রযুক্তিগত ত্রুটি, কুরিয়ার সমস্যার কারণে সেবা বিলম্বিত হতে পারে। এ ক্ষেত্রে আমরা দায়ী থাকব না, তবে দ্রুত সমাধানের চেষ্টা করব।",
                "আমরা যেকোনো অর্ডার যাচাই বা বাতিল করার অধিকার সংরক্ষণ করি।"
            ],

            ipTitle: "7️⃣ মেধাস্বত্ব (Intellectual Property)",
            ipList: [
                "Ponno Kenakata-এর ওয়েবসাইট/পেজ/অ্যাপে প্রদর্শিত লোগো, ছবি, টেক্সট, কনটেন্ট আমাদের নিজস্ব বা অনুমোদিত ব্যবহারের আওতাভুক্ত।",
                "অনুমতি ছাড়া এগুলো কপি, বিক্রি বা বাণিজ্যিকভাবে ব্যবহার করা যাবে না।"
            ],

            contactTitle: "8️⃣ যোগাযোগ ও সহায়তা",
            contactIntro: "যেকোনো প্রশ্ন, অভিযোগ বা সহায়তার জন্য যোগাযোগ করুন –",
            whatsapp: "WhatsApp: 01990-457545",
            email: "ইমেইল: support@ponnokenakata.com"
        },
        en: {
            title: "Terms of Service",
            intro: "Welcome to Ponno Kenakata. By using our website/page/app, you agree to the following terms and conditions. Please read them carefully.",

            generalTitle: "1️⃣ General Conditions",
            generalList: [
                "You must provide accurate and true information when using our platform.",
                "We reserve the right to change or update these terms at any time. The revised terms will be effective immediately upon publication on our website."
            ],

            orderTitle: "2️⃣ Order and Delivery",
            orderList: [
                "After order confirmation, we try to deliver the product within the specified time (usually 3-5 working days).",
                "You will be notified of any delay in delivery due to pre-orders, special offers, or unforeseen circumstances.",
                "Customers must provide the correct address and contact number at the time of delivery."
            ],

            paymentTitle: "3️⃣ Payment Policy",
            paymentList: [
                "We accept Cash on Delivery (COD), bKash/Nagad/Rocket, and bank transfers.",
                "An invoice/confirmation will be provided to the customer as proof after payment is completed.",
                "Orders will be canceled in case of any fraudulent or illegal payment."
            ],

            returnTitle: "4️⃣ Return & Refund",
            returnList: [
                "Returns are acceptable within 7 days of receiving the product for valid reasons (damaged, wrong, incomplete, or not as described).",
                "The refund process will be initiated after verifying the returned product."
            ],
            returnLink: "For details, see our [Return & Refund Policy].",

            customerDutyTitle: "5️⃣ Customer Responsibilities",
            customerDutyList: [
                "Information provided while ordering (address, number, email) must be correct.",
                "It is the customer's responsibility to check the packaging and product thoroughly upon receipt.",
                "Misuse of our site or service (spam, fake orders, fraud) is strictly prohibited."
            ],
            
            serviceLimitTitle: "6️⃣ Limitation of Service",
            serviceLimitList: [
                "Service may be delayed due to natural disasters, technical faults, or courier problems. We will not be liable in such cases but will try to resolve them quickly.",
                "We reserve the right to verify or cancel any order."
            ],

            ipTitle: "7️⃣ Intellectual Property",
            ipList: [
                "The logo, images, text, and content displayed on Ponno Kenakata's website/page/app are our own or under authorized use.",
                "They may not be copied, sold, or used commercially without permission."
            ],

            contactTitle: "8️⃣ Contact & Support",
            contactIntro: "For any questions, complaints, or assistance, please contact us –",
            whatsapp: "WhatsApp: 01990-457545",
            email: "Email: support@ponnokenakata.com"
        }
    };
    
    const currentContent = content[language];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-12 lg:py-16 bg-primary/5">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold font-headline text-foreground">📑 {currentContent.title}</h1>
                         <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">{currentContent.intro}</p>
                    </div>
                </section>

                <section className="py-16 lg:py-24 bg-background">
                    <div className="container mx-auto px-4 space-y-8 max-w-4xl">
                        
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-3"><FileText /> {currentContent.generalTitle}</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.generalList.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-3"><Truck /> {currentContent.orderTitle}</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.orderList.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-3"><CreditCard /> {currentContent.paymentTitle}</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.paymentList.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-3"><RefreshCw /> {currentContent.returnTitle}</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.returnList.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                                <p className="pt-2">
                                    <Link href="/refund-policy" passHref>
                                        <Button variant="link" className="p-0 h-auto">
                                            👉 {currentContent.returnLink.replace('[', '').replace(']', '')}
                                        </Button>
                                    </Link>
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-3"><UserCheck /> {currentContent.customerDutyTitle}</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.customerDutyList.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-3"><AlertTriangle /> {currentContent.serviceLimitTitle}</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.serviceLimitList.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-3"><Copyright /> {currentContent.ipTitle}</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.ipList.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-3"><Phone /> {currentContent.contactTitle}</CardTitle></CardHeader>
                             <CardContent className="space-y-2">
                                <p className="text-muted-foreground">{currentContent.contactIntro}</p>
                                <p className="font-semibold flex items-center gap-2"><Mail className="h-4 w-4" /> {currentContent.email}</p>
                                <p className="font-semibold flex items-center gap-2"><Phone className="h-4 w-4" /> {currentContent.whatsapp}</p>
                            </CardContent>
                        </Card>

                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

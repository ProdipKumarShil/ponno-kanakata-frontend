"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, Truck, LifeBuoy, CreditCard, RefreshCw, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FaqPage() {
    const { language } = useLanguage();

    const faqData = [
        {
            icon: Clock,
            question_bn: "অর্ডার পেতে কত সময় লাগবে?",
            question_en: "How long will it take to receive my order?",
            answer_bn: [
                "সাধারণত আমরা ৩ থেকে ৫ কর্মদিবসের মধ্যে আপনার অর্ডার ডেলিভারি করি (প্রি-অর্ডার ব্যতীত)।",
                "তবে কোনো অনাকাঙ্ক্ষিত পরিস্থিতি (যেমন: আবহাওয়া, কুরিয়ার বিলম্ব, বা বিশেষ চাহিদা) তৈরি হলে আমাদের টিম আপনাকে ফোন/মেসেজের মাধ্যমে অবহিত করবে এবং নতুন ডেলিভারি সময় জানিয়ে দেবে।"
            ],
            answer_en: [
                "Typically, we deliver your order within 3 to 5 working days (excluding pre-orders).",
                "However, in case of any unforeseen circumstances (e.g., weather, courier delays, or special requests), our team will inform you via phone/message and provide a new delivery time."
            ]
        },
        {
            icon: Truck,
            question_bn: "ডেলিভারি চার্জ কত?",
            question_en: "What are the delivery charges?",
            answer_bn: [
                "খুলনা শহরের ভেতরে: ৭০ টাকা",
                "খুলনা শহরের বাইরে (সারা বাংলাদেশজুড়ে): ১৩০ টাকা",
                "👉 বিশেষ অফার বা নির্দিষ্ট অর্ডারের ক্ষেত্রে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি হতে পারে।"
            ],
            answer_en: [
                "Inside Khulna city: 70 Taka",
                "Outside Khulna city (across Bangladesh): 130 Taka",
                "👉 Delivery charges may be completely free for special offers or specific orders."
            ]
        },
        {
            icon: LifeBuoy,
            question_bn: "গ্রাহক সেবা কেমন পাবো?",
            question_en: "What kind of customer service can I expect?",
            answer_bn: [
                "আমরা বিশ্বাস করি – একজন সন্তুষ্ট গ্রাহকই আমাদের সবচেয়ে বড় অর্জন। সেই জন্য আমাদের একটি ২৪/৭ কাস্টমার সার্ভিস টিম কাজ করছে।",
                "আপনার অর্ডার সঠিকভাবে ডেলিভারি হয়েছে কিনা তা আমরা নিশ্চিত করি।",
                "যদি কোনো অভিযোগ থাকে (পণ্য ভুল, ক্ষতিগ্রস্ত বা ডেলিভারি সংক্রান্ত), তাহলে দ্রুত ব্যবস্থা গ্রহণ করা হয়।",
                "অভিযোগ/মন্তব্য পাওয়ার ১ ঘণ্টার মধ্যে প্রাথমিক জবাব এবং সর্বোচ্চ ২৪ ঘন্টার মধ্যে পূর্ণাঙ্গ সমাধান দেওয়ার প্রতিশ্রুতি দিচ্ছি।"
            ],
            answer_en: [
                "We believe that a satisfied customer is our greatest achievement. That's why we have a 24/7 customer service team.",
                "We ensure that your order is delivered correctly.",
                "If there are any complaints (wrong product, damaged, or delivery-related), prompt action is taken.",
                "We promise an initial response within 1 hour of receiving a complaint/comment and a full resolution within a maximum of 24 hours."
            ]
        },
        {
            icon: CreditCard,
            question_bn: "পেমেন্ট পদ্ধতি কী কী আছে?",
            question_en: "What are the payment methods?",
            answer_bn: [
                "ক্যাশ অন ডেলিভারি (COD)",
                "বিকাশ / নগদ / রকেট",
                "ব্যাংক ট্রান্সফার",
                "ডিসকাউন্ট বা বিশেষ অফারের জন্য শপিং ভাউচার"
            ],
            answer_en: [
                "Cash on Delivery (COD)",
                "bKash / Nagad / Rocket",
                "Bank Transfer",
                "Shopping vouchers for discounts or special offers"
            ]
        },
        {
            icon: RefreshCw,
            question_bn: "রিটার্ন ও রিফান্ড কীভাবে কাজ করে?",
            question_en: "How do returns and refunds work?",
            answer_bn: [
                "পণ্য গ্রহণের ৭ দিনের মধ্যে রিটার্ন করতে পারবেন (যদি বৈধ কারণ থাকে)।",
                "ক্ষতিগ্রস্ত, ভুল, অসম্পূর্ণ বা বিবরণের সাথে অমিল পণ্যের ক্ষেত্রে রিফান্ড প্রযোজ্য।",
                "রিফান্ড পাওয়া যাবে ব্যাংক ট্রান্সফার, বিকাশ/নগদ/রকেট অথবা শপিং ভাউচার এর মাধ্যমে।"
            ],
            answer_en: [
                "You can return a product within 7 days of receipt (if there is a valid reason).",
                "Refunds are applicable for damaged, wrong, incomplete, or products that do not match the description.",
                "Refunds are available via Bank Transfer, bKash/Nagad/Rocket, or Shopping Voucher."
            ],
            link: {
                text_bn: "বিস্তারিত জানুন আমাদের Return & Refund Policy-তে।",
                text_en: "Learn more in our [Return & Refund Policy].",
                href: "/return-policy"
            }
        },
        {
            icon: Phone,
            question_bn: "কিভাবে যোগাযোগ করব?",
            question_en: "How can I contact you?",
             answer_bn: [
                "যেকোনো প্রশ্ন, অভিযোগ বা সহায়তার জন্য আমাদের কাস্টমার কেয়ার টিম সবসময় প্রস্তুত:",
                "📱 WhatsApp: 01990-457545",
                "✉️ ইমেইল: support@ponnokenakata.com"
            ],
            answer_en: [
                "For any questions, complaints, or assistance, our customer care team is always ready:",
                "📱 WhatsApp: 01990-457545",
                "✉️ Email: support@ponnokenakata.com"
            ]
        }
    ];

    const content = {
        bn: {
            title: "সাধারণ জিজ্ঞাসা (FAQ)",
        },
        en: {
            title: "Frequently Asked Questions (FAQ)",
        },
    };
    
    const currentContent = content[language];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-12 lg:py-16 bg-primary/5">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold font-headline text-foreground">❓ {currentContent.title}</h1>
                    </div>
                </section>

                <section className="py-16 lg:py-24 bg-background">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faqData.map((faq, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <AccordionItem value={`item-${index}`} className="border-none">
                                        <AccordionTrigger className="p-6 hover:no-underline hover:bg-secondary/50">
                                            <div className="flex items-center gap-4 text-left">
                                                <faq.icon className="h-6 w-6 text-primary shrink-0" />
                                                <span className="font-semibold text-lg">{language === 'bn' ? faq.question_bn : faq.question_en}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pb-6 pt-0">
                                            <div className="space-y-2 text-muted-foreground pl-10">
                                                {(language === 'bn' ? faq.answer_bn : faq.answer_en).map((line, i) => (
                                                    <p key={i}>{line}</p>
                                                ))}
                                                {faq.link && (
                                                    <p className="pt-2">
                                                        <Link href={faq.link.href} passHref>
                                                            <Button variant="link" className="p-0 h-auto">
                                                                👉 {language === 'bn' ? faq.link.text_bn : faq.link.text_en.replace('[', '').replace(']', '')}
                                                            </Button>
                                                        </Link>
                                                    </p>
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Card>
                            ))}
                        </Accordion>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

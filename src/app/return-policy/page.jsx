"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, CircleDollarSign, Truck, XCircle, LifeBuoy, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ReturnPolicyPage() {
    const { language } = useLanguage();

    const content = {
        bn: {
            title: "রিটার্ন পলিসি",
            refundableTitle: "✅ কোন কোন ক্ষেত্রে পণ্য ফেরতযোগ্য",
            refundableCases: [
                "ক্ষতিগ্রস্ত বা ত্রুটিপূর্ণ পণ্য (ভাঙা/ফাটা/কার্যক্ষমতায় সমস্যা থাকলে)",
                "অসম্পূর্ণ ডেলিভারি (অর্ডারকৃত পণ্য বা পরিমাণ কম থাকলে)",
                "ভুল পণ্য ডেলিভারি (ভুল আকার, রঙ, মডেল বা মেয়াদোত্তীর্ণ হলে)",
                "বিজ্ঞাপনের সাথে অমিল (পণ্যের বিবরণ বা ছবির সাথে বাস্তবের অমিল থাকলে)",
            ],
            timelineTitle: "⏳ রিটার্নের সময়সীমা",
            timelineText: "পণ্য গ্রহণের ৭ দিনের মধ্যে আমাদের কাস্টমার সার্ভিস টিমকে জানাতে হবে। ৭ দিনের পর কোনো রিটার্ন গ্রহণ করা হবে না।",
            refundPolicyTitle: "💰 রিফান্ড নীতিমালা",
            refundPolicyIntro: "আপনার ফেরত দেওয়া পণ্য যাচাইয়ের পর আমাদের রিফান্ড নীতিমালা অনুযায়ী রিফান্ড প্রক্রিয়া শুরু হবে।",
            viewRefundPolicy: "বিস্তারিত রিফান্ড পলিসি দেখুন",
            returnProcessTitle: "🚚 রিটার্ন প্রক্রিয়া",
            returnProcessSteps: [
                "কাস্টমার সার্ভিসে যোগাযোগ করে রিটার্ন রিকোয়েস্ট করুন।",
                "পণ্যটি অবশ্যই অপরিবর্তিত ও আসল প্যাকেজিং সহ ফেরত দিতে হবে।",
                "ডেলিভারির সময় যদি ক্ষতিগ্রস্ত হয়, প্রমাণ হিসেবে ছবি/ভিডিও পাঠাতে হবে।",
            ],
            nonRefundableTitle: "❌ যেসব ক্ষেত্রে রিটার্ন প্রযোজ্য নয়",
            nonRefundableCases: [
                "ব্যবহৃত বা আংশিক ক্ষতিগ্রস্ত পণ্য",
                "হাইজিন বা পার্সোনাল কেয়ার প্রোডাক্ট (যদি না তা ত্রুটিপূর্ণ হয়)",
                "ডিসকাউন্ট বা বিশেষ অফারে কেনা কিছু নির্দিষ্ট পণ্য (অর্ডারের সময় উল্লেখ থাকবে)",
            ],
            customerSupportTitle: "📞 কাস্টমার সাপোর্ট",
            customerSupportText: "রিটার্ন বা রিফান্ডের জন্য যোগাযোগ করুন:",
            whatsapp: "WhatsApp: 01990-457545",
            email: "ইমেইল: support@ponnokenakata.com",
        },
        en: {
            title: "Return Policy",
            refundableTitle: "✅ Cases Where Product is Returnable",
            refundableCases: [
                "Damaged or defective product (broken/cracked/functional issues)",
                "Incomplete delivery (missing items or quantity)",
                "Wrong product delivered (wrong size, color, model, or expired)",
                "Mismatch with advertisement (discrepancy with product description or images)",
            ],
            timelineTitle: "⏳ Return Timeline",
            timelineText: "You must inform our customer service team within 7 days of receiving the product. No returns will be accepted after 7 days.",
            refundPolicyTitle: "💰 Refund Policy",
            refundPolicyIntro: "The refund process will begin after the returned product is verified, according to our refund policy.",
            viewRefundPolicy: "View Detailed Refund Policy",
            returnProcessTitle: "🚚 Return Process",
            returnProcessSteps: [
                "Contact customer service to request a return.",
                "The product must be returned in its original, unaltered condition and packaging.",
                "If damaged during delivery, photos/videos must be sent as proof.",
            ],
            nonRefundableTitle: "❌ Cases Where Return is Not Applicable",
            nonRefundableCases: [
                "Used or partially damaged products",
                "Hygiene or personal care products (unless defective)",
                "Certain products bought on discount or special offers (will be mentioned at the time of order)",
            ],
            customerSupportTitle: "📞 Customer Support",
            customerSupportText: "For returns or refunds, please contact:",
            whatsapp: "WhatsApp: 01990-457545",
            email: "Email: support@ponnokenakata.com",
        },
    };

    const currentContent = content[language];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-12 lg:py-16 bg-primary/5">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold font-headline text-foreground">↩️ {currentContent.title}</h1>
                    </div>
                </section>

                <section className="py-16 lg:py-24 bg-background">
                    <div className="container mx-auto px-4 space-y-8 max-w-4xl">

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3"><CheckCircle className="h-6 w-6 text-green-600" />{currentContent.refundableTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.refundableCases.map((text, index) => <li key={index}>{text}</li>)}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3"><Clock className="h-6 w-6 text-blue-600" />{currentContent.timelineTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{currentContent.timelineText}</p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3"><CircleDollarSign className="h-6 w-6 text-yellow-600" />{currentContent.refundPolicyTitle}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-muted-foreground">{currentContent.refundPolicyIntro}</p>
                                <Link href="/refund-policy">
                                    <Button variant="outline">
                                        <LinkIcon className="mr-2 h-4 w-4" />
                                        {currentContent.viewRefundPolicy}
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3"><Truck className="h-6 w-6 text-purple-600" />{currentContent.returnProcessTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground list-decimal list-inside">
                                    {currentContent.returnProcessSteps.map((text, index) => <li key={index}>{text}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3"><XCircle className="h-6 w-6 text-red-600" />{currentContent.nonRefundableTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                               <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.nonRefundableCases.map((text, index) => <li key={index}>{text}</li>)}
                                </ul>
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

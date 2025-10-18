"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, FileText, Database, Cookie, Shield, Users, Edit, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function PrivacyPolicyPage() {
    const { language } = useLanguage();

    const content = {
        bn: {
            title: "গোপনীয়তা নীতিমালা",
            intro: "আমরা আপনার ব্যক্তিগত তথ্যের গোপনীয়তা ও নিরাপত্তাকে সর্বোচ্চ গুরুত্ব দিই। আমাদের সাথে কেনাকাটা করার সময় আপনি যে তথ্য আমাদের প্রদান করেন, তা কীভাবে সংগ্রহ, ব্যবহার ও সুরক্ষিত রাখা হয় তা নিচে উল্লেখ করা হলো।",
            
            collectedInfoTitle: "📌 কোন তথ্য আমরা সংগ্রহ করি?",
            collectedInfoIntro: "আপনার কেনাকাটা ও সেবার সুবিধার্থে আমরা নিম্নলিখিত তথ্য সংগ্রহ করতে পারি –",
            collectedInfoList: [
                "নাম, মোবাইল নম্বর এবং ঠিকানা",
                "ইমেইল ঠিকানা",
                "পেমেন্ট সম্পর্কিত তথ্য (বিকাশ/নগদ/রকেট/ব্যাংক)",
                "ব্রাউজিং তথ্য (ওয়েবসাইট ভিজিট, কুকিজ, পছন্দের তালিকা ইত্যাদি)"
            ],

            usageInfoTitle: "📌 আমরা এই তথ্যগুলো কীভাবে ব্যবহার করি?",
            usageInfoIntro: "আপনার তথ্য ব্যবহৃত হয় –",
            usageInfoList: [
                "অর্ডার গ্রহণ, প্রক্রিয়া ও ডেলিভারি নিশ্চিত করতে",
                "কাস্টমার সার্ভিস ও সাপোর্ট প্রদানে",
                "অফার, ডিসকাউন্ট ও আপডেট জানাতে",
                "আমাদের সেবা উন্নত করতে এবং আপনার কেনাকাটার অভিজ্ঞতাকে আরও সহজ ও নিরাপদ করতে"
            ],
            usageInfoNote: "👉 আমরা কখনোই আপনার তথ্য তৃতীয় পক্ষের কাছে বিক্রি করি না।",

            cookiesTitle: "🍪 কুকিজ (Cookies) এর ব্যবহার",
            cookiesIntro: "আমাদের ওয়েবসাইটে কুকিজ ব্যবহার করা হয় –",
            cookiesList: [
                "আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে",
                "আপনার পছন্দ মনে রাখতে",
                "ভবিষ্যতে আরও দ্রুত ও সহজে কেনাকাটার সুযোগ দিতে"
            ],
            cookiesNote: "আপনি চাইলে আপনার ব্রাউজার থেকে কুকিজ বন্ধ করতে পারবেন, তবে এতে কিছু ফিচার সীমিত হতে পারে।",

            securityTitle: "🛡️ তথ্যের নিরাপত্তা",
            securityList: [
                "আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে আমরা আধুনিক সিকিউরিটি টেকনোলজি ব্যবহার করি।",
                "অননুমোদিত প্রবেশ, পরিবর্তন বা অপব্যবহার প্রতিরোধে আমাদের সিস্টেম সর্বদা মনিটর করা হয়।"
            ],

            thirdPartyTitle: "👥 তৃতীয় পক্ষের সেবা",
            thirdPartyText: "কখনও কখনও আমরা কুরিয়ার, পেমেন্ট গেটওয়ে বা ডেলিভারি সার্ভিস ব্যবহার করি। এ ক্ষেত্রে আপনার প্রয়োজনীয় তথ্য (যেমন নাম, ফোন নম্বর, ঠিকানা) সংশ্লিষ্ট সেবাদাতার সাথে শেয়ার করা হতে পারে, তবে তা শুধুমাত্র অর্ডার সম্পন্ন করার উদ্দেশ্যে।",

            childrenPrivacyTitle: "👶 শিশুদের গোপনীয়তা",
            childrenPrivacyText: "আমাদের সেবা ১৩ বছরের নিচে শিশুদের জন্য নয়। আমরা সচেতনভাবে শিশুদের ব্যক্তিগত তথ্য সংগ্রহ করি না।",
            
            yourControlTitle: "✍️ আপনার নিয়ন্ত্রণ",
            yourControlList: [
                "আপনি চাইলে আমাদের সাথে যোগাযোগ করে আপনার তথ্য পরিবর্তন, হালনাগাদ বা মুছে ফেলতে পারবেন।",
                "প্রোমোশনাল মেসেজ বা ইমেইল না চাইলে আপনি সহজেই unsubscribe করতে পারবেন।"
            ],
            
            policyChangeTitle: "📜 নীতিমালা পরিবর্তন",
            policyChangeText: "Ponno Kenakata সময় সময় এই প্রাইভেসি নীতিমালা আপডেট করতে পারে। নতুন নীতিমালা প্রকাশের সাথে সাথেই তা কার্যকর হবে।",

            contactTitle: "📞 যোগাযোগ করুন",
            contactIntro: "যদি আমাদের প্রাইভেসি নীতিমালা নিয়ে কোনো প্রশ্ন বা অনুরোধ থাকে, তাহলে যোগাযোগ করুন –",
            whatsapp: "WhatsApp: 01990-457545",
            email: "ইমেইল: support@ponnokenakata.com"
        },
        en: {
            title: "Privacy Policy",
            intro: "We give utmost importance to the privacy and security of your personal information. Below is how we collect, use, and protect the information you provide while shopping with us.",

            collectedInfoTitle: "📌 What information do we collect?",
            collectedInfoIntro: "To facilitate your shopping and services, we may collect the following information:",
            collectedInfoList: [
                "Name, mobile number, and address",
                "Email address",
                "Payment related information (bKash/Nagad/Rocket/Bank)",
                "Browsing information (website visits, cookies, wishlist, etc.)"
            ],
            
            usageInfoTitle: "📌 How do we use this information?",
            usageInfoIntro: "Your information is used to:",
            usageInfoList: [
                "Accept, process, and confirm order delivery",
                "Provide customer service and support",
                "Inform about offers, discounts, and updates",
                "Improve our services and make your shopping experience easier and safer"
            ],
            usageInfoNote: "👉 We never sell your information to third parties.",

            cookiesTitle: "🍪 Use of Cookies",
            cookiesIntro: "Our website uses cookies to:",
            cookiesList: [
                "Improve your browsing experience",
                "Remember your preferences",
                "Enable faster and easier shopping in the future"
            ],
            cookiesNote: "You can disable cookies from your browser, but this may limit some features.",

            securityTitle: "🛡️ Information Security",
            securityList: [
                "We use modern security technology to protect your personal information.",
                "Our system is constantly monitored to prevent unauthorized access, alteration, or misuse."
            ],

            thirdPartyTitle: "👥 Third-Party Services",
            thirdPartyText: "Sometimes we use courier, payment gateway, or delivery services. In such cases, your necessary information (like name, phone number, address) may be shared with the respective service provider, but only for the purpose of completing the order.",

            childrenPrivacyTitle: "👶 Children's Privacy",
            childrenPrivacyText: "Our service is not intended for children under 13. We do not knowingly collect personal information from children.",
            
            yourControlTitle: "✍️ Your Control",
            yourControlList: [
                "You can contact us to change, update, or delete your information.",
                "You can easily unsubscribe if you do not want to receive promotional messages or emails."
            ],

            policyChangeTitle: "📜 Policy Changes",
            policyChangeText: "Ponno Kenakata may update this Privacy Policy from time to time. The new policy will be effective immediately upon publication.",

            contactTitle: "📞 Contact Us",
            contactIntro: "If you have any questions or requests regarding our Privacy Policy, please contact us:",
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
                        <h1 className="text-4xl font-bold font-headline text-foreground">🔒 {currentContent.title}</h1>
                         <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">{currentContent.intro}</p>
                    </div>
                </section>

                <section className="py-16 lg:py-24 bg-background">
                    <div className="container mx-auto px-4 space-y-8 max-w-4xl">
                        
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-3"><FileText /> {currentContent.collectedInfoTitle}</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-muted-foreground">{currentContent.collectedInfoIntro}</p>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.collectedInfoList.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                             <CardHeader><CardTitle className="flex items-center gap-3"><Database /> {currentContent.usageInfoTitle}</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-muted-foreground">{currentContent.usageInfoIntro}</p>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.usageInfoList.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                                <p className="font-semibold pt-2">{currentContent.usageInfoNote}</p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                             <CardHeader><CardTitle className="flex items-center gap-3"><Cookie /> {currentContent.cookiesTitle}</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-muted-foreground">{currentContent.cookiesIntro}</p>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.cookiesList.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                                <p className="text-sm text-muted-foreground pt-2">{currentContent.cookiesNote}</p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                             <CardHeader><CardTitle className="flex items-center gap-3"><Shield /> {currentContent.securityTitle}</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.securityList.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-3"><Users /> {currentContent.thirdPartyTitle}</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{currentContent.thirdPartyText}</p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-3"><Edit /> {currentContent.yourControlTitle}</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {currentContent.yourControlList.map((item, i) => <li key={i}>{item}</li>)}
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

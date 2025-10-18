"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Sparkles, Send } from 'lucide-react';
import { generateNewsletter } from '@/ai/flows/generate-newsletter-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useProduct } from '@/context/product-context';
import { useLanguage } from '@/context/language-context';

export default function AdminNewsletterPage() {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { products, loading: productsLoading } = useProduct();
    const [isGenerated, setIsGenerated] = useState(false);
    const { language } = useLanguage();

    const content = {
        en: {
            pageTitle: "Newsletter",
            cardTitle: "Generate & Send Newsletter",
            cardDescription: "Use AI to automatically generate a newsletter based on the latest deals and send it to your subscribers.",
            generateButton: "Generate with AI",
            generatingButton: "Generating...",
            loadingProducts: "Loading product data...",
            errorTitle: "Error",
            generationFailed: "Failed to generate newsletter. Please try again.",
            subjectLabel: "Subject",
            bodyLabel: "Body",
            sendButton: "Send to Subscribers (Coming Soon)"
        },
        bn: {
            pageTitle: "নিউজলেটার",
            cardTitle: "নিউজলেটার তৈরিและপ্রেরণ করুন",
            cardDescription: "সর্বশেষ ডিলের উপর ভিত্তি করে স্বয়ংক্রিয়ভাবে একটি নিউজলেটার তৈরি করতে AI ব্যবহার করুন এবং আপনার গ্রাহকদের কাছে পাঠান।",
            generateButton: "AI দিয়ে তৈরি করুন",
            generatingButton: "তৈরি হচ্ছে...",
            loadingProducts: "পণ্যের ডেটা লোড হচ্ছে...",
            errorTitle: "ত্রুটি",
            generationFailed: "নিউজলেটার তৈরি করতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।",
            subjectLabel: "বিষয়",
            bodyLabel: "মূল অংশ",
            sendButton: "গ্রাহকদের কাছে পাঠান (শীঘ্রই আসছে)"
        }
    };
    const t = content[language];

    const handleGenerateNewsletter = async () => {
        setIsLoading(true);
        setError(null);
        setIsGenerated(false);
        try {
            const topDeals = products
                .filter(p => p.originalPrice && p.originalPrice > p.price)
                .sort((a,b) => (b.originalPrice - b.price) - (a.originalPrice - a.price))
                .slice(0, 5)
                .map(p => ({ name: p.name, price: p.price, originalPrice: p.originalPrice }));
            
            const result = await generateNewsletter({ topDeals });
            setSubject(result.subject);
            setBody(result.body);
            setIsGenerated(true);
        } catch (err) {
            console.error(err);
            setError(t.generationFailed);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-6 w-6" />
                        {t.cardTitle}
                    </CardTitle>
                    <CardDescription>
                        {t.cardDescription}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Button onClick={handleGenerateNewsletter} disabled={isLoading || productsLoading}>
                            <Sparkles className="mr-2 h-4 w-4" />
                            {isLoading ? t.generatingButton : t.generateButton}
                        </Button>
                        {productsLoading && <p className="text-sm text-muted-foreground mt-2">{t.loadingProducts}</p>}
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertTitle>{t.errorTitle}</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {isLoading && (
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-40 w-full" />
                        </div>
                    )}
                    
                    {isGenerated && (
                        <div className="space-y-4">
                            <div>
                                <label className="font-semibold">{t.subjectLabel}</label>
                                <Input 
                                    value={subject} 
                                    onChange={(e) => setSubject(e.target.value)} 
                                    className="mt-1 font-mono"
                                />
                            </div>
                             <div>
                                <label className="font-semibold">{t.bodyLabel}</label>
                                <Textarea 
                                    value={body} 
                                    onChange={(e) => setBody(e.target.value)} 
                                    rows={15} 
                                    className="mt-1 font-mono"
                                />
                            </div>
                            <Button disabled>
                                <Send className="mr-2 h-4 w-4" />
                                {t.sendButton}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

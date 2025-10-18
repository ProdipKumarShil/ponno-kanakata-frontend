"use client";

import { useProduct } from '@/context/product-context';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/context/language-context';
import ProductCard from './product-card';
import { useMemo } from 'react';

export default function OfferSuggestions() {
    const { products, loading } = useProduct();
    const { language } = useLanguage();

    const content = {
        bn: {
            title: "আপনার জন্য বিশেষ পরামর্শ",
        },
        en: {
            title: "Special Suggestions for You",
        }
    };
    
    const suggestedProducts = useMemo(() => {
        return [...products]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);
    }, [products]);

    const renderSkeletons = () => (
        Array.from({ length: 3 }).map((_, index) => (
             <div key={index} className="space-y-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-1/3" />
            </div>
        ))
    );

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold font-headline flex items-center justify-center gap-3">
                    <BrainCircuit className="h-7 w-7 text-primary" />
                    {content[language].title}
                </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
                {loading && renderSkeletons()}

                {!loading && suggestedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

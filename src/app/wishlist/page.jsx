"use client";

import { useWishlist } from "@/context/wishlist-context";
import { useLanguage } from "@/context/language-context";
import { useProduct } from "@/context/product-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";


export default function WishlistPage() {
    const { wishlist } = useWishlist();
    const { language } = useLanguage();
    const { products } = useProduct();

    const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

    const content = {
        bn: {
            title: "আপনার পছন্দের তালিকা",
            empty: "আপনার পছন্দের তালিকা খালি।",
            browseProducts: "পণ্য দেখুন"
        },
        en: {
            title: "Your Wishlist",
            empty: "Your wishlist is empty.",
            browseProducts: "Browse Products"
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 font-headline">{content[language].title}</h1>
                {wishlistedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {wishlistedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Heart className="mx-auto h-24 w-24 text-muted-foreground/30 mb-6" />
                        <h2 className="text-2xl font-semibold mb-2">{content[language].empty}</h2>
                        <Link href="/products">
                            <Button>{content[language].browseProducts}</Button>
                        </Link>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

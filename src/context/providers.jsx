"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "./language-context";
import { CartProvider } from "./cart-context";
import { WishlistProvider } from "./wishlist-context";
import { ThemeProvider } from "next-themes";
import { CategoryProvider } from "./category-context";
import { ProductProvider } from "./product-context";

export function Providers({ children }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LanguageProvider>
                 <ProductProvider>
                    <WishlistProvider>
                        <CategoryProvider>
                            <CartProvider>
                                {children}
                            </CartProvider>
                        </CategoryProvider>
                    </WishlistProvider>
                </ProductProvider>
            </LanguageProvider>
        </ThemeProvider>
    )
}

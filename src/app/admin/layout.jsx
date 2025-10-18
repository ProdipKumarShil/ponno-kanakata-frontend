"use client";

import { AuthProvider, useAuth } from "@/context/auth-context";
import { CategoryProvider } from "@/context/category-context";
import { ProductProvider } from "@/context/product-context";
import { LanguageProvider } from "@/context/language-context";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function AdminLayoutComponent({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/admin/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-secondary/50">
                <p className="text-lg text-muted-foreground">Loading Admin Panel...</p>
            </div>
        );
    }
    
    if (!user) {
        return null;
    }

    // User is authenticated, render the admin panel layout
    return (
        <div className="flex h-screen bg-secondary/50">
            <AdminSidebar />
            <main className="flex-1 p-6 overflow-y-auto">
                {children}
            </main>
            <Toaster />
        </div>
    );
}

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    return (
        <LanguageProvider>
            <AuthProvider>
                <ProductProvider>
                    <CategoryProvider>
                        {pathname === '/admin/login' ? (
                            children
                        ) : (
                            <AdminLayoutComponent>
                                {children}
                            </AdminLayoutComponent>
                        )}
                    </CategoryProvider>
                </ProductProvider>
            </AuthProvider>
        </LanguageProvider>
    )
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LogOut, Package, LayoutGrid, BarChart3, Users, MessageSquare, Mail, Settings, Newspaper, Star } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const navLinksConfig = {
    owner: [
        { href: "/admin/dashboard", label: "ড্যাশবোর্ড", label_en: "Dashboard", icon: BarChart3 },
        { href: "/admin/products", label: "পণ্য", label_en: "Products", icon: Package },
        { href: "/admin/categories", label: "ক্যাটাগরি", label_en: "Categories", icon: LayoutGrid },
        { href: "/admin/chat", label: "চ্যাট", label_en: "Chat", icon: MessageSquare },
        { href: "/admin/reviews", label: "রিভিউ", label_en: "Reviews", icon: Star },
        { href: "/admin/users", label: "ব্যবহারকারী", label_en: "Users", icon: Users },
        { href: "/admin/newsletter", label: "নিউজলেটার", label_en: "Newsletter", icon: Mail },
        { href: "/admin/blogs", label: "ব্লগ", label_en: "Blogs", icon: Newspaper },
    ],
    manager: [
        { href: "/admin/dashboard", label: "ড্যাশবোর্ড", label_en: "Dashboard", icon: BarChart3 },
        { href: "/admin/products", label: "পণ্য", label_en: "Products", icon: Package },
        { href: "/admin/categories", label: "ক্যাটাগরি", label_en: "Categories", icon: LayoutGrid },
        { href: "/admin/chat", label: "চ্যাট", label_en: "Chat", icon: MessageSquare },
        { href: "/admin/reviews", label: "রিভিউ", label_en: "Reviews", icon: Star },
    ],
    editor: [
        { href: "/admin/products", label: "পণ্য", label_en: "Products", icon: Package },
        { href: "/admin/categories", label: "ক্যাটাগরি", label_en: "Categories", icon: LayoutGrid },
        { href: "/admin/blogs", label: "ব্লগ", label_en: "Blogs", icon: Newspaper },
        { href: "/admin/reviews", label: "রিভিউ", label_en: "Reviews", icon: Star },
    ],
    viewer: [
        { href: "/admin/dashboard", label: "ড্যাশবোর্ড", label_en: "Dashboard", icon: BarChart3 },
    ],
};

export default function AdminSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { language, toggleLanguage } = useLanguage();

    const navLinks = user?.role ? navLinksConfig[user.role] : [];
    
    return (
        <aside className="w-64 bg-background border-r flex flex-col">
            <div className="p-4 border-b">
                 <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="https://i.postimg.cc/d1CCFy7K/Ponno-Kenakata-Transparent-BG-2.png"
                        alt="Ponno Kenakata Logo"
                        width={32}
                        height={32}
                    />
                    <span className="text-xl font-bold font-headline text-primary">
                        {language === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}
                    </span>
                </Link>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                {navLinks.map(link => (
                     <Link href={link.href} key={link.href}>
                         <span className={cn(
                             "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                             pathname === link.href || (link.href !== "/admin/dashboard" && pathname.startsWith(link.href)) 
                               ? "bg-primary text-primary-foreground" 
                               : "text-muted-foreground hover:bg-secondary"
                         )}>
                            <link.icon className="h-5 w-5" />
                            {language === 'bn' ? link.label : link.label_en}
                         </span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t space-y-4">
                 <Link href="/" target="_blank">
                     <Button variant="outline" className="w-full justify-start">
                        <Home className="mr-2 h-4 w-4" />
                        {language === 'bn' ? 'ওয়েবসাইট দেখুন' : 'View Website'}
                    </Button>
                </Link>
                 <Button variant="ghost" onClick={logout} className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-500/10">
                    <LogOut className="mr-2 h-4 w-4" />
                     {language === 'bn' ? 'লগআউট' : 'Logout'}
                </Button>
                <div className="flex items-center justify-between">
                    <Label htmlFor="language-toggle-admin" className="text-sm text-muted-foreground">{language === 'bn' ? 'ভাষা' : 'Language'}</Label>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="language-toggle-admin" className="text-sm font-medium">EN</Label>
                        <Switch id="language-toggle-admin" checked={language === 'bn'} onCheckedChange={toggleLanguage} />
                        <Label htmlFor="language-toggle-admin" className="text-sm font-medium">BN</Label>
                    </div>
                </div>
                 <div className="text-center text-xs text-muted-foreground pt-2 border-t">
                    {language === 'bn' ? 'লগইন করেছেন:' : 'Logged in as'}{' '} 
                    <span className="font-semibold">{user?.email}</span> (<span className="capitalize">{user?.role}</span>)
                 </div>
            </div>
        </aside>
    )
}

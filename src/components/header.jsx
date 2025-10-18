"use client";

import Link from "next/link";
import { User, Menu, ChevronDown, LayoutGrid, UserPlus, LogIn, Home, Award, Tag, Sparkles, Star, Moon, Sun, Heart, Leaf, Shirt } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/context/language-context";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import CartSheet from "./cart-sheet";
import { useCategory } from "@/context/category-context";
import CategoryIcon from "./category-icon";
import { CommandSearch } from "./command-search";
import { useTheme } from "next-themes";
import Image from "next/image";


const navLinks = [
  { href: "/", label: "হোম", label_en: "Home", icon: Home },
  { href: "/products", label: "সকল পণ্য", label_en: "All Products" },
  { href: "/products?sort=popular", label: "সবচেয়ে জনপ্রিয়", label_en: "Most Popular", icon: Star },
  { href: "/products?sort=newest", label: "নতুন আগমন", label_en: "New Arrival", icon: Sparkles },
  { href: "/products?sort=top-ranking", label: "টপ রেংকিং", label_en: "Top Ranking", icon: Award },
  { href: "/products?sort=top-deals", label: "সেরা ডিল", label_en: "Top Deals", icon: Tag },
];


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const { categories } = useCategory();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const content = {
    bn: {
      allCategories: "সকল ক্যাটাগরি",
      showAllCategories: "সব ক্যাটাগরি দেখুন",
      myAccount: "আমার অ্যাকাউন্ট",
      login: "লগইন",
      signup: "সাইন আপ",
      wishlist: "পছন্দের তালিকা",
      cart: "শপিং কার্ট",
      search: "অনুসন্ধান",
      theme: "থিম পরিবর্তন",
      openMenu: "মেনু খুলুন",
      languageToggle: "ভাষা পরিবর্তন করুন"
    },
    en: {
      allCategories: "All Categories",
      showAllCategories: "Show All Categories",
      myAccount: "My Account",
      login: "Login",
      signup: "Sign Up",
      wishlist: "Wishlist",
      cart: "Shopping Cart",
      search: "Search",
      theme: "Toggle theme",
      openMenu: "Open Menu",
      languageToggle: "Toggle language"
    }
  }

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
                <Image
                  src="https://i.postimg.cc/d1CCFy7K/Ponno-Kenakata-Transparent-BG-2.png"
                  alt="Ponno Kenakata Logo"
                  width={32}
                  height={32}
                />
              <span className="text-xl font-bold font-headline text-primary">
                Ponno Kenakata
              </span>
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              <TooltipProvider>
                  {navLinks.map((link) => (
                    <Tooltip key={link.href}>
                      <TooltipTrigger asChild>
                        <Link
                          href={link.href}
                          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                        >
                          {link.icon && <link.icon className="h-4 w-4" />}
                          {language === 'bn' ? link.label : link.label_en}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{language === 'bn' ? link.label : link.label_en}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  <DropdownMenu>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-0 hover:bg-transparent">
                            {language === 'bn' ? content.bn.allCategories : content.en.allCategories}
                            <ChevronDown className="h-4 w-4 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                       <TooltipContent>
                        <p>{language === 'bn' ? content.bn.allCategories : content.en.allCategories}</p>
                      </TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent className="w-64">
                      {categories.map((category) => (
                        category.subcategories ? (
                          <DropdownMenuSub key={category.id}>
                            <DropdownMenuSubTrigger>
                              <CategoryIcon slug={category.slug} className="mr-2" />
                              <span>{language === 'bn' ? category.name_bn : category.name}</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              {category.subcategories.map(sub => (
                                sub.subcategories ? (
                                   <DropdownMenuSub key={sub.id}>
                                      <DropdownMenuSubTrigger>
                                        <CategoryIcon slug={sub.slug} className="mr-2" />
                                        <span>{language === 'bn' ? sub.name_bn : sub.name}</span>
                                      </DropdownMenuSubTrigger>
                                      <DropdownMenuSubContent>
                                        {sub.subcategories.map(subsub => (
                                          <Link href={`/products?category=${subsub.slug}`} key={subsub.id}>
                                              <DropdownMenuItem>
                                                  <CategoryIcon slug={subsub.slug} className="mr-2" />
                                                  <span>{language === 'bn' ? subsub.name_bn : subsub.name}</span>
                                              </DropdownMenuItem>
                                          </Link>
                                        ))}
                                      </DropdownMenuSubContent>
                                  </DropdownMenuSub>
                                ) : (
                                  <Link href={`/products?category=${sub.slug}`} key={sub.id}>
                                      <DropdownMenuItem>
                                          <CategoryIcon slug={sub.slug} className="mr-2" />
                                          <span>{language === 'bn' ? sub.name_bn : sub.name}</span>
                                      </DropdownMenuItem>
                                  </Link>
                                )
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                        ) : (
                          <Link href={`/products?category=${category.slug}`} key={category.id}>
                              <DropdownMenuItem>
                                  <CategoryIcon slug={category.slug} className="mr-2" />
                                  <span>{language === 'bn' ? category.name_bn : category.name}</span>
                              </DropdownMenuItem>
                          </Link>
                        )
                      ))}
                      <DropdownMenuSeparator />
                      <Link href="/categories">
                        <DropdownMenuItem>
                            <LayoutGrid className="w-4 h-4 mr-2" />
                            <span>{language === 'bn' ? content.bn.showAllCategories : content.en.showAllCategories}</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </TooltipProvider>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <CommandSearch />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{language === 'bn' ? content.bn.search : content.en.search}</p>
                    </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="language-toggle" className="text-sm font-medium">{language === 'bn' ? 'BN' : 'EN'}</Label>
                        <Switch id="language-toggle" checked={language === 'bn'} onCheckedChange={toggleLanguage} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{language === 'bn' ? content.bn.languageToggle : content.en.languageToggle}</p>
                  </TooltipContent>
                </Tooltip>

                {isMounted && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{language === 'bn' ? content.bn.theme : content.en.theme}</p>
                        </TooltipContent>
                    </Tooltip>
                )}

                <Tooltip>
                    <TooltipTrigger asChild>
                         <Link href="/wishlist" passHref>
                            <Button variant="ghost" size="icon">
                                <Heart className="h-5 w-5" />
                                <span className="sr-only">{language === 'bn' ? content.bn.wishlist : content.en.wishlist}</span>
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{language === 'bn' ? content.bn.wishlist : content.en.wishlist}</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                       <CartSheet />
                    </TooltipTrigger>
                     <TooltipContent>
                        <p>{language === 'bn' ? content.bn.cart : content.en.cart}</p>
                    </TooltipContent>
                </Tooltip>

                <DropdownMenu>
                  <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <User className="h-5 w-5" />
                              <span className="sr-only">User Account</span>
                            </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{language === 'bn' ? content.bn.myAccount : content.en.myAccount}</p>
                      </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{language === 'bn' ? content.bn.myAccount : content.en.myAccount}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/login">
                      <DropdownMenuItem>
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>{language === 'bn' ? content.bn.login : content.en.login}</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/signup">
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>{language === 'bn' ? content.bn.signup : content.en.signup}</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="lg:hidden">
                    <Tooltip>
                        <TooltipTrigger asChild>
                              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                                <SheetTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Open Menu</span>
                                  </Button>
                                </SheetTrigger>
                                <SheetContent side="left">
                                  <SheetHeader>
                                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                                    <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Image
                                            src="https://i.postimg.cc/d1CCFy7K/Ponno-Kenakata-Transparent-BG-2.png"
                                            alt="Ponno Kenakata Logo"
                                            width={32}
                                            height={32}
                                        />
                                        <span className="text-xl font-bold font-headline text-primary">
                                            Ponno Kenakata
                                        </span>
                                    </Link>
                                  </SheetHeader>
                                  <nav className="flex flex-col gap-4">
                                     <Link
                                        href="/categories"
                                        key="categories-mobile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                                     >
                                        {language === 'bn' ? content.bn.allCategories : content.en.allCategories}
                                     </Link>
                                     {navLinks.map((link) => (
                                        <Link
                                          href={link.href}
                                          key={link.href}
                                           onClick={() => setIsMobileMenuOpen(false)}
                                          className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                        >
                                          {link.icon && <link.icon className="h-5 w-5" />}
                                          {language === 'bn' ? link.label : link.label_en}
                                        </Link>
                                      ))}
                                  </nav>
                                </SheetContent>
                              </Sheet>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{language === 'bn' ? content.bn.openMenu : content.en.openMenu}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { useLanguage } from "@/context/language-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, X } from "lucide-react";
import Checkout from "@/components/checkout";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { toBengaliNumber } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const calculateDeliveryCharge = (weightInKg) => {
    if (weightInKg <= 0) return 0;
    if (weightInKg <= 1) return 130;
    return 130 + (Math.ceil(weightInKg - 1)) * 20;
};

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const { language } = useLanguage();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0), [cart]);
    const totalWeight = useMemo(() => cart.reduce((acc, item) => acc + (item.weight ?? 0) * item.quantity, 0), [cart]);
    const deliveryCharge = useMemo(() => calculateDeliveryCharge(totalWeight), [totalWeight]);
    const total = subtotal + deliveryCharge;

    const content = {
        bn: {
            title: "আপনার শপিং কার্ট",
            continueShopping: "কেনাকাটা চালিয়ে যান",
            emptyCart: "আপনার কার্ট খালি",
            shoppingCart: "শপিং কার্ট",
            orderSummary: "অর্ডার সারাংশ",
            subtotal: "মোট",
            deliveryCharge: "ডেলিভারি চার্জ (খুলনার বাইরে)",
            total: "সর্বমোট",
            couponCode: "কুপন কোড লিখুন",
            apply: "প্রয়োগ",
            proceedToCheckout: "চেকআউটে এগিয়ে যান",
        },
        en: {
            title: "Your Shopping Cart",
            continueShopping: "Continue Shopping",
            emptyCart: "Your cart is empty.",
            shoppingCart: "Shopping Cart",
            orderSummary: "Order Summary",
            subtotal: "Subtotal",
            deliveryCharge: "Delivery (Outside Khulna)",
            total: "Total",
            couponCode: "Enter coupon code",
            apply: "Apply",
            proceedToCheckout: "Proceed to Checkout",
        }
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col min-h-screen bg-background">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8 md:py-16 text-center">
                    <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground/30 mb-6" />
                    <h1 className="text-3xl font-bold mb-4">{content[language].emptyCart}</h1>
                    <Link href="/products">
                        <Button size="lg">{content[language].continueShopping}</Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 font-headline">{content[language].title}</h1>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {content[language].shoppingCart} ({language === 'bn' ? toBengaliNumber(cart.length) : cart.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex items-center gap-4 p-4">
                                            <Image
                                                src={item.images[0]}
                                                alt={item.name}
                                                width={100}
                                                height={100}
                                                className="rounded-md object-cover w-24 h-24"
                                                data-ai-hint={`${item.category.slug} product`}
                                            />
                                            <div className="flex-grow">
                                                <Link href={`/products/${item.slug}`} className="font-semibold hover:text-primary">
                                                    {language === 'bn' ? item.name_bn : item.name}
                                                </Link>
                                                <p className="text-sm text-muted-foreground">{language === 'en' ? item.name_bn : item.name}</p>
                                                <p className="font-bold text-primary mt-1">৳{language === 'bn' ? toBengaliNumber((item.price ?? 0).toLocaleString()) : (item.price ?? 0).toLocaleString()}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                 <div className="flex items-center border rounded-md w-fit">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                                                    <span className="w-8 text-center font-bold">{language === 'bn' ? toBengaliNumber(item.quantity) : item.quantity}</span>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                                                </div>
                                                <p className="font-semibold text-right w-24">৳{language === 'bn' ? toBengaliNumber(((item.price ?? 0) * item.quantity).toLocaleString()) : ((item.price ?? 0) * item.quantity).toLocaleString()}</p>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:sticky lg:top-24 h-fit">
                        <Card>
                            <CardHeader>
                                <CardTitle>{content[language].orderSummary}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>{content[language].subtotal}</span>
                                        <span>৳{language === 'bn' ? toBengaliNumber(subtotal.toLocaleString()) : subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{content[language].deliveryCharge}</span>
                                        <span>৳{language === 'bn' ? toBengaliNumber(deliveryCharge.toLocaleString()) : deliveryCharge.toLocaleString()}</span>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>{content[language].total}</span>
                                    <span>৳{language === 'bn' ? toBengaliNumber(total.toLocaleString()) : total.toLocaleString()}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-4">
                                <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="w-full" size="lg">
                                            {content[language].proceedToCheckout} <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>{content[language].proceedToCheckout}</DialogTitle>
                                        </DialogHeader>
                                        <Checkout />
                                         <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                Close
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

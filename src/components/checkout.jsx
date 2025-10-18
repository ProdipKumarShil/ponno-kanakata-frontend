
"use client"

import { useState, useMemo, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { ArrowLeft, ArrowRight, Truck, StickyNote, Ticket, ShoppingBag } from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { toBengaliNumber } from "@/lib/utils"
import { Checkbox } from "./ui/checkbox"

const content = {
    bn: {
        shippingInfo: "ডেলিভারির তথ্য",
        orderSummary: "অর্ডার সারাংশ",
        addNote: "নোট যোগ করুন (ঐচ্ছিক)",
        coupon: "কুপন",
        apply: "প্রয়োগ",
        couponCode: "কুপন কোড",
        subtotal: "মোট",
        cod: "ক্যাশ অন ডেলিভারিতে অর্ডার করুন",
        fullName: "সম্পূর্ণ নাম",
        mobile: "মোবাইল নাম্বার",
        address: "ঠিকানা",
        deliveryCharge: "ডেলিভারি চার্জ",
        total: "সর্বমোট",
        confirmOrder: "অর্ডার কনফার্ম করুন",
        viewCart: "কার্ট দেখুন",
        proceedToCheckout: "অর্ডার করতে এগিয়ে যান",
        deliveryLocation: "ডেলিভারি এলাকা",
        insideKhulna: "খুলনা সিটির মধ্যে",
        outsideKhulna: "খুলনা সিটির বাইরে",
        totalWeight: "মোট ওজন",
        saveInfo: "পরবর্তি কেনাকাটার জন্য আমার তথ্য সংরক্ষণ করুন",
    },
    en: {
        shippingInfo: "Shipping Information",
        orderSummary: "Order Summary",
        addNote: "Add a note (optional)",
        coupon: "Coupon",
        apply: "Apply",
        couponCode: "Coupon Code",
        subtotal: "Subtotal",
        cod: "Order with Cash on Delivery",
        fullName: "Full Name",
        mobile: "Mobile Number",
        address: "Address",
        deliveryCharge: "Delivery Charge",
        total: "Total",
        confirmOrder: "Confirm Order",
        viewCart: "View Cart",
        proceedToCheckout: "Proceed to Checkout",
        deliveryLocation: "Delivery Location",
        insideKhulna: "Inside Khulna City",
        outsideKhulna: "Outside Khulna City",
        totalWeight: "Total Weight",
        saveInfo: "Save my information for next time",
    }
};

const CheckoutForm = ({
    language,
    fullName, setFullName,
    mobile, setMobile,
    address, setAddress,
    note, setNote,
    coupon, setCoupon,
    subtotal, deliveryCharge, total,
    totalWeight, deliveryLocation, setDeliveryLocation,
    saveInfo, setSaveInfo
}) => {
    
    return (
        <ScrollArea className="flex-grow">
            <div className="p-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Truck className="w-5 h-5" />
                            {content[language].shippingInfo}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">{content[language].fullName}</Label>
                            <Input id="name" placeholder={content[language].fullName} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mobile">{content[language].mobile}</Label>
                            <Input id="mobile" placeholder={content[language].mobile} value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">{content[language].address}</Label>
                            <Input id="address" placeholder={content[language].address} value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="space-y-3 pt-2">
                            <Label>{content[language].deliveryLocation}</Label>
                            <RadioGroup value={deliveryLocation} onValueChange={(value) => setDeliveryLocation(value)} className="grid grid-cols-2 gap-3">
                                <div>
                                    <RadioGroupItem value="inside" id="inside" className="peer sr-only" />
                                    <Label htmlFor="inside" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        {content[language].insideKhulna}
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="outside" id="outside" className="peer sr-only" />
                                    <Label htmlFor="outside" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        {content[language].outsideKhulna}
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                           <StickyNote className="w-5 h-5" />
                           {content[language].addNote}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea id="note" placeholder={content[language].addNote} value={note} onChange={(e) => setNote(e.target.value)} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                           <Ticket className="w-5 h-5" />
                           {content[language].couponCode}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            <Input id="coupon" placeholder={content[language].couponCode} value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                            <Button variant="outline">{content[language].apply}</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <ShoppingBag className="w-5 h-5" />
                            {content[language].orderSummary}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{content[language].subtotal}</span> 
                            <span>৳{language === 'bn' ? toBengaliNumber(subtotal.toLocaleString()) : subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{content[language].totalWeight}</span> 
                            <span>{language === 'bn' ? `${toBengaliNumber(totalWeight.toFixed(2))} কেজি` : `${totalWeight.toFixed(2)} kg`}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{content[language].deliveryCharge}</span> 
                            <span>৳{language === 'bn' ? toBengaliNumber(deliveryCharge.toLocaleString()) : deliveryCharge.toLocaleString()}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>{content[language].total}</span> 
                            <span>৳{language === 'bn' ? toBengaliNumber(total.toLocaleString()) : total.toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="save-info" checked={saveInfo} onCheckedChange={(checked) => setSaveInfo(checked)} />
                    <Label htmlFor="save-info" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                       {content[language].saveInfo}
                    </Label>
                </div>
            </div>
        </ScrollArea>
)};

const calculateDeliveryCharge = (weightInKg, location) => {
    if (location === 'inside') {
        return 70;
    }
    // Outside Khulna logic
    if (weightInKg <= 0) return 0;
    if (weightInKg <= 1) return 130;
    return 130 + (Math.ceil(weightInKg - 1)) * 20;
};

export default function Checkout({ onBack, onProceed, isSheet = false }) {
    const { cart, clearCart } = useCart()
    const { language } = useLanguage()
    
    const [fullName, setFullName] = useState("")
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState("")
    const [note, setNote] = useState("")
    const [coupon, setCoupon] = useState("")
    const [deliveryLocation, setDeliveryLocation] = useState('outside');
    const [saveInfo, setSaveInfo] = useState(true);

    useEffect(() => {
        try {
            const savedInfo = localStorage.getItem('checkoutInfo');
            if (savedInfo) {
                const { fullName, mobile, address, deliveryLocation } = JSON.parse(savedInfo);
                if (fullName) setFullName(fullName);
                if (mobile) setMobile(mobile);
                if (address) setAddress(address);
                if (deliveryLocation) setDeliveryLocation(deliveryLocation);
            }
        } catch (error) {
            console.error("Failed to load checkout info from localStorage", error);
        }
    }, []);
    
    const subtotal = useMemo(() => cart.reduce((total, item) => total + (item.price ?? 0) * item.quantity, 0), [cart]);
    const totalWeight = useMemo(() => cart.reduce((acc, item) => acc + (item.weight ?? 0) * item.quantity, 0), [cart]);
    const deliveryCharge = useMemo(() => calculateDeliveryCharge(totalWeight, deliveryLocation), [totalWeight, deliveryLocation]);
    const total = subtotal + deliveryCharge;
    
    const handleConfirmOrder = () => {
         if (saveInfo) {
            try {
                const infoToSave = JSON.stringify({ fullName, mobile, address, deliveryLocation });
                localStorage.setItem('checkoutInfo', infoToSave);
            } catch (error) {
                console.error("Failed to save checkout info to localStorage", error);
            }
        } else {
            try {
                localStorage.removeItem('checkoutInfo');
            } catch (error) {
                console.error("Failed to remove checkout info from localStorage", error);
            }
        }
        
        console.log("Order confirmed:", {
            fullName, mobile, address, note, coupon, total, deliveryCharge, subtotal, totalWeight, deliveryLocation, cart
        })
        clearCart();
        // Here you would typically handle the order submission to a backend.
        // and probably close the dialog/sheet after confirmation.
    }
    
    const isFormValid = fullName.trim() !== '' && mobile.trim() !== '' && address.trim() !== '';

    if (cart.length === 0 && isSheet) {
         return null; // Don't render checkout view in sheet if cart is empty
    }

    if (!isSheet && onProceed) { // Cart page "Proceed to checkout" button
        return (
             <div className="p-6 border-t bg-background">
                <Button className="w-full" size="lg" onClick={onProceed}>
                    {content[language].proceedToCheckout}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <CheckoutForm 
                language={language}
                fullName={fullName} setFullName={setFullName}
                mobile={mobile} setMobile={setMobile}
                address={address} setAddress={setAddress}
                note={note} setNote={setNote}
                coupon={coupon} setCoupon={setCoupon}
                subtotal={subtotal} deliveryCharge={deliveryCharge} total={total}
                totalWeight={totalWeight} deliveryLocation={deliveryLocation} setDeliveryLocation={setDeliveryLocation}
                saveInfo={saveInfo} setSaveInfo={setSaveInfo}
            />
            <div className="p-6 border-t bg-background">
                <Button className="w-full" size="lg" onClick={handleConfirmOrder} disabled={!isFormValid}>
                    {content[language].confirmOrder}
                </Button>
                {onBack && (
                     <Button variant="ghost" className="w-full mt-2" onClick={onBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {content[language].viewCart}
                    </Button>
                )}
            </div>
        </div>
    );
}

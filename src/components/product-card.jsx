"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Rating from "./rating";

import { Button } from "./ui/button";
import { ShoppingCart, Check, Heart } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/hooks/use-toast";
import { cn, toBengaliNumber } from "@/lib/utils";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";



export default function ProductCard({ product }) {
  const { language } = useLanguage();
  const { addToCart, cartIconRef } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  
  const [isAdding, setIsAdding] = useState(false);
  const imageRef = useRef(null);
  const [isVariantSelectorOpen, setIsVariantSelectorOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  const isWishlisted = isInWishlist(product.id);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const showSuccessToast = (variant) => {
     toast({
      title: language === 'bn' ? 'কার্টে যোগ করা হয়েছে' : 'Added to cart',
      description: `${language === 'bn' ? product.name_bn : product.name}${variant ? ` (${language === 'bn' ? variant.name_bn : variant.name})` : ''}`,
    });
  }

  const handleAddToCartClick = (e) => {
    e.preventDefault(); 
    
    if (product.variants && product.variants.length > 0) {
        setIsVariantSelectorOpen(true);
    } else {
        addToCart(product, 1);
        showSuccessToast(null);
        setIsAdding(true);
        setTimeout(() => setIsAdding(false), 2000);
    }
  };

  const handleConfirmAddToCart = () => {
    if (selectedVariant) {
        addToCart(product, 1, selectedVariant);
        showSuccessToast(selectedVariant);
        setIsAdding(true);
        setIsVariantSelectorOpen(false);
        setTimeout(() => setIsAdding(false), 2000);
    }
  }
  
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    if (isWishlisted) {
        removeFromWishlist(product.id);
        toast({ title: language === 'bn' ? 'পছন্দের তালিকা থেকে সরানো হয়েছে' : 'Removed from wishlist' });
    } else {
        addToWishlist(product.id);
        toast({ title: language === 'bn' ? 'পছন্দের তালিকায় যোগ করা হয়েছে' : 'Added to wishlist' });
    }
  };


  return (
    <>
        <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        <Link href={`/products/${product.slug}`} className="block">
            <div className="overflow-hidden relative" ref={imageRef}>
            <Image
                src={product.images[0]}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={`${product.category.slug} product`}
            />
            <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm transition-all duration-300 scale-0 group-hover:scale-100"
                    onClick={handleToggleWishlist}
                >
                    <Heart className={cn("h-4 w-4", isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
                </Button>
            {hasDiscount && (
                <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                -{language === 'bn' ? toBengaliNumber(discountPercentage) : discountPercentage}%
                </Badge>
            )}
            </div>
        </Link>
        <CardContent className="p-4 flex flex-col flex-grow">
            <div className="flex-grow">
            <p className="text-sm text-muted-foreground mb-1">{language === 'bn' ? product.category.name_bn : product.category.name}</p>
            <h3 className="font-semibold text-base leading-snug mb-2 h-12">
                <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
                {language === 'bn' ? product.name_bn : product.name}
                </Link>
            </h3>
            <Rating rating={product.rating} reviewCount={product.reviewCount} />
            </div>
            <div className="flex items-end justify-between mt-4">
            <div>
                <p className="text-lg font-bold text-primary">৳{language === 'bn' ? toBengaliNumber(product.price.toLocaleString()) : product.price.toLocaleString()}</p>
                {hasDiscount && (
                <p className="text-sm text-muted-foreground line-through">৳{language === 'bn' ? toBengaliNumber(product.originalPrice?.toLocaleString()) : product.originalPrice?.toLocaleString()}</p>
                )}
            </div>
            <Button size="icon" variant="outline" className="shrink-0" onClick={handleAddToCartClick} disabled={product.stock === 0 || isAdding}>
                <AnimatePresence mode="wait" initial={false}>
                    {isAdding ? (
                    <motion.div
                        key="checkmark"
                        initial={{ scale: 0.5, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0.5, rotate: 90 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <Check className="h-5 w-5 text-green-500" />
                    </motion.div>
                    ) : (
                    <motion.div
                        key="cart"
                        initial={{ scale: 1, rotate: 0 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0.5, rotate: -90 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <ShoppingCart className="h-5 w-5"/>
                    </motion.div>
                    )}
                </AnimatePresence>
                <span className="sr-only">Add to Cart</span>
            </Button>
            </div>
        </CardContent>
        </Card>

        <Dialog open={isVariantSelectorOpen} onOpenChange={setIsVariantSelectorOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{language === 'bn' ? 'ভ্যারিয়েন্ট সিলেক্ট করুন' : 'Select a Variant'}</DialogTitle>
                    <DialogDescription>{language === 'bn' ? product.name_bn : product.name}</DialogDescription>
                </DialogHeader>
                <RadioGroup 
                    value={selectedVariant?.sku}
                    onValueChange={(sku) => {
                        const newVariant = product.variants?.find(v => v.sku === sku) || null;
                        setSelectedVariant(newVariant);
                    }}
                    className="space-y-2 py-4"
                >
                    {product.variants?.map(variant => (
                         <Label key={variant.sku} htmlFor={variant.sku} className={cn("flex items-center justify-between rounded-md border-2 p-3 cursor-pointer", selectedVariant?.sku === variant.sku ? "border-primary" : "border-muted")}>
                            <RadioGroupItem value={variant.sku} id={variant.sku} className="sr-only" />
                            <span className="font-semibold">{language === 'bn' ? variant.name_bn : variant.name}</span>
                            <span className="font-bold text-primary">৳{language === 'bn' ? toBengaliNumber(variant.price) : variant.price}</span>
                        </Label>
                    ))}
                </RadioGroup>
                <DialogFooter>
                    <DialogClose asChild>
                         <Button variant="outline">{language === 'bn' ? 'বাতিল' : 'Cancel'}</Button>
                    </DialogClose>
                    <Button onClick={handleConfirmAddToCart} disabled={!selectedVariant}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
}

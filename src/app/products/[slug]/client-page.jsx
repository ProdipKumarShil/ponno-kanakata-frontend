"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Rating from '@/components/rating';
import { ShoppingCart, Heart, Share2, Minus, Plus, Check, Weight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label';
import OfferSuggestions from '@/components/offer-suggestions';
import { useLanguage } from '@/context/language-context';

import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { useToast } from '@/hooks/use-toast';
import { cn, toBengaliNumber } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import ProductReviews from '@/components/product-reviews';

export default function ProductDetailClientPage({ product }) {
    const { language } = useLanguage();
    const { addToCart } = useCart();
    const { toast } = useToast();
    const router = useRouter();
    
    const [selectedVariant, setSelectedVariant] = useState(product.variants && product.variants.length > 0 ? product.variants[0] : null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(product.images[0]);
    const [isAdding, setIsAdding] = useState(false);
    
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);
    
    const [zoomActive, setZoomActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const imageContainerRef = useRef(null);
    
    const currentPrice = selectedVariant ? selectedVariant.price : product.price;
    const currentOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
    const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
    const hasDiscount = currentOriginalPrice && currentOriginalPrice > currentPrice;

    useEffect(() => {
        setQuantity(1);
    }, [selectedVariant]);

    const content = {
        bn: {
            inStock: 'স্টকে আছে',
            outOfStock: 'স্টক নেই',
            description: 'বিবরণ',
            quantity: 'পরিমাণ:',
            selectWeight: 'ওজন নির্বাচন করুন',
            addToCart: 'কার্টে যোগ করুন',
            addedToCart: 'কার্টে যোগ করা হয়েছে',
            buyNow: 'এখনই কিনুন',
            wishlist: 'পছন্দের তালিকা',
            share: 'শেয়ার করুন',
            addedToWishlist: 'পছন্দের তালিকায় যোগ করা হয়েছে',
            removedFromWishlist: 'পছন্দের তালিকা থেকে সরানো হয়েছে',
            shareSuccess: 'লিঙ্ক কপি করা হয়েছে!',
            shareError: 'শেয়ার করা যায়নি, লিঙ্ক কপি করুন',
        },
        en: {
            inStock: 'In Stock',
            outOfStock: 'Out of Stock',
            description: 'Description',
            quantity: 'Quantity:',
            selectWeight: 'Select Weight',
            addToCart: 'Add to Cart',
            addedToCart: 'Added to cart',
            buyNow: 'Buy Now',
            wishlist: 'Wishlist',
            share: 'Share',
            addedToWishlist: 'Added to wishlist',
            removedFromWishlist: 'Removed from wishlist',
            shareSuccess: 'Link copied to clipboard!',
            shareError: 'Could not share, please copy the link.',
        }
    };
    
    const handleToggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
            toast({ title: content[language].removedFromWishlist });
        } else {
            addToWishlist(product.id);
            toast({ title: content[language].addedToWishlist });
        }
    };
    
    const handleShare = async () => {
        const shareData = {
            title: language === 'bn' ? product.name_bn : product.name,
            text: language === 'bn' ? product.description_bn : product.description,
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                throw new Error('Web Share API not supported');
            }
        } catch (error) {
            // Fallback to copying the link
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast({ title: content[language].shareSuccess });
            } catch (copyError) {
                toast({
                    title: content[language].shareError,
                    description: window.location.href,
                    variant: 'destructive',
                });
            }
        }
    };

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, quantity, selectedVariant);
        toast({
            title: language === 'bn' ? content.bn.addedToCart : content.en.addedToCart,
            description: `${language === 'bn' ? toBengaliNumber(quantity) : quantity} x ${language === 'bn' ? product.name_bn : product.name} ${selectedVariant ? `(${language === 'bn' ? selectedVariant.name_bn : selectedVariant.name})` : ''}`,
        });
        setTimeout(() => {
            setIsAdding(false);
        }, 2000);
    };
    
    const handleBuyNow = () => {
        addToCart(product, quantity, selectedVariant);
        router.push('/cart');
    };

    const incrementQuantity = () => {
        setQuantity(prev => (prev < currentStock ? prev + 1 : prev));
    }

    const decrementQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }
    
    const handleVariantChange = (sku) => {
        const newVariant = product.variants?.find(v => v.sku === sku);
        if (newVariant) {
            setSelectedVariant(newVariant);
        }
    }

    const handleMouseMove = (e) => {
        if (imageContainerRef.current) {
            const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setPosition({ x, y });
        }
    };

    const handleMouseEnter = () => {
        setZoomActive(true);
    };

    const handleMouseLeave = () => {
        setZoomActive(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <div>
                        <div 
                            ref={imageContainerRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="rounded-lg shadow-lg mb-4 relative cursor-crosshair"
                        >
                            <Image
                                src={activeImage}
                                alt={product.name}
                                width={600}
                                height={600}
                                className="w-full aspect-square object-cover rounded-lg"
                                data-ai-hint={`${product.category.slug} product`}
                            />
                            {zoomActive && (
                                <div
                                    className="absolute top-0 left-full ml-4 w-[500px] h-[500px] bg-no-repeat pointer-events-none rounded-lg border shadow-xl hidden lg:block"
                                    style={{
                                        backgroundImage: `url(${activeImage})`,
                                        backgroundPosition: `${position.x}% ${position.y}%`,
                                        backgroundSize: '250%',
                                    }}
                                />
                            )}
                        </div>
                         <div className="grid grid-cols-5 gap-2">
                             {product.images.map((img, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => setActiveImage(img)}
                                    className={cn(
                                        "rounded-md overflow-hidden aspect-square border-2 transition-all",
                                        activeImage === img ? 'border-primary shadow-md' : 'border-transparent hover:border-primary/50'
                                    )}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} thumbnail ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                             ))}
                         </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-3xl lg:text-4xl font-bold font-headline mb-4">{language === 'bn' ? product.name_bn : product.name}</h1>

                        <div className="mb-4">
                            <Rating rating={product.rating} reviewCount={product.reviewCount} />
                        </div>
                        
                        <div className="flex items-baseline gap-4 mb-6">
                            <p className="text-4xl font-bold text-primary">৳{language === 'bn' ? toBengaliNumber(currentPrice.toLocaleString()) : currentPrice.toLocaleString()}</p>
                            {hasDiscount && (
                                <p className="text-xl text-muted-foreground line-through">৳{language === 'bn' ? toBengaliNumber(currentOriginalPrice?.toLocaleString()) : currentOriginalPrice?.toLocaleString()}</p>
                            )}
                        </div>
                        
                        <Badge className={`w-fit text-sm py-1 px-3 ${currentStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                           {currentStock > 0 ? content[language].inStock : content[language].outOfStock}
                        </Badge>

                        {product.variants && product.variants.length > 0 && (
                            <Card className="my-6">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Weight className="w-5 h-5"/>
                                        {content[language].selectWeight}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup value={selectedVariant?.sku} onValueChange={handleVariantChange} className="grid grid-cols-2 gap-3">
                                        {product.variants.map(variant => (
                                             <div key={variant.sku}>
                                                <RadioGroupItem value={variant.sku} id={variant.sku} className="peer sr-only" />
                                                <Label htmlFor={variant.sku} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                                    <span className="font-bold text-lg">{language === 'bn' ? variant.name_bn : variant.name}</span>
                                                    <span className="text-primary font-semibold">৳{language === 'bn' ? toBengaliNumber(variant.price) : variant.price}</span>
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </CardContent>
                            </Card>
                        )}
                        
                        <div className="my-6">
                            <h3 className="text-lg font-semibold mb-2">{content[language].description}</h3>
                            <p className="text-muted-foreground">{language === 'bn' ? product.description_bn : product.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <p className="font-semibold">{content[language].quantity}</p>
                             <div className="flex items-center border rounded-md">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={decrementQuantity}><Minus className="h-4 w-4" /></Button>
                                <span className="w-8 text-center font-bold">{language === 'bn' ? toBengaliNumber(quantity) : quantity}</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={incrementQuantity}><Plus className="h-4 w-4" /></Button>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            <Button size="lg" onClick={handleAddToCart} disabled={currentStock === 0 || isAdding}>
                                <AnimatePresence mode="wait" initial={false}>
                                    {isAdding ? (
                                        <motion.div
                                            key="checkmark"
                                            initial={{ scale: 0.5, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0.5, rotate: 90 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            <Check className="mr-2 h-5 w-5 text-white" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="cart"
                                            initial={{ scale: 1, rotate: 0 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0.5, rotate: -90 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="flex items-center"
                                        >
                                            <ShoppingCart className="mr-2 h-5 w-5"/>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                {content[language].addToCart}
                            </Button>
                            <Button size="lg" variant="outline" onClick={handleBuyNow} disabled={currentStock === 0}>{content[language].buyNow}</Button>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-6">
                            <Button variant="ghost" className="text-muted-foreground" onClick={handleToggleWishlist}>
                                <Heart className={cn("mr-2 h-4 w-4", isWishlisted && "fill-red-500 text-red-500")} /> 
                                {content[language].wishlist}
                            </Button>
                            <Button variant="ghost" className="text-muted-foreground" onClick={handleShare}>
                                <Share2 className="mr-2 h-4 w-4" /> 
                                {content[language].share}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 md:mt-16">
                     <OfferSuggestions 
                        productCategory={product.category.name} 
                        recentUserActivity={`Viewed products in the ${product.category.name} category.`}
                    />
                </div>
                 <div className="mt-12 md.mt-16">
                    <ProductReviews productId={product.id} />
                </div>
            </main>
            <Footer />
        </div>
    );
}

    

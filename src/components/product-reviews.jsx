"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/services/firebase';
import { collection, query, where, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CornerDownRight, Star } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { enUS, bn } from 'date-fns/locale';

const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters long.").max(500),
});


// MOCK USER DATA - In a real app, this would come from an auth context
const mockUser = {
  isLoggedIn: true,
  hasPurchased: true, // This would be checked against order history for this specific product
  id: 'user123',
  name: 'Demo User',
  avatar: 'https://github.com/shadcn.png'
};

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const { language } = useLanguage();
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: '' },
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, 'productReviews'),
      where('productId', '==', productId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviewsData = [];
      querySnapshot.forEach((doc) => {
        reviewsData.push({ id: doc.id, ...doc.data() });
      });
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, [productId]);

  const onSubmit = async (data) => {
    if (!mockUser.isLoggedIn || !mockUser.hasPurchased) {
      // This case should ideally be prevented by disabling the form
      console.error("User not eligible to review.");
      return;
    }

    try {
      await addDoc(collection(db, 'productReviews'), {
        ...data,
        productId,
        userId: mockUser.id,
        userName: mockUser.name,
        userAvatar: mockUser.avatar,
        timestamp: serverTimestamp(),
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const content = {
    bn: {
      title: "ক্রেতাদের মতামত",
      noReviews: "এখনও কোনো রিভিউ নেই।",
      leaveReview: "আপনার মতামত দিন",
      notEligible: "শুধুমাত্র যারা এই পণ্যটি কিনেছেন তারাই মতামত দিতে পারবেন।",
      rating: "রেটিং",
      comment: "মতামত",
      submit: "জমা দিন",
      adminReply: "অ্যাডমিনের উত্তর",
      edited: "(সম্পাদিত)",
    },
    en: {
      title: "Customer Reviews",
      noReviews: "No reviews yet.",
      leaveReview: "Leave a Review",
      notEligible: "Only customers who have purchased this product can leave a review.",
      rating: "Rating",
      comment: "Comment",
      submit: "Submit Review",
      adminReply: "Admin's Reply",
      edited: "(edited)",
    }
  };

  const isEligibleToReview = mockUser.isLoggedIn && mockUser.hasPurchased;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content[language].title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                 <Card className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="text-lg">{content[language].leaveReview}</CardTitle>
                         {!isEligibleToReview && (
                            <CardDescription>{content[language].notEligible}</CardDescription>
                         )}
                    </CardHeader>
                    <CardContent>
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="rating"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{content[language].rating}</FormLabel>
                                        <FormControl>
                                             <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={cn(
                                                    "h-7 w-7 cursor-pointer transition-colors",
                                                    (hoveredRating >= star || field.value >= star)
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-300",
                                                     !isEligibleToReview && "cursor-not-allowed"
                                                    )}
                                                    onMouseEnter={() => isEligibleToReview && setHoveredRating(star)}
                                                    onMouseLeave={() => setHoveredRating(0)}
                                                    onClick={() => isEligibleToReview && field.onChange(star)}
                                                />
                                                ))}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{content[language].comment}</FormLabel>
                                        <FormControl>
                                        <Textarea
                                            placeholder={isEligibleToReview ? (language === 'bn' ? 'আপনার অভিজ্ঞতা শেয়ার করুন...' : 'Share your experience...') : ''}
                                            {...field}
                                            disabled={!isEligibleToReview}
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={!isEligibleToReview || form.formState.isSubmitting}>
                                    {content[language].submit}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                 </Card>
            </div>
            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <p className="text-muted-foreground">{content[language].noReviews}</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="flex flex-col gap-2">
                            <div className="flex gap-4">
                                <Avatar>
                                    <AvatarImage src={review.userAvatar || `https://avatars.dicebear.com/api/initials/${review.userName}.svg`} />
                                    <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">{review.userName}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {review.timestamp?.toDate && formatDistanceToNow(review.timestamp.toDate(), { addSuffix: true, locale: language === 'bn' ? bn : enUS })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 my-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className={cn("h-4 w-4", star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{review.comment} {review.isEdited && <span className="text-xs italic text-muted-foreground/70">{content[language].edited}</span>}</p>
                                </div>
                            </div>
                            {review.reply && (
                                <div className="pl-14">
                                    <div className="bg-secondary/50 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CornerDownRight className="h-4 w-4 text-primary" />
                                            <p className="font-semibold text-sm text-primary">{content[language].adminReply}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{review.reply}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

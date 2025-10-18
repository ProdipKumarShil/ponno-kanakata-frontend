"use client";

import { useState, useEffect } from 'react';
import { db } from '@/services/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy, getDoc, serverTimestamp } from 'firebase/firestore';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash, MessageSquare, Star as StarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Rating from '@/components/rating';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/language-context';

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const { language } = useLanguage();
    
    const [selectedReview, setSelectedReview] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    
    const [editRating, setEditRating] = useState(0);
    const [editComment, setEditComment] = useState('');
    const [replyText, setReplyText] = useState('');

    const content = {
        en: {
            pageTitle: "Review Management",
            cardTitle: "All Customer Reviews",
            cardDescription: "Manage, edit, and reply to customer feedback.",
            loading: "Loading reviews...",
            tableCustomer: "Customer",
            tableProduct: "Product",
            tableRating: "Rating",
            tableComment: "Comment",
            tableDate: "Date",
            tableStatus: "Status",
            tableActions: "Actions",
            replied: "Replied",
            noReply: "No Reply",
            edited: "Edited",
            editDialogTitle: "Edit Review",
            editDialogDesc: "Modify the customer's rating and comment.",
            ratingLabel: "Rating",
            commentLabel: "Comment",
            cancel: "Cancel",
            saveChanges: "Save Changes",
            replyDialogTitle: "Reply to Review",
            replyDialogDesc: "Write a public response to this review. It will be visible on the product page.",
            yourReplyLabel: "Your Reply",
            yourReplyPlaceholder: "Write your reply here...",
            saveReply: "Save Reply",
            confirmDelete: "Are you sure you want to delete this review? This cannot be undone.",
            reviewDeleted: "Review Deleted",
            reviewUpdated: "Review Updated",
            replySaved: "Reply Saved",
            errorUpdating: "Error updating review",
            errorSaving: "Error saving reply",
            errorDeleting: "Error deleting review"
        },
        bn: {
            pageTitle: "রিভিউ ম্যানেজমেন্ট",
            cardTitle: "সমস্ত গ্রাহক রিভিউ",
            cardDescription: "গ্রাহকদের মতামত পরিচালনা, সম্পাদনা এবং উত্তর দিন।",
            loading: "রিভিউ লোড হচ্ছে...",
            tableCustomer: "গ্রাহক",
            tableProduct: "পণ্য",
            tableRating: "রেটিং",
            tableComment: "মন্তব্য",
            tableDate: "তারিখ",
            tableStatus: "স্ট্যাটাস",
            tableActions: "ক্রিয়াকলাপ",
            replied: "উত্তর দেওয়া হয়েছে",
            noReply: "কোনো উত্তর নেই",
            edited: "সম্পাদিত",
            editDialogTitle: "রিভিউ সম্পাদনা করুন",
            editDialogDesc: "গ্রাহকের রেটিং এবং মন্তব্য পরিবর্তন করুন।",
            ratingLabel: "রেটিং",
            commentLabel: "মন্তব্য",
            cancel: "বাতিল",
            saveChanges: "পরিবর্তন সংরক্ষণ করুন",
            replyDialogTitle: "রিভিউতে উত্তর দিন",
            replyDialogDesc: "এই রিভিউতে একটি পাবলিক প্রতিক্রিয়া লিখুন। এটি পণ্যের পৃষ্ঠায় দৃশ্যমান হবে।",
            yourReplyLabel: "আপনার উত্তর",
            yourReplyPlaceholder: "আপনার উত্তর এখানে লিখুন...",
            saveReply: "উত্তর সংরক্ষণ করুন",
            confirmDelete: "আপনি কি নিশ্চিত যে আপনি এই রিভিউটি মুছতে চান? এটি আর ফেরানো যাবে না।",
            reviewDeleted: "রিভিউ মুছে ফেলা হয়েছে",
            reviewUpdated: "রিভিউ আপডেট করা হয়েছে",
            replySaved: "উত্তর সংরক্ষিত হয়েছে",
            errorUpdating: "রিভিউ আপডেট করতে ত্রুটি",
            errorSaving: "উত্তর সংরক্ষণ করতে ত্রুটি",
            errorDeleting: "রিভিউ মুছতে ত্রুটি"
        }
    };
    const t = content[language];

    useEffect(() => {
        const q = query(collection(db, 'productReviews'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const reviewsData = [];
            for (const reviewDoc of snapshot.docs) {
                const data = reviewDoc.data();
                let productName = data.productName;
                if (!productName && data.productId) {
                    try {
                        const productRef = doc(db, 'products', data.productId);
                        const productSnap = await getDoc(productRef);
                        if (productSnap.exists()) {
                            const productData = productSnap.data();
                            productName = language === 'bn' ? productData.name_bn : productData.name;
                        }
                    } catch (e) {
                        console.error("Could not fetch product name for review", reviewDoc.id);
                    }
                }
                reviewsData.push({ id: reviewDoc.id, ...data, productName });
            }
            setReviews(reviewsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching reviews:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [language]);

    const handleOpenEdit = (review) => {
        setSelectedReview(review);
        setEditRating(review.rating);
        setEditComment(review.comment);
        setIsEditOpen(true);
    };

    const handleOpenReply = (review) => {
        setSelectedReview(review);
        setReplyText(review.reply || '');
        setIsReplyOpen(true);
    };

    const handleEditSubmit = async () => {
        if (!selectedReview || !selectedReview.id) return;
        try {
            const reviewRef = doc(db, 'productReviews', selectedReview.id);
            await setDoc(reviewRef, { 
                rating: editRating, 
                comment: editComment,
                isEdited: true,
            }, { merge: true });
            toast({ title: t.reviewUpdated });
            setIsEditOpen(false);
        } catch (error) {
            console.error("Error updating review: ", error);
            toast({ title: t.errorUpdating, variant: "destructive" });
        }
    };

    const handleReplySubmit = async () => {
        if (!selectedReview || !selectedReview.id) return;
        try {
            const reviewRef = doc(db, 'productReviews', selectedReview.id);
            await setDoc(reviewRef, { reply: replyText, replyTimestamp: serverTimestamp() }, { merge: true });
            toast({ title: t.replySaved });
            setIsReplyOpen(false);
        } catch (error) {
            console.error("Error saving reply: ", error);
            toast({ title: t.errorSaving, variant: "destructive" });
        }
    };
    
    const handleDeleteReview = async (reviewId) => {
        if (confirm(t.confirmDelete)) {
            try {
                await deleteDoc(doc(db, 'productReviews', reviewId));
                toast({ title: t.reviewDeleted });
            } catch (error) {
                console.error("Error deleting review: ", error);
                toast({ title: t.errorDeleting, variant: "destructive" });
            }
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{t.cardTitle}</CardTitle>
                    <CardDescription>{t.cardDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? <p>{t.loading}</p> : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t.tableCustomer}</TableHead>
                                    <TableHead>{t.tableProduct}</TableHead>
                                    <TableHead>{t.tableRating}</TableHead>
                                    <TableHead>{t.tableComment}</TableHead>
                                    <TableHead>{t.tableDate}</TableHead>
                                    <TableHead>{t.tableStatus}</TableHead>
                                    <TableHead className="text-right">{t.tableActions}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reviews.map((review) => (
                                    <TableRow key={review.id}>
                                        <TableCell className="font-medium">{review.userName}</TableCell>
                                        <TableCell>
                                             <Link href={`/products/${review.productId}`} className="hover:underline text-primary" target="_blank">
                                                {review.productName || review.productId.substring(0,10)+'...'}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Rating rating={review.rating} />
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                                        <TableCell>{review.timestamp ? format(review.timestamp.toDate(), 'PP') : 'N/A'}</TableCell>
                                        <TableCell>
                                            {review.reply ? <Badge variant="secondary">{t.replied}</Badge> : <Badge variant="outline">{t.noReply}</Badge>}
                                            {review.isEdited && <Badge variant="outline" className="ml-2">{t.edited}</Badge>}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenReply(review)}>
                                                    <MessageSquare className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(review)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDeleteReview(review.id)}>
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.editDialogTitle}</DialogTitle>
                        <DialogDescription>{t.editDialogDesc}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                             <Label>{t.ratingLabel}</Label>
                             <div className="flex items-center gap-1 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                        key={star}
                                        className={cn("h-7 w-7 cursor-pointer transition-colors", editRating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
                                        onClick={() => setEditRating(star)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="edit-comment">{t.commentLabel}</Label>
                             <Textarea 
                                id="edit-comment"
                                value={editComment} 
                                onChange={(e) => setEditComment(e.target.value)} 
                                className="mt-2"
                                rows={5}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">{t.cancel}</Button></DialogClose>
                        <Button onClick={handleEditSubmit}>{t.saveChanges}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.replyDialogTitle}</DialogTitle>
                        <DialogDescription>{t.replyDialogDesc}</DialogDescription>
                    </DialogHeader>
                     <div className="space-y-4 py-4">
                        <div className="p-4 border rounded-md bg-secondary/50">
                            <p className="font-semibold text-sm">{selectedReview?.userName}</p>
                            <Rating rating={selectedReview?.rating || 0} />
                            <p className="text-sm text-muted-foreground mt-2">{selectedReview?.comment}</p>
                        </div>
                        <div>
                            <Label htmlFor="reply-text">{t.yourReplyLabel}</Label>
                             <Textarea 
                                id="reply-text"
                                value={replyText} 
                                onChange={(e) => setReplyText(e.target.value)} 
                                className="mt-2"
                                rows={5}
                                placeholder={t.yourReplyPlaceholder}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">{t.cancel}</Button></DialogClose>
                        <Button onClick={handleReplySubmit}>{t.saveReply}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

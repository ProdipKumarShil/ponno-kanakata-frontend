"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/services/firebase';
import { collection, doc, setDoc, deleteDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Edit, Trash, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import slugify from 'slugify';
import { format } from 'date-fns';
import { generateBlogPost } from '@/ai/flows/generate-blog-post-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/context/language-context';

const blogPostSchema = z.object({
    title: z.string().min(1, "Title is required."),
    content: z.string().min(1, "Content is required."),
    metaDescription: z.string().optional(),
    isPublished: z.boolean(),
});



const BlogPostForm = ({ post, onFinished }) => {
    const { toast } = useToast();
    const { language } = useLanguage();
    const [isGenerating, setIsGenerating] = useState(false);

    const form = useForm({
        resolver: zodResolver(blogPostSchema),
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            metaDescription: post?.metaDescription || '',
            isPublished: post?.isPublished ?? false,
        },
    });

    const content = {
        en: {
            title: "Title",
            content: "Content",
            generateWithAI: "Generate with AI",
            generating: "Generating...",
            topicRequired: "Topic required",
            enterTitleFirst: "Please enter a title first to generate content.",
            contentGenerated: "Content Generated",
            contentGeneratedDesc: "AI has generated the blog post content.",
            generationFailed: "Generation Failed",
            generationFailedDesc: "Could not generate content.",
            metaDescription: "Meta Description (for SEO)",
            published: "Published",
            cancel: "Cancel",
            savePost: "Save Post",
            postUpdated: "Blog Post Updated",
            postCreated: "Blog Post Created",
            saveSuccess: (title) => `"${title}" has been saved successfully.`,
            error: "Error",
            saveFailed: "Failed to save post. Please try again."
        },
        bn: {
            title: "শিরোনাম",
            content: "বিষয়বস্তু",
            generateWithAI: "AI দিয়ে তৈরি করুন",
            generating: "তৈরি হচ্ছে...",
            topicRequired: "বিষয় आवश्यक",
            enterTitleFirst: "বিষয়বস্তু তৈরি করতে প্রথমে একটি শিরোনাম লিখুন।",
            contentGenerated: "বিষয়বস্তু তৈরি হয়েছে",
            contentGeneratedDesc: "AI ব্লগ পোস্টের বিষয়বস্তু তৈরি করেছে।",
            generationFailed: "তৈরি করতে ব্যর্থ",
            generationFailedDesc: "বিষয়বস্তু তৈরি করা যায়নি।",
            metaDescription: "মেটা ডেসক্রিপশন (SEO-এর জন্য)",
            published: "প্রকাশিত",
            cancel: "বাতিল",
            savePost: "পোস্ট সংরক্ষণ করুন",
            postUpdated: "ব্লগ পোস্ট আপডেট করা হয়েছে",
            postCreated: "ব্লগ পোস্ট তৈরি করা হয়েছে",
            saveSuccess: (title) => `"${title}" সফলভাবে সংরক্ষণ করা হয়েছে।`,
            error: "ত্রুটি",
            saveFailed: "পোস্ট সংরক্ষণ করতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।"
        }
    }
    const t = content[language];

    const handleGenerateContent = async () => {
        const topic = form.getValues("title");
        if (!topic) {
            toast({
                title: t.topicRequired,
                description: t.enterTitleFirst,
                variant: "destructive"
            });
            return;
        }
        setIsGenerating(true);
        try {
            const result = await generateBlogPost({ topic, keywords: topic.split(' ') });
            form.setValue("content", result.content);
            form.setValue("metaDescription", result.metaDescription);
            toast({ title: t.contentGenerated, description: t.contentGeneratedDesc });
        } catch (error) {
            console.error("AI generation failed:", error);
            toast({ title: t.generationFailed, description: t.generationFailedDesc, variant: "destructive" });
        } finally {
            setIsGenerating(false);
        }
    }

    const onSubmit = async (data) => {
        try {
            const postId = post?.id || doc(collection(db, 'blogs')).id;
            const postSlug = post?.slug || slugify(data.title, { lower: true, strict: true });

            const postData = {
                ...data,
                slug: postSlug,
                id: postId,
                createdAt: post?.createdAt || serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            await setDoc(doc(db, 'blogs', postId), postData, { merge: true });
            
            toast({
                title: post ? t.postUpdated : t.postCreated,
                description: t.saveSuccess(data.title),
            });
            onFinished();
        } catch (error) {
            console.error("Error saving blog post:", error);
            toast({
                title: t.error,
                description: t.saveFailed,
                variant: "destructive",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t.title}</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                 <div className="space-y-2">
                    <FormField control={form.control} name="content" render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t.content}</FormLabel>
                            <FormControl><Textarea {...field} rows={15} /></FormControl>
                             <Button type="button" variant="outline" size="sm" onClick={handleGenerateContent} disabled={isGenerating} className="mt-2">
                                <Sparkles className="mr-2 h-4 w-4" />
                                {isGenerating ? t.generating : t.generateWithAI}
                            </Button>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                 <div className="space-y-2">
                    <FormField control={form.control} name="metaDescription" render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t.metaDescription}</FormLabel>
                            <FormControl><Textarea {...field} rows={3} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <div className="pt-4">
                     <FormField control={form.control} name="isPublished" render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                           <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                           <FormLabel>{t.published}</FormLabel>
                        </FormItem>
                    )} />
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">{t.cancel}</Button></DialogClose>
                    <Button type="submit">{t.savePost}</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export default function AdminBlogsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const { toast } = useToast();
    const { language } = useLanguage();

     const content = {
        en: {
            pageTitle: "Blogs",
            addPost: "Add Blog Post",
            cardTitle: "Manage Blog Posts",
            cardDescription: "Create, edit, and manage your blog content.",
            tableTitle: "Title",
            tableStatus: "Status",
            tableCreatedAt: "Created At",
            tableActions: "Actions",
            published: "Published",
            draft: "Draft",
            noPosts: "No blog posts found. Create your first one!",
            editPost: "Edit Post",
            addPostDialog: "Add New Post",
            editPostDesc: "Update the details for this blog post.",
            addPostDesc: "Fill in the details for the new post.",
            confirmDelete: (title) => `Are you sure you want to delete "${title}"?`,
            postDeleted: "Post Deleted",
            postDeletedDesc: (title) => `"${title}" has been deleted.`,
            error: "Error",
            deleteFailed: "Failed to delete post.",
            fetchFailed: "Could not fetch blog posts."
        },
        bn: {
            pageTitle: "ব্লগ",
            addPost: "নতুন ব্লগ পোস্ট যোগ করুন",
            cardTitle: "ব্লগ পোস্ট পরিচালনা",
            cardDescription: "আপনার ব্লগের বিষয়বস্তু তৈরি, সম্পাদনা এবং পরিচালনা করুন।",
            tableTitle: "শিরোনাম",
            tableStatus: "স্ট্যাটাস",
            tableCreatedAt: "তৈরির তারিখ",
            tableActions: "ক্রিয়াকলাপ",
            published: "প্রকাশিত",
            draft: "খসড়া",
            noPosts: "কোনো ব্লগ পোস্ট পাওয়া যায়নি। আপনার প্রথমটি তৈরি করুন!",
            editPost: "পোস্ট সম্পাদনা করুন",
            addPostDialog: "নতুন পোস্ট যোগ করুন",
            editPostDesc: "এই ব্লগ পোস্টের বিবরণ আপডেট করুন।",
            addPostDesc: "নতুন পোস্টের জন্য বিবরণ পূরণ করুন।",
            confirmDelete: (title) => `আপনি কি "${title}" মুছে ফেলতে নিশ্চিত?`,
            postDeleted: "পোস্ট মুছে ফেলা হয়েছে",
            postDeletedDesc: (title) => `"${title}" মুছে ফেলা হয়েছে।`,
            error: "ত্রুটি",
            deleteFailed: "পোস্ট মুছতে ব্যর্থ।",
            fetchFailed: "ব্লগ পোস্ট আনা যায়নি।"
        }
    }
    const t = content[language];

    useEffect(() => {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const postsData = [];
            snapshot.forEach(doc => {
                postsData.push({ ...doc.data(), id: doc.id });
            });
            setPosts(postsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching posts:", error);
            setLoading(false);
            toast({ title: t.error, description: t.fetchFailed, variant: "destructive" });
        });
        return () => unsubscribe();
    }, [toast, t.error, t.fetchFailed]);
    
    const handleAddNew = () => {
        setSelectedPost(null);
        setIsFormOpen(true);
    }
    
    const handleEdit = (post) => {
        setSelectedPost(post);
        setIsFormOpen(true);
    }

    const handleDelete = async (post) => {
        if(confirm(t.confirmDelete(post.title))) {
            try {
                await deleteDoc(doc(db, 'blogs', post.id));
                toast({
                    title: t.postDeleted,
                    description: t.postDeletedDesc(post.title),
                });
            } catch (error) {
                console.error("Error deleting post: ", error);
                toast({
                    title: t.error,
                    description: t.deleteFailed,
                    variant: "destructive",
                });
            }
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
                 <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {t.addPost}
                </Button>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>{t.cardTitle}</CardTitle>
                    <CardDescription>{t.cardDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                     {loading ? (
                         <div className="space-y-2">
                             <Skeleton className="h-12 w-full" />
                             <Skeleton className="h-12 w-full" />
                             <Skeleton className="h-12 w-full" />
                         </div>
                     ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t.tableTitle}</TableHead>
                                <TableHead>{t.tableStatus}</TableHead>
                                <TableHead>{t.tableCreatedAt}</TableHead>
                                <TableHead className="text-right">{t.tableActions}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={post.isPublished ? 'default' : 'secondary'} className={post.isPublished ? 'bg-green-100 text-green-800' : ''}>
                                            {post.isPublished ? t.published : t.draft}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{post.createdAt ? format(post.createdAt.toDate(), 'PP') : 'N/A'}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(post)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(post)}>
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                     )}
                     {!loading && posts.length === 0 && (
                         <div className="text-center py-12 text-muted-foreground">
                            <p>{t.noPosts}</p>
                        </div>
                     )}
                </CardContent>
            </Card>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                 <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>{selectedPost ? t.editPost : t.addPostDialog}</DialogTitle>
                        <DialogDescription>
                           {selectedPost ? t.editPostDesc : t.addPostDesc}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-grow overflow-y-auto pr-6 -mr-6">
                        <BlogPostForm post={selectedPost} onFinished={() => setIsFormOpen(false)} />
                    </div>
                 </DialogContent>
            </Dialog>
        </div>
    )
}

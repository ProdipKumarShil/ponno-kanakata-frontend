"use client";

import { useCategory } from "@/context/category-context";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash, ChevronDown, ChevronRight, AlertTriangle } from "lucide-react";
import { useState, useMemo } from "react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { useToast } from "@/hooks/use-toast";
import slugify from "slugify";
import { db } from "@/services/firebase";
import { doc, setDoc, deleteDoc, collection } from "firebase/firestore";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required."),
  name_bn: z.string().min(1, "Bengali name is required."),
  parentId: z.string().optional(),
});


function CategoryForm({ category, categories, onSave }) {
    const { language } = useLanguage();
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name || '',
            name_bn: category?.name_bn || '',
            parentId: category?.parentId || '',
        },
    });

    const flatCategoriesForForm = useMemo(() => {
        const result = [];
        const generateOptions = (cats, depth) => {
            cats.forEach(c => {
                const prefix = '—'.repeat(depth);
                const displayName = language === 'bn' ? c.name_bn : c.name;
                result.push({ id: c.id, name: `${prefix} ${displayName}` });
                if (c.subcategories && c.subcategories.length > 0) {
                    generateOptions(c.subcategories, depth + 1);
                }
            });
        };
        generateOptions(categories, 0);
        return result;
    }, [categories, language]);

    const handleFormSubmit = form.handleSubmit((data) => {
        onSave(data);
    });

    const content = {
        en: {
            nameEn: "Category Name (EN)",
            nameBn: "Category Name (BN)",
            parent: "Parent Category (Optional)",
            selectParent: "Select a parent category",
            rootCategory: "None (Root Category)",
            cancel: "Cancel",
            save: "Save"
        },
        bn: {
            nameEn: "ক্যাটাগরির নাম (EN)",
            nameBn: "ক্যাটাগরির নাম (BN)",
            parent: "প্যারেন্ট ক্যাটাগরি (ঐচ্ছিক)",
            selectParent: "একটি প্যারেন্ট ক্যাটাগরি নির্বাচন করুন",
            rootCategory: "কোনোটিই নয় (মূল ক্যাটাগরি)",
            cancel: "বাতিল",
            save: "সংরক্ষণ"
        }
    }

    return (
         <Form {...form}>
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{content[language].nameEn}</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="name_bn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{content[language].nameBn}</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="parentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{content[language].parent}</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder={content[language].selectParent} /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="root">{content[language].rootCategory}</SelectItem>
                                    {flatCategoriesForForm.filter(c => c.id !== category?.id).map(cat => (
                                        <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">{content[language].cancel}</Button></DialogClose>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Saving...' : content[language].save}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

function CategoryItem({ category, onEdit, onDelete, level = 0 }) {
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <div className={cn("flex items-center gap-2 py-2 px-4 rounded-md", level > 0 ? "bg-secondary/50" : "bg-secondary")}>
                {category.subcategories && category.subcategories.length > 0 && (
                     <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                     </Button>
                )}
                <div className="flex-grow font-medium" style={{ paddingLeft: `${level === 0 && (!category.subcategories || category.subcategories.length === 0) ? '0' : (level * 20) + (category.subcategories && category.subcategories.length > 0 ? 0 : 28) }px` }}>
                    {language === 'bn' ? category.name_bn : category.name}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(category)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                           <Trash className="h-4 w-4" />
                         </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>{language === 'bn' ? 'আপনি কি নিশ্চিত?' : 'Are you sure?'}</AlertDialogTitle>
                              <AlertDialogDescription>
                                  {language === 'bn' ? `আপনি "${category.name_bn}" ক্যাটাগরিটি মুছে ফেলতে চলেছেন। এই কাজটি আর ফেরানো যাবে না।` : `You are about to delete the category "${category.name}". This action cannot be undone.`}
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>{language === 'bn' ? 'বাতিল' : 'Cancel'}</AlertDialogCancel>
                              <AlertDialogAction onClick={() => onDelete(category)}>{language === 'bn' ? 'নিশ্চিত করুন' : 'Confirm'}</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            {isOpen && category.subcategories && (
                <div className="pl-6 mt-2 space-y-2 border-l-2 ml-6">
                    {category.subcategories.map(sub => (
                        <CategoryItem key={sub.id} category={sub} onEdit={onEdit} onDelete={onDelete} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function AdminCategoriesPage() {
    const { categories, flatCategories, loading, error } = useCategory();
    const { language } = useLanguage();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { toast } = useToast();

    const content = {
        en: {
            pageTitle: "Categories",
            addNew: "Add New Category",
            cardTitle: "Manage Categories",
            cardDescription: "Organize your product categories and subcategories.",
            loading: "Loading categories...",
            error: "Error",
            dialogTitleEdit: "Edit Category",
            dialogTitleAdd: "Add New Category",
            cannotDelete: "Cannot Delete",
            deleteSubcategoriesFirst: "Please delete all subcategories before deleting a parent category.",
            deleteSuccess: "Category Deleted",
            deleteSuccessDesc: (name) => `"${name}" has been deleted successfully.`,
            deleteError: "Could not delete category.",
        },
        bn: {
            pageTitle: "ক্যাটাগরি",
            addNew: "নতুন ক্যাটাগরি যোগ করুন",
            cardTitle: "ক্যাটাগরি পরিচালনা",
            cardDescription: "আপনার পণ্যের ক্যাটাগরি এবং সাব-ক্যাটাগরিগুলো সংগঠিত করুন।",
            loading: "ক্যাটাগরি লোড হচ্ছে...",
            error: "ত্রুটি",
            dialogTitleEdit: "ক্যাটাগরি সম্পাদনা করুন",
            dialogTitleAdd: "নতুন ক্যাটাগরি যোগ করুন",
            cannotDelete: "মুছতে পারবেন না",
            deleteSubcategoriesFirst: "একটি প্যারেন্ট ক্যাটাগরি মোছার আগে অনুগ্রহ করে সমস্ত সাব-ক্যাটাগরি মুছে ফেলুন।",
            deleteSuccess: "ক্যাটাগরি মুছে ফেলা হয়েছে",
            deleteSuccessDesc: (name) => `"${name}" সফলভাবে মুছে ফেলা হয়েছে।`,
            deleteError: "ক্যাটাগরি মোছা যায়নি।",
        }
    };

    const t = content[language];

    const handleAddNew = () => {
        setSelectedCategory(null);
        setIsFormOpen(true);
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setIsFormOpen(true);
    };

    const handleSaveCategory = async (data) => {
        if (!db) {
             toast({
                title: "Error",
                description: "Firestore is not initialized.",
                variant: "destructive",
            });
            return;
        }

        try {
            const categoryId = selectedCategory?.id || doc(collection(db, 'categories')).id;
            const categorySlug = slugify(data.name, { lower: true, strict: true });

            const newCategoryData = {
                id: categoryId,
                name: data.name,
                name_bn: data.name_bn,
                slug: categorySlug,
                parentId: data.parentId === "root" || !data.parentId ? null : data.parentId,
            };

            await setDoc(doc(db, "categories", categoryId), newCategoryData, { merge: true });

            toast({
                title: selectedCategory ? "Category Updated" : "Category Created",
                description: `${data.name} has been saved.`,
            });
        } catch (e) {
            console.error("Error saving category:", e);
            toast({
                title: "Error",
                description: e.message || "Could not save category.",
                variant: "destructive",
            });
        } finally {
            setIsFormOpen(false);
        }
    };
    
    const handleDelete = async (category) => {
        if (!db) {
             toast({ title: t.error, description: "Firestore is not initialized.", variant: "destructive" });
            return;
        }

        if (category.subcategories && category.subcategories.length > 0) {
            toast({ title: t.cannotDelete, description: t.deleteSubcategoriesFirst, variant: "destructive" });
            return;
        }

        try {
            await deleteDoc(doc(db, "categories", category.id));
             toast({ title: t.deleteSuccess, description: t.deleteSuccessDesc(category.name) });
        } catch (e) {
            console.error("Error deleting category:", e);
            toast({ title: t.error, description: e.message || t.deleteError, variant: "destructive" });
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
                <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {t.addNew}
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{t.cardTitle}</CardTitle>
                    <CardDescription>{t.cardDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading && <p>{t.loading}</p>}
                    {error && <p className="text-destructive">{t.error}: {error}</p>}
                    {!loading && !error && (
                         <div className="space-y-2">
                            {categories.map(category => (
                                <CategoryItem key={category.id} category={category} onEdit={handleEdit} onDelete={handleDelete} />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
            
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedCategory ? t.dialogTitleEdit : t.dialogTitleAdd}</DialogTitle>
                    </DialogHeader>
                    <CategoryForm 
                        category={selectedCategory} 
                        categories={categories}
                        onSave={handleSaveCategory}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

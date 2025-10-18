"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/services/firebase';
import { collection, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useProduct } from '@/context/product-context';
import { useCategory } from '@/context/category-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectGroup } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Edit, Trash, AlertTriangle, XCircle, BadgePlus } from 'lucide-react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import slugify from 'slugify';
import { ScrollArea } from '@/components/ui/scroll-area';

const variantSchema = z.object({
    sku: z.string().min(1, "SKU is required."),
    name: z.string().min(1, "Variant name is required."),
    name_bn: z.string().min(1, "Bengali name is required."),
    price: z.coerce.number().min(0, "Price must be positive."),
    originalPrice: z.coerce.number().optional().nullable(),
    stock: z.coerce.number().min(0, "Stock can't be negative."),
    weight: z.coerce.number().min(0, "Weight must be positive."),
});

const productSchema = z.object({
    name: z.string().min(1, "Product name is required."),
    name_bn: z.string().min(1, "Bengali name is required."),
    description: z.string().min(1, "Description is required."),
    description_bn: z.string().min(1, "Bengali description is required."),
    categorySlug: z.string().min(1, "Category is required."),
    brand: z.string().min(1, "Brand is required."),
    price: z.coerce.number().min(0),
    originalPrice: z.coerce.number().optional().nullable(),
    stock: z.coerce.number().min(0),
    weight: z.coerce.number().min(0),
    isVisible: z.boolean(),
    hasVariants: z.boolean(),
    variants: z.array(variantSchema).optional(),
});



const ProductForm = ({ product, onFinished }) => {
    const { categories: nestedCategories, flatCategories } = useCategory();
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name || '',
            name_bn: product?.name_bn || '',
            description: product?.description || '',
            description_bn: product?.description_bn || '',
            categorySlug: product?.category?.slug || '',
            brand: product?.brand || 'Ponno Kenakata',
            price: product?.price || 0,
            originalPrice: product?.originalPrice || null,
            stock: product?.stock || 0,
            weight: product?.weight || 0,
            isVisible: product?.isVisible ?? true,
            hasVariants: product?.hasVariants ?? false,
            variants: product?.variants?.map(v => ({ ...v, originalPrice: v.originalPrice || null })) || [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "variants",
    });

    const hasVariants = form.watch('hasVariants');

    const onSubmit = async (data) => {
        try {
            const productId = product?.id || doc(collection(db, 'products')).id;
            const productSlug = product?.slug || slugify(data.name, { lower: true, strict: true });
            
            const selectedCategory = flatCategories.find(c => c.slug === data.categorySlug);

            const productData = {
                ...data,
                slug: productSlug,
                category: {
                    name: selectedCategory?.name || 'N/A',
                    name_bn: selectedCategory?.name_bn || 'N/A',
                    slug: data.categorySlug,
                },
                id: productId,
                createdAt: product?.createdAt || serverTimestamp(),
                updatedAt: serverTimestamp(),
                rating: product?.rating ?? 0,
                reviewCount: product?.reviewCount ?? 0,
                images: product?.images || [],
            };
            
            delete productData.categorySlug;

            await setDoc(doc(db, 'products', productId), productData, { merge: true });
            
            toast({
                title: product ? "Product Updated" : "Product Created",
                description: `${data.name} has been saved successfully.`,
            });
            onFinished();
        } catch (error) {
            console.error("Error saving product:", error);
            toast({
                title: "Error",
                description: "Failed to save product. Please try again.",
                variant: "destructive",
            });
        }
    };

    const renderCategoryOptions = (categories, level = 0) => {
        return categories.flatMap(category => {
            const options = [
                <SelectItem key={category.id} value={category.slug} style={{ paddingLeft: `${1 + level * 1.5}rem` }}>
                    {category.name}
                </SelectItem>
            ];
            if (category.subcategories && category.subcategories.length > 0) {
                return options.concat(renderCategoryOptions(category.subcategories, level + 1));
            }
            return options;
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
                <DialogHeader>
                    <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    <DialogDescription>
                        {product ? 'Update the details for this product.' : 'Fill in the details for the new product.'}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] p-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name (EN)</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="name_bn" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name (BN)</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                 <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (EN)</FormLabel>
                            <FormControl><Textarea {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="description_bn" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (BN)</FormLabel>
                            <FormControl><Textarea {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                 <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <FormField control={form.control} name="categorySlug" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    {renderCategoryOptions(nestedCategories)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="brand" render={({ field }) => (
                         <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <Controller
                                name="brand"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select a brand" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="Ponno Kenakata">Ponno Kenakata</SelectItem>
                                            <SelectItem value="UrbanStyle">UrbanStyle</SelectItem>
                                            <SelectItem value="WinterWear">WinterWear</SelectItem>
                                            <SelectItem value="StepUp">StepUp</SelectItem>
                                            <SelectItem value="Khulna Spices">Khulna Spices</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <FormField control={form.control} name="hasVariants" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Variants</FormLabel>
                            <FormDescription>
                                Enable this if the product has multiple versions like different weights or sizes.
                            </FormDescription>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />

                {hasVariants ? (
                    <div className="space-y-4 mt-4">
                        <Label>Variants</Label>
                        {fields.map((field, index) => (
                            <Card key={field.id} className="relative p-4">
                                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 text-destructive" onClick={() => remove(index)}>
                                    <XCircle className="h-4 w-4" />
                                </Button>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <FormField control={form.control} name={`variants.${index}.sku`} render={({ field }) => (
                                        <FormItem><FormLabel>SKU</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name={`variants.${index}.name`} render={({ field }) => (
                                        <FormItem><FormLabel>Name (EN)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                     <FormField control={form.control} name={`variants.${index}.name_bn`} render={({ field }) => (
                                        <FormItem><FormLabel>Name (BN)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                     <FormField control={form.control} name={`variants.${index}.price`} render={({ field }) => (
                                        <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                     <FormField control={form.control} name={`variants.${index}.originalPrice`} render={({ field }) => (
                                        <FormItem><FormLabel>Original Price</FormLabel><FormControl><Input type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name={`variants.${index}.stock`} render={({ field }) => (
                                        <FormItem><FormLabel>Stock</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name={`variants.${index}.weight`} render={({ field }) => (
                                        <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                </div>
                            </Card>
                        ))}
                         <Button type="button" variant="outline" size="sm" onClick={() => append({ sku: '', name: '', name_bn: '', price: 0, originalPrice: null, stock: 0, weight: 0 })}>
                            <BadgePlus className="mr-2 h-4 w-4" /> Add Variant
                        </Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                         <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="originalPrice" render={({ field }) => (
                            <FormItem><FormLabel>Original Price</FormLabel><FormControl><Input type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="stock" render={({ field }) => (
                            <FormItem><FormLabel>Stock</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="weight" render={({ field }) => (
                            <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                )}
                
                <div className="pt-4">
                     <FormField control={form.control} name="isVisible" render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                           <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                           <FormLabel>Visible on store</FormLabel>
                        </FormItem>
                    )} />
                </div>
                </ScrollArea>

                <DialogFooter className="p-6 pt-0">
                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                    <Button type="submit">Save Product</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export default function AdminProductsPage() {
    const { products, loading } = useProduct();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { toast } = useToast();

    const handleAddNew = () => {
        setSelectedProduct(null);
        setIsFormOpen(true);
    }
    
    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    }

    const handleDelete = async (product) => {
        if(confirm(`Are you sure you want to delete "${product.name}"?`)) {
            try {
                await deleteDoc(doc(db, 'products', product.id));
                toast({
                    title: "Product Deleted",
                    description: `${product.name} has been deleted.`,
                });
            } catch (error) {
                console.error("Error deleting product: ", error);
                toast({
                    title: "Error",
                    description: "Failed to delete product.",
                    variant: "destructive",
                });
            }
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                 <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Product
                </Button>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Manage Products</CardTitle>
                    <CardDescription>Add, edit, or delete products.</CardDescription>
                </CardHeader>
                <CardContent>
                     {loading ? <p>Loading products...</p> : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.category?.name || 'N/A'}</TableCell>
                                    <TableCell>৳{product.price}</TableCell>
                                    <TableCell>{product.hasVariants ? 'Multiple' : product.stock}</TableCell>
                                    <TableCell>
                                        <Badge variant={product.isVisible ? 'default' : 'secondary'} className={product.isVisible ? 'bg-green-100 text-green-800' : ''}>
                                            {product.isVisible ? 'Visible' : 'Hidden'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(product)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(product)}>
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

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                 <DialogContent className="max-w-4xl p-0">
                    <ProductForm product={selectedProduct} onFinished={() => setIsFormOpen(false)} />
                 </DialogContent>
            </Dialog>
        </div>
    )
}
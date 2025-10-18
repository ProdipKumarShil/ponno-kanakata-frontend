"use client";

import { useState, useEffect } from 'react';
import { db } from '@/services/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Edit, Trash, AlertTriangle, KeyRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { createUserAndSendPasswordReset } from '@/app/actions/admin';

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  role: z.enum(["manager", "editor", "viewer"], { required_error: "Role is required." }),
});





export default function AdminUsersPage() {
    const { user, loading: authLoading } = useAuth();
    const { language } = useLanguage();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: { email: "", role: "viewer" },
    });

    const content = {
        en: {
            pageTitle: "User Management",
            addNew: "Add New User",
            cardTitle: "Admin Users",
            cardDescription: "List of all users with access to the admin panel.",
            loading: "Loading users...",
            accessDeniedTitle: "Access Denied",
            accessDeniedDesc: "You do not have permission to manage users.",
            ownerOnly: "This section is restricted to users with the 'owner' role.",
            tableEmail: "Email",
            tableRole: "Role",
            tableActions: "Actions",
            resetPassword: "Reset Password",
            editRole: "Edit Role",
            deleteUser: "Delete User",
            ownerCannotBeModified: "Owner cannot be modified",
            dialogTitleEdit: "Edit User Role",
            dialogTitleAdd: "Add New Admin User",
            dialogDescEdit: (email) => `Change the role for ${email}.`,
            dialogDescAdd: "Create a new user and assign them a role. They will receive an email to set their password.",
            emailLabel: "Email Address",
            roleLabel: "Role",
            selectRole: "Select a role",
            manager: "Manager",
            editor: "Editor",
            viewer: "Viewer",
            cancel: "Cancel",
            save: "Save",
            saving: "Saving...",
            userUpdated: "User Updated",
            userUpdatedDesc: (email) => `Role for ${email} has been updated.`,
            userCreated: "User Created",
            userCreatedDesc: (email) => `An invitation has been sent to ${email}.`,
            error: "Error",
            processError: "Failed to process user.",
            deleteConfirm: (email) => `Are you sure you want to delete user ${email}? This cannot be undone.`,
            userDeleted: "User Deleted",
            userDeletedDesc: (email) => `Role for ${email} has been deleted. You should also delete them from Firebase Authentication.`,
            deleteError: "Failed to delete user."
        },
        bn: {
            pageTitle: "ব্যবহারকারী ব্যবস্থাপনা",
            addNew: "নতুন ব্যবহারকারী যোগ করুন",
            cardTitle: "অ্যাডমিন ব্যবহারকারীগণ",
            cardDescription: "অ্যাডমিন প্যানেলে অ্যাক্সেস থাকা সমস্ত ব্যবহারকারীর তালিকা।",
            loading: "ব্যবহারকারীদের লোড করা হচ্ছে...",
            accessDeniedTitle: "অ্যাক্সেস অস্বীকৃত",
            accessDeniedDesc: "ব্যবহারকারীদের পরিচালনা করার অনুমতি আপনার নেই।",
            ownerOnly: "এই বিভাগটি শুধুমাত্র 'মালিক' ভূমিকার ব্যবহারকারীদের জন্য সীমাবদ্ধ।",
            tableEmail: "ইমেল",
            tableRole: "ভূমিকা",
            tableActions: "ক্রিয়াকলাপ",
            resetPassword: "পাসওয়ার্ড রিসেট করুন",
            editRole: "ভূমিকা সম্পাদনা করুন",
            deleteUser: "ব্যবহারকারী মুছুন",
            ownerCannotBeModified: "মালিক পরিবর্তন করা যাবে না",
            dialogTitleEdit: "ব্যবহারকারীর ভূমিকা সম্পাদনা করুন",
            dialogTitleAdd: "নতুন অ্যাডমিন ব্যবহারকারী যোগ করুন",
            dialogDescEdit: (email) => `${email}-এর জন্য ভূমিকা পরিবর্তন করুন।`,
            dialogDescAdd: "একটি নতুন ব্যবহারকারী তৈরি করুন এবং তাদের একটি ভূমিকা নির্ধারণ করুন। তারা তাদের পাসওয়ার্ড সেট করার জন্য একটি ইমেল পাবে।",
            emailLabel: "ইমেল ঠিকানা",
            roleLabel: "ভূমিকা",
            selectRole: "একটি ভূমিকা নির্বাচন করুন",
            manager: "ম্যানেজার",
            editor: "সম্পাদক",
            viewer: "দর্শক",
            cancel: "বাতিল করুন",
            save: "সংরক্ষণ করুন",
            saving: "সংরক্ষণ করা হচ্ছে...",
            userUpdated: "ব্যবহারকারী আপডেট করা হয়েছে",
            userUpdatedDesc: (email) => `${email}-এর ভূমিকা আপডেট করা হয়েছে।`,
            userCreated: "ব্যবহারকারী তৈরি করা হয়েছে",
            userCreatedDesc: (email) => `${email}-এ একটি আমন্ত্রণ পাঠানো হয়েছে।`,
            error: "ত্রুটি",
            processError: "ব্যবহারকারী প্রক্রিয়া করতে ব্যর্থ।",
            deleteConfirm: (email) => `আপনি কি নিশ্চিত যে আপনি ${email} ব্যবহারকারীকে মুছতে চান? এটি আর ফেরানো যাবে না।`,
            userDeleted: "ব্যবহারকারী মুছে ফেলা হয়েছে",
            userDeletedDesc: (email) => `${email}-এর ভূমিকা মুছে ফেলা হয়েছে। আপনাকে Firebase Authentication থেকেও তাদের মুছে ফেলতে হবে।`,
            deleteError: "ব্যবহারকারী মুছতে ব্যর্থ।"
        }
    }
    const t = content[language];

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'userRoles'), (snapshot) => {
            const usersData = [];
            snapshot.forEach(doc => {
                usersData.push({ id: doc.id, ...doc.data() });
            });
            setUsers(usersData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    
    useEffect(() => {
        if(isFormOpen && selectedUser) {
            form.reset({ email: selectedUser.id, role: selectedUser.role });
        } else {
            form.reset({ email: "", role: "viewer" });
        }
    }, [isFormOpen, selectedUser, form]);


    const onSubmit = async (data) => {
        try {
            if (selectedUser) { 
                 await setDoc(doc(db, 'userRoles', selectedUser.id), { role: data.role });
                 toast({ title: t.userUpdated, description: t.userUpdatedDesc(selectedUser.id) });
            } else { 
                const result = await createUserAndSendPasswordReset(data.email);
                if (result.success) {
                    await setDoc(doc(db, 'userRoles', data.email), { role: data.role });
                    toast({ title: t.userCreated, description: t.userCreatedDesc(data.email) });
                } else {
                    throw new Error(result.error);
                }
            }
            setIsFormOpen(false);
            setSelectedUser(null);
        } catch (error) {
            console.error("Error processing user:", error);
            toast({ title: t.error, description: error.message || t.processError, variant: "destructive" });
        }
    };
    
    const handleDeleteUser = async (email) => {
        if (confirm(t.deleteConfirm(email))) {
             try {
                await deleteDoc(doc(db, 'userRoles', email));
                toast({ title: t.userDeleted, description: t.userDeletedDesc(email) });
            } catch (error) {
                console.error("Error deleting user:", error);
                toast({ title: t.error, description: t.deleteError, variant: "destructive" });
            }
        }
    }
    
    const openAddDialog = () => {
        setSelectedUser(null);
        setIsFormOpen(true);
    };

    const openEditDialog = (userToEdit) => {
        setSelectedUser(userToEdit);
        setIsFormOpen(true);
    };

    if (authLoading || loading) {
        return <p>{t.loading}</p>;
    }
    
    if (user?.role !== 'owner') {
        return (
             <Card className="mt-8">
                <CardHeader className="flex flex-row items-center gap-4">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                    <div>
                        <CardTitle className="text-destructive">{t.accessDeniedTitle}</CardTitle>
                        <CardDescription>{t.accessDeniedDesc}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p>{t.ownerOnly}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
                 <Button onClick={openAddDialog}>
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t.tableEmail}</TableHead>
                                <TableHead>{t.tableRole}</TableHead>
                                <TableHead className="text-right">{t.tableActions}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell className="font-medium">{u.id}</TableCell>
                                    <TableCell>
                                        <Badge variant={u.role === 'owner' ? 'default' : 'secondary'}>
                                            {u.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                       {u.role !== 'owner' ? (
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                                                <KeyRound className="h-4 w-4" />
                                                <span className="sr-only">{t.resetPassword}</span>
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(u)}>
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">{t.editRole}</span>
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDeleteUser(u.id)}>
                                                <Trash className="h-4 w-4" />
                                                <span className="sr-only">{t.deleteUser}</span>
                                            </Button>
                                        </div>
                                       ) : (
                                           <span className="text-xs text-muted-foreground">{t.ownerCannotBeModified}</span>
                                       )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedUser ? t.dialogTitleEdit : t.dialogTitleAdd}</DialogTitle>
                        <DialogDescription>
                           {selectedUser 
                           ? t.dialogDescEdit(selectedUser.id)
                           : t.dialogDescAdd
                           }
                        </DialogDescription>
                    </DialogHeader>
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t.emailLabel}</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={!!selectedUser} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t.roleLabel}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t.selectRole} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="manager">{t.manager}</SelectItem>
                                                <SelectItem value="editor">{t.editor}</SelectItem>
                                                <SelectItem value="viewer">{t.viewer}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <DialogClose asChild><Button type="button" variant="secondary">{t.cancel}</Button></DialogClose>
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                     {form.formState.isSubmitting ? t.saving : t.save}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

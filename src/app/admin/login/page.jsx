"use client";

import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});



export default function LoginPage() {
    const { user, login, error, loading } = useAuth();
    const { language } = useLanguage();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const content = {
        en: {
            title: "Admin Panel Login",
            description: "Enter your credentials to access the dashboard.",
            usernameLabel: "Username",
            passwordLabel: "Password",
            buttonText: "Sign In",
            buttonLoadingText: "Signing In...",
            redirecting: "Redirecting..."
        },
        bn: {
            title: "অ্যাডমিন প্যানেল লগইন",
            description: "ড্যাশবোর্ড অ্যাক্সেস করতে আপনার ক্রেডেনশিয়াল লিখুন।",
            usernameLabel: "ব্যবহারকারীর নাম",
            passwordLabel: "পাসওয়ার্ড",
            buttonText: "সাইন ইন করুন",
            buttonLoadingText: "সাইন ইন করা হচ্ছে...",
            redirecting: "পুনঃনির্দেশিত করা হচ্ছে..."
        }
    }

    useEffect(() => {
        if(user) {
            router.push('/admin/dashboard');
        }
    }, [user, router]);
    
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = (data) => {
        login(data.email, data.password);
    };

    if(user) {
        return (
             <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <p>{content[language].redirecting}</p>
            </div>
        )
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm shadow-lg">
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="text-center">
                 <div className="mx-auto mb-4">
                     <Image
                        src="https://i.postimg.cc/d1CCFy7K/Ponno-Kenakata-Transparent-BG-2.png"
                        alt="Ponno Kenakata Logo"
                        width={64}
                        height={64}
                    />
                </div>
              <CardTitle className="text-2xl font-headline">{content[language].title}</CardTitle>
              <CardDescription>{content[language].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{content[language].usernameLabel}</Label>
                <Input 
                    id="email" 
                    placeholder="@ponnokenakata" 
                    {...form.register("email")}
                    autoComplete="username"
                />
                 {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{content[language].passwordLabel}</Label>
                <div className="relative">
                    <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="********" 
                        {...form.register("password")}
                        autoComplete="current-password"
                    />
                    <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        className="absolute top-0 right-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
                 {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
              </div>
               {error && <p className="text-sm text-destructive text-center">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? content[language].buttonLoadingText : content[language].buttonText}
                </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}

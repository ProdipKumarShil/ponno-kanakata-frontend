"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-2">
                <LogIn className="h-8 w-8 text-primary" />
            </div>
          <CardTitle className="text-2xl font-headline">Customer Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********" disabled />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button className="w-full" disabled>Sign In</Button>
           <p className="text-xs text-muted-foreground mt-4 text-center">
            Customer authentication will be added soon.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

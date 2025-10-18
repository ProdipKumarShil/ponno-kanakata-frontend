"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, RefreshCw, ArrowLeft, X } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
  const [showOtp, setShowOtp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center relative">
            {showOtp && (
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-6 w-6" onClick={() => setShowOtp(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Go back</span>
              </Button>
            )}
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-2">
                <UserPlus className="h-8 w-8 text-primary" />
            </div>
          <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
          <CardDescription>Create your account to get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showOtp ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="Your Name" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="********" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="captcha">Please enter the text from the image</Label>
                <div className="flex items-center gap-2">
                  <div className="p-2 border rounded-md bg-gray-100">
                    <Image
                        src="https://placehold.co/150x50.png"
                        width={150}
                        height={50}
                        alt="Captcha Image"
                        data-ai-hint="captcha text"
                    />
                  </div>
                    <Button variant="ghost" size="icon" type="button">
                        <RefreshCw className="h-5 w-5" />
                    </Button>
                </div>
                 <Input id="captcha-input" type="text" placeholder="Enter captcha" disabled />
              </div>
            </>
          ) : (
            <div className="space-y-4 text-center">
                <Label htmlFor="otp">Enter the OTP sent to your email</Label>
                <Input id="otp" type="text" placeholder="_ _ _ _ _ _" className="text-center tracking-[0.5em]" disabled/>
                <p className="text-xs text-muted-foreground">Didn't receive code? <Button variant="link" className="p-0 h-auto" disabled>Resend</Button></p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center">
            { !showOtp ? (
                <Button className="w-full" onClick={() => setShowOtp(true)}>Create Account</Button>
            ) : (
                <div className="w-full space-y-2">
                    <Button className="w-full" disabled>Verify OTP</Button>
                </div>
            )}
           <p className="text-xs text-muted-foreground mt-4 text-center">
            Authentication functionality will be added soon.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

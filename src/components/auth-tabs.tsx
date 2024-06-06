"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authUser, createUser } from "@/app/auth/actions";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AuthTabs() {
  const [loginFormState, loginFormAction] = useFormState(authUser, {
    message: "",
    type: ""
  });
  const [signupFormState, signupFormAction] = useFormState(createUser, {
    message: "",
    type: ""
  });
  const router = useRouter();
  useEffect(() => {
    if (loginFormState.message) {
      if (loginFormState.type === "success") {
        toast.success(loginFormState.message);
        router.push("/");
      }
      if (loginFormState.type === "error") {
        toast.error(loginFormState.message);
      }
    }

    if (signupFormState.message) {
      if (signupFormState.type === "error") {
        toast.error(signupFormState.message);
      }
      if (signupFormState.type === "success") {
        toast.success(signupFormState.message);
        router.push("/");
      }
    }
  }, [signupFormState, loginFormState]);

  return (
    <Tabs defaultValue='login' className='w-[400px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='login'>Log In</TabsTrigger>
        <TabsTrigger value='signup'>Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value='login'>
        <Card>
          <CardHeader className='gap-1'>
            <CardTitle>Log In</CardTitle>
            <CardDescription>
              Log in to your account to access Pantry Pal and your saved
              recipes.
            </CardDescription>
          </CardHeader>
          <form action={loginFormAction}>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='usernameOrEmail'>Username or Email</Label>
                <Input
                  name='usernameOrEmail'
                  id='usernameOrEmail'
                  placeholder='you@mail.com'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  name='password'
                  id='password'
                  type='password'
                  placeholder='••••••••'
                />
              </div>
            </CardContent>
            <CardFooter>
              <LogInSubmit />
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value='signup'>
        <Card>
          <CardHeader className='gap-1'>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create an account to access Pantry Pal and save your favorite
              recipes.
            </CardDescription>
          </CardHeader>
          <form action={signupFormAction}>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' placeholder='Gordon Ramsay' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='username'>Username</Label>
                <Input name='username' id='username' placeholder='That1Cook' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='email'>Email</Label>
                <Input name='email' id='email' placeholder='you@mail.com' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  type='password'
                />
              </div>
            </CardContent>
            <CardFooter>
              <SignUpSubmit />
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function SignUpSubmit() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type='submit'>
      {pending ? "Signing Up..." : "Sign Up"}
    </Button>
  );
}

function LogInSubmit() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type='submit'>
      {pending ? "Logging In..." : "Log In"}
    </Button>
  );
}
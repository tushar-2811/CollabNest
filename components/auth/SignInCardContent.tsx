"use client";
import React, { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ProviderSignInButtons from './ProviderSignInButtons';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import Link from 'next/link';
import { SignInSchema, signInSchema } from '@/schema/SignInSchema';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';


const SignInCardContent = () => {
    const [isLoading , setIsLoading] = useState(false);
    const t = useTranslations("AUTH");
    const {toast} = useToast();
    const m = useTranslations("MESSAGES");
    const router = useRouter();

    // Define a form
    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // Define a submit handler
    const onSubmit = async (values: SignInSchema) => {
        setIsLoading(true);
        try {
            const account = await signIn("credentials",{
                 email : values.email,
                 password : values.password,
                 redirect : false
            })

            if(!account) throw new Error("Something went wrong");

            if(account.error){
                toast({
                    title : m(account.error),
                    variant : "destructive"
                })
            }else{
                toast({
                    title : m("SUCCESS.SIGN_IN"),
                });
                router.push('/onboarding');
                router.refresh();
            }
        } catch (error) {
            let errorMessage = m("ERRORS.DEFAULT");
           
            if(typeof error === 'string'){
                errorMessage = error;
            }else if (error instanceof Error){
                errorMessage = m(error.message)
            }

            toast({
                title : errorMessage,
                variant : "destructive"
            })
        }
        setIsLoading(false);
    }

    return (
        <CardContent>
            <Form {...form}>
                <form className='space-y-7' onSubmit={form.handleSubmit(onSubmit)} >

                    {/* Provider sign in buttons */}
                    <ProviderSignInButtons onLoading={setIsLoading} />

                    {/* Input Fields  */}
                    <div className='space-y-1.5'>


                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='email' placeholder={t("EMAIL")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='password' placeholder={t("PASSWORD")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>

                    <div className='space-y-2'>
                        <Button disabled={isLoading} className='w-full font-bold' type="submit"> {t("SIGN_IN.SUBMIT_BTN")} </Button>

                        <p className='text-xs text-center text-muted-foreground'>
                            <Link className='font-bold' href={"/"}>
                             {t("SIGN_IN.FORGOT_PASSWORD")}
                            </Link>
                        </p>
                    </div>

                </form>
            </Form>
        </CardContent>
    )
}

export default SignInCardContent
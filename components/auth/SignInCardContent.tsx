"use client";
import React from 'react';
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


const SignInCardContent = () => {

    const t = useTranslations("AUTH");

    // Define a form
    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // Define a submit handler
    const onSubmit = (values: SignInSchema) => {
         console.log("hi",values);
    }

    return (
        <CardContent>
            <Form {...form}>
                <form className='space-y-7' onSubmit={form.handleSubmit(onSubmit)} >

                    {/* Provider sign in buttons */}
                    <ProviderSignInButtons />

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
                        <Button className='w-full text-white font-bold' type="submit"> {t("SIGN_IN.SUBMIT_BTN")} </Button>

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
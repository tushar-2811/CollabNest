"use client";
import React, { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { signUpSchema, SignUpSchema } from '@/schema/SignUpSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ProviderSignInButtons from './ProviderSignInButtons';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import LoadingState from '../ui/loadingState';


const SignUpCardContent = () => {

    const t = useTranslations("AUTH");
    const m = useTranslations("MESSAGES");

    // Define a form
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        }
    });

    const [isLoading , setIsLoading] = useState(false);
    const {toast} = useToast();
    const router = useRouter();

    // Define a submit handler
    const onSubmit = async (values: SignUpSchema) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/register' , {
                method : 'POST',
                body : JSON.stringify(values),
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            if(!res.ok){
                throw new Error("Something went wrong");
            }

            const signUpInfo = await res.json();

            if(res.status === 200){
                toast({
                    title : m("SUCCESS.SIGN_UP")
                });

                await signIn("credentials" , {
                    email : values.email,
                    password : values.password,
                    redirect : false
                });
                router.push("/");
            }else {
                throw new Error(signUpInfo);
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
                    <ProviderSignInButtons disabled={isLoading} />

                    {/* Input Fields  */}
                    <div className='space-y-1.5'>

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='text' placeholder={t("USERNAME")} {...field} />
                                </FormControl>
                                <FormDescription>
                                    This will be your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


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
                        <Button className='w-full  font-bold' type="submit" disabled={isLoading}> 
                            {isLoading ? <LoadingState loadingText={m("PENDING.LOADING")}/> : (
                                  t("SIGN_UP.SUBMIT_BTN")
                            )}
                            
                         </Button>

                        <p className='text-xs text-center text-muted-foreground'>
                            {t("SIGN_UP.TERMS.FIRST")}{" "}
                            <Link className='font-bold' href={"/"}>
                             {t("SIGN_UP.TERMS.SECOND")}
                            </Link>
                        </p>
                    </div>

                </form>
            </Form>
        </CardContent>
    )
}

export default SignUpCardContent
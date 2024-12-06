import {z} from 'zod';

export const signInSchema = z.object({
    email : z.string()
    .email("Please enter a valid email"),
password : z.string().min(6 , "Password must be atleast 6 characters")
});

export type SignInSchema = z.infer<typeof signInSchema>;
import {z} from 'zod';

export const signUpSchema = z.object({
     email : z.string()
              .email("Please enter a valid email"),
     username : z.string()
                 .min(4 , "Username must have 4 characters")
                 .max(14 , "Username can't have more than 14 characters"),
    password : z.string().min(6 , "Password must be atleast 6 characters")
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
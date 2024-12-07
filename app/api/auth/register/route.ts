import { db } from "@/lib/db";
import { signUpSchema } from "@/schema/SignUpSchema";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(request: Request){
    const body:unknown = await request.json();

    const parsedResult = signUpSchema.safeParse(body);

    // If the recieved data is not parsed successfully
    if(!parsedResult.success){
        return NextResponse.json("Missing fields , Wrong Data" , {status : 203});
    }

    // If Result is parsed successfully
    const {email , username , password} = parsedResult.data;

    try {
        // checking if username provided is unique
        const existingUsername = await db.user.findUnique({
            where : {
                username
            }
        })

        if(existingUsername){
            return NextResponse.json("Username is already taken." , {status : 202});
        }

        // checking is email provided is unique
        const existingEmail = await db.user.findUnique({
            where : {
                email
            }
        })

        if(existingEmail){
            return NextResponse.json("Email is already registered." , {status : 202})
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password,10);

        // Now , creating the new user
        const newUser = await db.user.create({
            data : {
                email, 
                username, 
                hashedPassword
            }
        })

        return NextResponse.json(newUser , {
            status : 200
        });
    } catch (error) {
       console.log("error occurred" , error);
       NextResponse.json("Error while creating the new account" , {
        status : 204
       }) 
    }
}
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import SignUpCardContent from './SignUpCardContent'
import SignInCardContent from './SignInCardContent'

interface Props {
    isSignInCard ?: boolean
}

const AuthCard = ({isSignInCard} : Props) => {
    const t = useTranslations("AUTH");
  return (
    <>
      <Card className='w-full sm:w-auto sm:min-w-[28rem]'>
        <CardHeader>
            <Image 
            className='rounded-full object-cover self-center'
            alt='image' 
            height={50}  
            width={50} 
            src={"https://github.com/shadcn.png"} 
            />

            <CardTitle className='pt-2 '>
                {isSignInCard ? t("SIGN_IN.TITLE") : t("SIGN_UP.TITLE")}
            </CardTitle>

            <CardDescription>
            {isSignInCard ? t("SIGN_IN.DESC") : t("SIGN_UP.DESC")}

            </CardDescription>
        </CardHeader>
        
        {/* card content here */}

        {isSignInCard ? <SignInCardContent /> : <SignUpCardContent/>} 

      </Card>

      <p className='text-sm'>
        {isSignInCard ? t("SIGN_IN.DONT_HAVE_ACCOUNT.FIRST") : t("SIGN_UP.DONT_HAVE_ACCOUNT.FIRST")}{" "}
        <Link className='text-primary' href={isSignInCard ? "/sign-up" : "/sign-in"}>
        {isSignInCard ? t("SIGN_IN.DONT_HAVE_ACCOUNT.SECOND") : t("SIGN_UP.DONT_HAVE_ACCOUNT.SECOND")}
        </Link>
      </p>
    </>
  )
}

export default AuthCard

"use client"
import { useTranslations } from 'next-intl'
import React from 'react'
import ProviderSignInButton from './ProviderSignInButton';

interface Props {
    SignInCard ?: boolean
}

const ProviderSignInButtons = ({SignInCard} : Props) => {
    const t = useTranslations("AUTH");
  return (
    <div className='flex flex-col gap-2'>
        
       <ProviderSignInButton className='w-full rounded-[1.9rem] border'>
         {SignInCard ? t("SIGN_IN.PROVIDERS.GOOGLE") : t("SIGN_UP.PROVIDERS.GOOGLE")}
       </ProviderSignInButton>

       <ProviderSignInButton className='w-full rounded-[1.9rem] border'>
         {SignInCard ? t("SIGN_IN.PROVIDERS.GITHUB") : t("SIGN_UP.PROVIDERS.GITHUB")}
       </ProviderSignInButton>

    </div>
  )
}

export default ProviderSignInButtons

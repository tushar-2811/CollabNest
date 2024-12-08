"use client"
import { useTranslations } from 'next-intl'
import React from 'react'
import ProviderSignInButton from './ProviderSignInButton';
import GoogleLogo from '../svg/GoogleLogo';
import GithubLogo from '../svg/GithubLogo';

interface Props {
    SignInCard ?: boolean
    disabled ?: boolean
    onLoading :  React.Dispatch<React.SetStateAction<boolean>>;
}

const ProviderSignInButtons = ({SignInCard , disabled , onLoading} : Props) => {
    const t = useTranslations("AUTH");
  return (
    <div className='flex flex-col gap-2'>
        
       <ProviderSignInButton onLoading={onLoading} providerName='google' disabled={disabled} className='w-full rounded-[1.9rem] border'>
         <GoogleLogo className='mr-2' width={20} height={20} />
         {SignInCard ? t("SIGN_IN.PROVIDERS.GOOGLE") : t("SIGN_UP.PROVIDERS.GOOGLE")}
       </ProviderSignInButton>

       <ProviderSignInButton onLoading={onLoading} providerName='github' disabled={disabled} className='w-full rounded-[1.9rem] border'>
        <GithubLogo className='mr-2' height={20} width={20} />
         {SignInCard ? t("SIGN_IN.PROVIDERS.GITHUB") : t("SIGN_UP.PROVIDERS.GITHUB")}
       </ProviderSignInButton>

    </div>
  )
}

export default ProviderSignInButtons

import AuthCard from '@/components/auth/AuthCard'
import React from 'react'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title : "Sign Up",
  description : "Sign Up page"
}

const SignUp = () => {
  return (
    <AuthCard/>
  )
}

export default SignUp

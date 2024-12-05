import React from 'react'
import { Card, CardHeader } from '../ui/card'
import Image from 'next/image'

interface Props {
    isSignInCard ?: boolean
}

const AuthCard = ({isSignInCard} : Props) => {
  return (
    <>
      <Card>
        <CardHeader>
            <Image alt='image' height={50} width={50} src={"https://github.com/shadcn.png"} />
        </CardHeader>
      </Card>
    </>
  )
}

export default AuthCard

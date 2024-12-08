import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const page = async() => {
    const session = await checkIfUserCompletedOnboarding("/onboarding");
    console.log(session)

  return (
    <div>
      welcome , onboard
    </div>
  )
}

export default page

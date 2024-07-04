'use client'

import { Card } from '@/components/ui/card'
import { useNavigation } from '@/hooks/useNavigation'
import { SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const DesktopNav = () => {
    const paths = useNavigation()
    return (
        <Card 
            className='hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4'
        >
            <nav>
                <SignInButton />
            </nav>
            <div className='flex flex-col items-center gap-4'>
                <UserButton />
            </div>
        </Card>
    )
}

export default DesktopNav
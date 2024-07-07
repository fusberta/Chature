'use client'

import { Card } from '@/components/ui/card'
import { useConversation } from '@/hooks/useConversation'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = React.PropsWithChildren<{
    title: string
    action?: React.ReactNode
}>

const ItemList = ({ children, title, action }: Props) => {
    const { isActive } = useConversation()
    return (
        <Card className={cn('hidden h-full w-full lg:flex-none lg:w-80 p-3 overflow-hidden', {
            'lg:block': isActive,
            'block': !isActive
        })}>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                {action ? action : null}
            </div>
            <div className="w-full h-full flex flex-col items-center justify-start gap-2">
                {children}
            </div>
        </Card>
    )
}

export default ItemList
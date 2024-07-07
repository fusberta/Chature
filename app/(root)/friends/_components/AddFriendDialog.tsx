'use client'

import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserPlus } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useMutationState } from '@/hooks/useMutationState'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'

const addFriendFormSchema = z.object({
    email: z.string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email' }),
})
const AddFriendDialog = () => {

    const { mutate: createRequest, pending } = useMutationState(api.request.create)

    const form = useForm<z.infer<typeof addFriendFormSchema>>({
        resolver: zodResolver(addFriendFormSchema),
        defaultValues: {
            email: ''
        }
    })

    const handleSubmit = async (values: z.infer<typeof addFriendFormSchema>) => {
        await createRequest({
            email: values.email
        })
            .then(() => {
                form.reset()
                toast.success('Friend request sent')
            })
            .catch((error) => {
                console.error(error)
                toast.error(error instanceof ConvexError ? error.data : "Unexpected error occurred")
            })
    }

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger>
                    <Button size={'icon'} variant={'outline'}>
                        <DialogTrigger>
                            <UserPlus />
                        </DialogTrigger>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add Friend</p>
                </TooltipContent>
            </Tooltip>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Friend</DialogTitle>
                    <DialogDescription>
                        Send a request to connect with your friends.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                        <FormField control={form.control} name='email' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Email' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <DialogFooter>
                            <Button type='submit' variant='outline'>
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}

export default AddFriendDialog
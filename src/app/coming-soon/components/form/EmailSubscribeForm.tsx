'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { handleAddToWaitlist } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email cannot be empty')
    .email('Invalid email address'),
})

const EmailSubscribeForm = ({
  isSubmitted,
  setIsSubmitted,
}: {
  isSubmitted: boolean
  setIsSubmitted: (val: boolean) => void
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    setIsSubmitting(true)

    try {
      const result = await handleAddToWaitlist(data.email)
      if (result.success) {
        setIsSubmitted(true)
      } else if (result.error === 'Email already registered') {
        form.setError('email', { message: 'Email already added to waitlist' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      {isSubmitted ? (
        <p className="text-center text-xl font-medium md:text-2xl">
          🎉 Thank you for joining our waitlist, you&apos;ll hear from us soon!
        </p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="w-full">
                    <div className="relative w-full">
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        className="h-full w-full p-4 pr-36 focus-visible:ring-1"
                        {...field}
                      />
                      <Button
                        type="submit"
                        className="absolute top-1/2 right-0 h-full -translate-y-1/2 transform bg-[#2E604A] !px-4"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          'Submitting...'
                        ) : (
                          <>
                            Notify Me <Send className="ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-0.5 ml-1 text-left text-sm text-red-500" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  )
}

export default EmailSubscribeForm

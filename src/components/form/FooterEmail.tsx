// "use client";

// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormDescription,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { handleAddToNewsLetter } from "@/lib/api";
// import { toast } from "sonner";

// const emailSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email cannot be empty")
//     .email("Invalid email address"),
// });

// const EmailSubscribeForm = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<z.infer<typeof emailSchema>>({
//     resolver: zodResolver(emailSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof emailSchema>) => {
//     setIsSubmitting(true);

//     try {
//       const result = await handleAddToNewsLetter(data.email);

//       if (result.success) {
//         toast.success("Subscribed successfully!", {
//           description: "Thank you for subscribing to our newsletter.",
//         });
//         form.reset();
//       } else if (result.error) {
//         toast.error("Subscription failed", {
//           description: "This email has already been subscribed",
//         });
//       }
//     } catch (err) {
//       toast.error("Something went wrong", {
//         description:
//           err instanceof Error ? err.message : "Please try again later.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <div className="flex w-full justify-end">
//                     <div className="flex flex-col gap-4 w-full md:w-fit">
//                       <p
//                         id="newsletter-description"
//                         className="text-[16px] self-start"
//                       >
//                         Stay up to date
//                       </p>
//                       <div className="flex md:flex-row flex-col w-full gap-4">
//                         <div className="">
//                           <Input
//                             placeholder="Enter your email"
//                             className="bg-white px-3.5 h-12 text-black rounded-lg outline-none border-none w-full md:min-w-72"
//                             aria-label="Email subscription"
//                             aria-describedby="newsletter-description"
//                             {...field}
//                           />
//                           <FormMessage
//                             className="text-sm text-left text-red-500 mt-0.5 whitespace-normal"
//                             role="alert"
//                           />
//                         </div>
//                         <Button
//                           type="submit"
//                           variant="outline"
//                           className={`border-primary text-primary font-semibold cursor-pointer h-12 md:w-[115px]`}
//                           disabled={isSubmitting}
//                           aria-label={
//                             isSubmitting
//                               ? "Submitting subscription"
//                               : "Subscribe to newsletter"
//                           }
//                         >
//                           {isSubmitting ? "Submitting..." : "Subscribe"}
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </FormControl>
//                 <FormDescription className="sr-only">
//     Enter your email to subscribe to our newsletter
//   </FormDescription>
//               </FormItem>
//             )}
//           />
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default EmailSubscribeForm;

'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { handleAddToNewsLetter } from '@/actions/api'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email cannot be empty')
    .email('Invalid email address'),
})

const EmailSubscribeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [buttonState, setButtonState] = useState('initial')

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })

  // Reset button state after 5 seconds if subscribed
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (buttonState === 'subscribed') {
      timer = setTimeout(() => {
        setButtonState('initial')
      }, 5000)
    }
    return () => clearTimeout(timer)
  }, [buttonState])

  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    setIsSubmitting(true)
    setButtonState('loading')

    try {
      const result = await handleAddToNewsLetter(data.email)

      if (result.success) {
        setButtonState('subscribed')
        toast.success('Subscribed successfully!', {
          description: 'Thank you for subscribing to our newsletter.',
        })
        form.reset()
      } else if (result.error) {
        setButtonState('initial')
        toast.error('Subscription failed', {
          description: 'This email has already been subscribed',
        })
      }
    } catch (err) {
      setButtonState('initial')
      toast.error('Something went wrong', {
        description:
          err instanceof Error ? err.message : 'Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getButtonContent = () => {
    switch (buttonState) {
      case 'loading':
        return (
          <>
            Loading <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          </>
        )
      case 'subscribed':
        return 'Subscribed!'
      default:
        return 'Subscribe'
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex w-full justify-end">
                    <div className="flex w-full flex-col gap-4 md:w-fit">
                      <p
                        id="newsletter-description"
                        className="self-start text-[16px]"
                      >
                        Stay up to date
                      </p>
                      <div className="flex w-full flex-col gap-4 md:flex-row">
                        <div className="">
                          <Input
                            placeholder="Enter your email"
                            className="h-12 w-full rounded-lg border-none bg-white px-3.5 text-black outline-none md:min-w-72"
                            aria-label="Email subscription"
                            aria-describedby="newsletter-description"
                            {...field}
                          />
                          <FormMessage
                            className="mt-0.5 text-left text-sm whitespace-normal text-red-500"
                            role="alert"
                          />
                        </div>
                        <Button
                          type="submit"
                          variant="outline"
                          className={`border-primary text-primary flex h-12 cursor-pointer items-center justify-center font-semibold md:w-[115px]`}
                          disabled={isSubmitting}
                          aria-label={
                            isSubmitting
                              ? 'Submitting subscription'
                              : 'Subscribe to newsletter'
                          }
                        >
                          {getButtonContent()}
                        </Button>
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your email to subscribe to our newsletter
                </FormDescription>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default EmailSubscribeForm

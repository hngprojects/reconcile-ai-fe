'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { profileFormSchema, type ProfileFormValues } from './settingsSchemas'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useImageUpload } from '@/hooks/use-image-upload'
import { useSession } from 'next-auth/react'
import { ProfileImage } from './ProfileImage'
import { update_user_profile } from '@/actions/settings'
import type { UserInfo } from '@/types/settings'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { User } from '@/types/auth'

export function ProfileTab() {
  const [isPending, startTransition] = useTransition()
  const { data: session, update } = useSession()
  const { handleRemove, photoFile, setPhotoFile, previewUrl } = useImageUpload()
  const user = session?.user
  const [resetKey, setResetKey] = useState(0)
  const [formChanged, setFormChanged] = useState(false)

  console.log(user?.avatar)

  const userFirstName = user?.name.split(' ')[0]
  const userLastName = user?.name.split(' ')[1]
  const userEmail = user?.email
  const userPhone = user?.phone_number
  const userCountry = user?.country
  const userCity = user?.city

  // Store original values for change detection using useMemo
  const originalValues = useMemo(
    () => ({
      firstName: userFirstName || '',
      lastName: userLastName || '',
      email: userEmail,
      phoneNumber: userPhone || undefined,
      country: userCountry || undefined,
      city: userCity || undefined,
    }),
    [userFirstName, userLastName, userEmail, userPhone, userCountry, userCity]
  )

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: originalValues,
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      const hasFormValueChanged =
        value.firstName !== originalValues.firstName ||
        value.lastName !== originalValues.lastName ||
        value.country !== originalValues.country ||
        value.city !== originalValues.city ||
        value.phoneNumber !== originalValues.phoneNumber

      setFormChanged(
        hasFormValueChanged || photoFile !== null || previewUrl !== null
      )
    })

    return () => subscription.unsubscribe()
  }, [form, originalValues, photoFile, previewUrl])

  useEffect(() => {
    if (photoFile !== null || previewUrl !== null) {
      setFormChanged(true)
    }
  }, [photoFile, previewUrl])

  const onSubmit = (data: ProfileFormValues) => {
    if (!formChanged) {
      return
    }

    const updatedUserInfo: UserInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      country: data.country,
      city: data.city,
      avatar: photoFile || undefined,
    }

    console.log({ updatedUserInfo })

    startTransition(() => {
      update_user_profile(updatedUserInfo).then(async (res) => {
        if (res.success) {
          await update({
            user: {
              ...user,
              name: res.data?.name,
              country: res.data?.country,
              city: res.data?.city,
              phone_number: res.data?.phone_number,
              avatar: res.data?.avatar,
            } as User,
          })

          console.log({ res })
          toast.success('Changes Saved Successfully', {
            description: res.message,
          })

          setFormChanged(false)
          handleRemove()
        } else {
          toast.error('Failed to update changes', {
            description: res.message,
          })
        }
      })
    })
  }

  const handleReset = () => {
    form.reset(originalValues)
    setPhotoFile(null)
    handleRemove()
    setFormChanged(false)
    setResetKey((prevKey) => prevKey + 1)
  }

  // Debug logging
  useEffect(() => {
    console.log('Current state:', {
      photoFile,
      previewUrl,
      formChanged,
    })
  }, [photoFile, previewUrl, formChanged])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-start gap-6">
              <ProfileImage key={resetKey} />

              <div className="w-full flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="h-fit">
                        <FormLabel className="font-normal">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter First Name"
                            className="h-11 placeholder:text-sm md:h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="h-fit">
                        <FormLabel className="font-normal">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Last Name"
                            className="h-11 placeholder:text-sm md:h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="cursor-not-allowed">
                      <FormLabel className="font-normal">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter Email Address"
                          className="disabled:bg-muted h-11 placeholder:text-sm md:h-12"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage className="text-xs md:text-sm" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="h-fit">
                        <FormLabel className="font-normal">Country</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Country"
                            className="h-11 placeholder:text-sm md:h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="h-fit">
                        <FormLabel className="font-normal">City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter City"
                            className="h-11 placeholder:text-sm md:h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Phone Number"
                          className="h-11 placeholder:text-sm md:h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs md:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="text-primary hover:text-primary"
            onClick={handleReset}
            disabled={isPending || !formChanged}
          >
            Reset
          </Button>

          <Button
            type="submit"
            className="font-normal"
            disabled={isPending || !formChanged}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" /> Saving
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

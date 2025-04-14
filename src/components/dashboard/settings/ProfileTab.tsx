'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { profileFormSchema, ProfileFormValues } from './settingsSchemas'

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

export function ProfileTab() {
  const { data: session } = useSession()
  const { handleRemove } = useImageUpload()
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const user = session?.user
  const [resetKey, setResetKey] = useState(0)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.name.split(' ')[0] || '',
      lastName: user?.name.split(' ')[1] || '',
      email: user?.email,
      phoneNumber: user?.phone,
    },
  })

  const onSubmit = (data: ProfileFormValues) => {
    console.log({ ...data, profileImage: photoFile })
  }

  const handleReset = () => {
    form.reset()
    setPhotoFile(null)
    handleRemove()

    setResetKey((prevKey) => prevKey + 1)
  }

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
              <ProfileImage
                key={resetKey}
                onUpload={(file) => {
                  setPhotoFile(file)
                  form.setValue('profileImage', file)
                }}
              />

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
                          // type="number"
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
          >
            Reset
          </Button>

          <Button type="submit" className="font-normal">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}

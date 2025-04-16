'use server'

import { APIResponse } from '../types/global'
import { createFetchUtil, HttpError, withAuth } from '../lib/fetch-utils'
import { auth } from '@/auth'
import { UserInfo, UserUpdateResponse } from '@/types/settings'

const apiHandler = createFetchUtil({
  baseUrl: process.env.BASE_API_URL as string,
})

export const update_user_profile = async (
  data: UserInfo
): Promise<APIResponse<UserUpdateResponse | null>> => {
  const session = await auth()

  const formData = new FormData()

  if (data.firstName || data.lastName)
    formData.append('name', `${data.firstName} ${data.lastName}`)
  if (data.phoneNumber) formData.append('phone_number', data.phoneNumber)
  if (data.country) formData.append('country', data.country)
  if (data.city) formData.append('city', data.city)

  if (data.avatar) {
    formData.append('avatar', data.avatar)
  }

  try {
    const res = await apiHandler<APIResponse<UserUpdateResponse>>(
      '/profile/update',
      {
        method: 'POST',
        headers: {
          ...withAuth(session?.user.access_token as string),
        },
        body: formData,
        isFormData: true,
      }
    )
    return { ...res, success: true }
  } catch (error) {
    if (error instanceof HttpError) {
      return {
        success: error.responseBody?.success || false,
        message:
          error.responseBody?.message || `Server error: ${error.message}`,
        data: null,
      }
    } else {
      return {
        success: false,
        message: 'An unexpected error occurred',
        data: null,
      }
    }
  }
}

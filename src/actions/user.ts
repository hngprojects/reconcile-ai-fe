'use server'
import { APIResponse } from '../types/global'
import { createFetchUtil, HttpError, withAuth } from '../lib/fetch-utils'
import { auth } from '@/auth'

const apiHandler = createFetchUtil({
  baseUrl: process.env.BASE_API_URL as string,
})

export const delete_user_account = async (): Promise<
  APIResponse<unknown | null>
> => {
  const session = await auth()
  try {
    const res = await apiHandler<APIResponse<unknown>>('/user', {
      method: 'DELETE',
      headers: {
        ...withAuth(session?.access_token as string),
      },
    })
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

export const update_user_details = async ({
  data,
}: {
  data: { country: string; city: string; avatar: string }
}): Promise<APIResponse<unknown | null>> => {
  const session = await auth()
  try {
    const res = await apiHandler<APIResponse<unknown>>('/profile/update', {
      method: 'PATCH',
      headers: {
        ...withAuth(session?.access_token as string),
      },
      body: { ...data },
    })
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

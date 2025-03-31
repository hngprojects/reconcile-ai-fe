'use server'
import { User } from '../types/auth'
import { APIResponse } from '../types/global'
import { createFetchUtil, HttpError } from '../lib/fetch-utils'

const apiHandler = createFetchUtil({
  baseUrl: process.env.BASE_API_URL as string,
})

export const google_login = async (
  id_token: string
): Promise<APIResponse<{ user: User } | null>> => {
  try {
    const res = await apiHandler<APIResponse<{ user: User }>>(
      '/auth/google-login',
      {
        method: 'POST',
        body: { id_token },
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

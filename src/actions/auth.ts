'use server'
import { PaymentPlan, User } from '../types/auth'
import { APIResponse } from '../types/global'
import { createFetchUtil, HttpError, withAuth } from '../lib/fetch-utils'

const apiHandler = createFetchUtil({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL as string,
})

export const google_login = async (
  id_token: string
): Promise<APIResponse<{ user: User; plan: PaymentPlan } | null>> => {
  try {
    const res = await apiHandler<
      APIResponse<{ user: User; plan: PaymentPlan }>
    >('/auth/google-login', {
      method: 'POST',
      body: { id_token },
    })
    const res2 = await apiHandler<
      APIResponse<{ user: User; plan: PaymentPlan }>
    >('/user', {
      method: 'GET',
      headers: {
        ...withAuth(res.access_token as string),
      },
    })
    return {
      success: true,
      access_token: res.access_token,
      data: {
        user: {
          ...res.data.user,
          access_token: res.access_token as string,
        },
        plan: res2.data.plan,
      },
      message: res.message,
    }
  } catch (error) {
    console.log(error, 'error in google login')
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

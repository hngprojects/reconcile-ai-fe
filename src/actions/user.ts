'use server'

import { APIResponse } from '../types/global'
import { createFetchUtil, HttpError, withAuth } from '../lib/fetch-utils'
import { auth } from '@/auth'
import { PaymentPlan, TAnalytics, User } from '@/types/auth'

const apiHandler = createFetchUtil({
  baseUrl: process.env.BASE_API_URL as string,
})

export const delete_user_account = async (): Promise<
  APIResponse<unknown | null>
> => {
  const session = await auth()
  console.log(session)
  try {
    const res = await apiHandler<APIResponse<unknown>>('/user', {
      method: 'DELETE',
      headers: {
        ...withAuth(session?.user.access_token as string),
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

export const update_user_details = async (
  data: Record<string, string | undefined>
): Promise<APIResponse<unknown | null>> => {
  for (const key in data) {
    if (typeof data[key] !== 'string' && typeof data[key] !== 'undefined') {
      return {
        success: false,
        message: `Invalid data type for key "${key}". Expected string or undefined.`,
        data: null,
      }
    }
  }
  const session = await auth()
  try {
    const res = await apiHandler<APIResponse<unknown>>('/profile/update', {
      method: 'POST',
      headers: {
        ...withAuth(session?.user.access_token as string),
      },
      body: data,
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

export const update_user_plan = async (
  price: number,
  plan: 'Starter' | 'Business'
): Promise<APIResponse<unknown | null>> => {
  const session = await auth()
  const data = { price, plan }
  try {
    const res = await apiHandler<APIResponse<unknown>>('/payment-plan', {
      method: 'PUT',
      headers: {
        ...withAuth(session?.user.access_token as string),
      },
      body: data,
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

export const get_current_user = async (): Promise<
  APIResponse<{ user: User; plan: PaymentPlan } | null>
> => {
  const session = await auth()

  try {
    const res = await apiHandler<
      APIResponse<{ user: User; plan: PaymentPlan }>
    >('/user', {
      method: 'GET',
      headers: {
        ...withAuth(session?.user.access_token as string),
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


export const get_dashboard_analytics = async (): Promise<
  APIResponse<{
    bank_balance: TAnalytics,
    expense: TAnalytics,
    income: TAnalytics
  } | null>
> => {
  const session = await auth()

  try {
    const res = await apiHandler<
      APIResponse<{ user: User; plan: PaymentPlan }>
    >('/dashboard', {
      method: 'GET',
      headers: {
        ...withAuth(session?.user.access_token as string),
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

'use server'

import { auth } from '@/auth'
import { createFetchUtil, HttpError, withAuth } from '../lib/fetch-utils'
import { APIResponse } from '../types/global'

const apiHandler = createFetchUtil({
  baseUrl: process.env.BASE_API_URL as string,
})

export const get_all_chart_account_categories = async (): Promise<
  APIResponse<unknown | null>
> => {
  const session = await auth()

  try {
    const res = await apiHandler<APIResponse<unknown>>(
      '/chart-account-categories',
      {
        method: 'GET',
        headers: {
          ...withAuth(session?.user.access_token as string),
        },
      }
    )
    console.log({ res })

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

export const toggle_a_chart_account_category = async (
  categoryId: number
): Promise<APIResponse<unknown | null>> => {
  const session = await auth()

  try {
    const res = await apiHandler<APIResponse<unknown>>(
      `/chart-account-categories/${categoryId}/toggle`,
      {
        method: 'PUT',
        headers: {
          ...withAuth(session?.user.access_token as string),
        },
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

export const create_a_new_chart_account = async (data: {
  account_number: string
  account_name: string
  balance: number
  description: string
  user_id: string
  account_chart_category_id: string
}): Promise<APIResponse<unknown | null>> => {
  const session = await auth()

  try {
    const res = await apiHandler<APIResponse<unknown>>('/chart-accounts', {
      method: 'POST',
      headers: {
        ...withAuth(session?.user.access_token as string),
      },
      body: data,
    })

    console.log({ res })

    return { ...res, success: true }
  } catch (error) {
    console.log({ error })
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

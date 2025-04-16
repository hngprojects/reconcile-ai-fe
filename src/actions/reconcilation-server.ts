'use server'

import { auth } from '@/auth'
import { cookies } from 'next/headers'
import { inDevEnvironment } from '@/lib/utils'
import { APIResponse, RecordItem } from '../types/global'
import { createFetchUtil, HttpError, withAuth } from '../lib/fetch-utils'
import { UpdateResponseData } from '@/types/backendResponseTypes'

const apiHandler = createFetchUtil({
  baseUrl: process.env.BASE_API_URL as string,
})

export const get_reconcilations = async (): Promise<
  APIResponse<RecordItem[] | null>
> => {
  const session = await auth()
  try {
    const res = await apiHandler<APIResponse<RecordItem[]>>(
      '/reconciliations',
      {
        method: 'GET',
        headers: {
          ...withAuth(session?.user.access_token as string),
        },
      }
    )
    return res
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

export const get_reconcilations_by_id = async (
  id: string
): Promise<APIResponse<UpdateResponseData | null>> => {
  const session = await auth()
  try {
    const res = await apiHandler<APIResponse<UpdateResponseData>>(
      `/reconciliations/${id}`,
      {
        method: 'GET',
        headers: {
          ...withAuth(session?.user.access_token as string),
        },
      }
    )
    console.log('get_reconcilations_by_id', res)
    return res
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

export const save_reconcilation_id = async (id: string) => {
  const cookie = await cookies()
  cookie.set('reconciliation_id', JSON.stringify(id), {
    httpOnly: true,
    secure: !inDevEnvironment,
    maxAge: 60 * 60 * 24,
    path: '/',
  })
  return id
}

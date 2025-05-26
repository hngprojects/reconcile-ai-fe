'use server'

import { auth } from '@/auth'
import { cookies } from 'next/headers'
import { inDevEnvironment } from '@/lib/utils'
import { APIResponse, RecordItem } from '../types/global'
import { createFetchUtil, HttpError, withAuth } from '../lib/fetch-utils'
import { UpdateResponseData } from '@/types/backendResponseTypes'
import { MatchRequestBody, ReconResponseData } from '@/types/reconciliation'

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

export const get_reconcilation_results_by_id = async (
  id: string
): Promise<APIResponse<ReconResponseData | null>> => {
  const session = await auth()
  try {
    const res = await apiHandler<APIResponse<ReconResponseData>>(
      `/reconciliations/${id}/result`,
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

export const match_unmatch_transactions = async (
  id: string,
  data: MatchRequestBody
): Promise<APIResponse<ReconResponseData | null>> => {
  const session = await auth()

  // More detailed debugging
  console.log('=== Match/Unmatch Transaction Debug ===')
  console.log('1. Reconciliation ID:', id)
  console.log('2. Raw Request Data:', data)
  console.log('3. Matches Array:', data.matches)

  // IMPORTANT: Only send the matches array as the request body
  // The reconciliation ID is already included in the URL path
  const matches = data.matches

  console.log('4. Final Request Body:', { matches })
  console.log('5. Stringified Body:', JSON.stringify({ matches }))
  console.log(
    '6. Session Token:',
    session?.user.access_token ? 'Present' : 'Missing'
  )

  try {

    const parsedMatches = matches.map(match => ({
      ...match,
      score: parseInt(match.score, 10)
    }));

    const res = await apiHandler<APIResponse<ReconResponseData>>(
      `/reconcile/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...withAuth(session?.user.access_token as string),
        },
        body: { matches: parsedMatches },
      }
    )
    console.log('8. API Response:', res)
    return res
  } catch (error) {
    console.error('9. API Error Details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })

    if (error instanceof HttpError) {
      console.error('10. HTTP Error Response:', error.responseBody)
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

export const delete_reconcilation = async (
  id: string
): Promise<APIResponse<null>> => {
  const session = await auth()
  try {
    const res = await apiHandler<APIResponse<null>>(`/reconciliations/${id}`, {
      method: 'DELETE',
      headers: {
        ...withAuth(session?.user.access_token as string),
      },
    })
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

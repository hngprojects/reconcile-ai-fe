'use server'

import { auth } from '@/auth'
import { createFetchUtil, HttpError, withAuth } from '@/lib/fetch-utils'
import { APIResponse } from '@/types/global'

interface AccountSetupRequestBody {
  business_name: string
  business_type: string
  currency: string
  reporting_year: string
  bank_name: string
  account_name: string
  account_number: string
  opening_balance: number
  ledger_types: string[]
}

const apiHandler = createFetchUtil({
  baseUrl: process.env.BASE_API_URL as string,
})

export const handle_account_setup = async (
  data: AccountSetupRequestBody
): Promise<APIResponse<unknown | null>> => {
  const session = await auth()
  try {
    const res = await apiHandler<APIResponse<unknown>>('/account/setup', {
      method: 'POST',
      headers: {
        ...withAuth(session?.user.access_token as string),
      },
      body: data,
    })
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

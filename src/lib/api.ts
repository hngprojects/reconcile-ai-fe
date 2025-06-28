import {
  CONTACT_US_API_URL,
  NEWSLETTER_API_URL,
  WAITLIST_API_URL,
  MANUAL_API_URL,
  MARKETING_DEMO_API_URL,
  PARTNER_API_URL,
  CUSTOMER_FEEDBACK_API_URL,
  RECONCILIATION_RESULT_API_URL,
  PAYMENT_PLAN_API_URL,
  TOKEN_VALIDATOR_URL,
  USER_PROFILE_UPDATE_API_URL,
  BILLING_HISTORY_API_URL,
  LEDGER_ENTRY_API_URL,
  BOOKKEEPING_LEDGER_API_URL,
  BANK_ACCOUNTS_API_URL,
  GET_RECONCILIATION_PROJECTS,
} from './apiEndpoints'
import { ManualRequestBody } from '@/types/reconciliation'
import { getSession } from 'next-auth/react'

interface MarketingDemoData {
  full_name: string
  business_name: string
  email: string
  phone_number: string
}

export interface PartnerFormData {
  full_name: string
  business_name: string
  service_interested: string
  email: string
  phone_number: string
}

export interface PartnerResponse {
  success: boolean
  message?: string
  errors?: {
    full_name?: string[]
    business_name?: string[]
    service_interested?: string[]
    email?: string[]
    phone_number?: string[]
  }
}

interface PaymentPlanData {
  price: number
  plan: string
}

interface PaymentPlanResponse {
  status: boolean
  message: string
  data: {
    id: number
    user_id: number
    price: number
    plan: string
    created_at: string
    updated_at: string
  } | null
}

interface LedgerUploadResponse {
  status: string
  message: string
  data: Record<string, unknown>
}

interface LedgerEntryData {
  ledgerCategory: string
  transactionType: string
  transactionDate: string
  description: string
  amount: string
  paidStatus: string
  dueDate: string
  amountPaid: string
  bankAccount: string
  account: string
  reference?: string
  attachment?: File
  mappings?: Record<string, string>
}

// Waitlist API
export async function handleAddToWaitlist(email: string): Promise<{
  success?: string
  error?: string
}> {
  try {
    const response = await fetch(WAITLIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.message || 'Failed to add to waitlist' }
    }

    return { success: data.message }
  } catch (error) {
    console.error(`Waitlist error for email ${email}:`, error)
    return { error: 'Something went wrong. Please try again later.' }
  }
}

// CONTACT US
export async function handleContactUs(userInfo: {
  name: string
  email: string
  message: string
  phone_number: string
}) {
  try {
    const response = await fetch(CONTACT_US_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send contact us message')
    }

    return { success: data.message }
  } catch (error) {
    console.error('Contact us error:', error)
    return { error: 'Something went wrong. Please try again later.' }
  }
}

// Newsletter API
export async function handleAddToNewsLetter(email: string): Promise<{
  success?: string
  error?: string
}> {
  try {
    const response = await fetch(NEWSLETTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.message || 'Failed to add to newsletter' }
    }

    return { success: data.message }
  } catch {
    // console.error(`Newsletter error for email ${email}:`, error);
    return { error: 'Something went wrong. Please try again later.' }
  }
}

export async function updateReconciliation(
  reconciliation: string,
  data: ManualRequestBody
) {
  try {
    const response = await fetch(`${MANUAL_API_URL}${reconciliation}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const resData = await response.json()

      return { status: 'success', data: resData.data }
    }
  } catch {
    return { error: 'Something went wrong. Please try again later.' }
  }
}

export async function handleMarketingDemo(data: MarketingDemoData) {
  try {
    const response = await fetch(MARKETING_DEMO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to submit demo request')
    }

    return { success: true, data: responseData.data }
  } catch (error) {
    console.error('Marketing demo error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Something went wrong',
    }
  }
}

export const handlePartnerSubmission = async (
  data: PartnerFormData
): Promise<PartnerResponse> => {
  try {
    const response = await fetch(PARTNER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      if (response.status === 422) {
        return {
          success: false,
          errors: result.errors,
        }
      }
      throw new Error(result.message || 'Failed to submit partnership request')
    }

    return result
  } catch (error) {
    console.error('Partner submission error:', error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to submit partnership request. Please try again.',
    }
  }
}
//CUSTOMER_FEEDBACK_API_URL
export const handleCustomerFeedback = async (formData: FormData) => {
  try {
    const response = await fetch(CUSTOMER_FEEDBACK_API_URL, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong')
    }

    return {
      success: true,
      data: data.data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export const fetchReconciliation = async (reconciliationId: string) => {
  const session = await getSession()
  const headers: HeadersInit = {
    Accept: 'application/json',
    Authorization: `Bearer ${session?.user.access_token}`,
  }

  try {
    const response = await fetch(
      `${RECONCILIATION_RESULT_API_URL}${reconciliationId}`,
      { headers }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong')
    }

    return {
      success: true,
      data: data.data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}
export async function updatePaymentPlan(
  data: PaymentPlanData
): Promise<PaymentPlanResponse> {
  const session = await getSession()

  try {
    const response = await fetch(PAYMENT_PLAN_API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${session?.user.access_token}`,
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to update payment plan')
    }

    return result
  } catch (error) {
    console.error('Payment plan update error:', error)
    throw error
  }
}

export const exportReconciliation = async (reconciliationId: string) => {
  const response = await fetch(
    `${RECONCILIATION_RESULT_API_URL}${reconciliationId}/export`
  )
  const blob = await response.blob()

  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reconciliation_export_${
    new Date().toISOString().split('T')[0]
  }.csv`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

export const validateToken = async (accessToken: string) => {
  const response = await fetch(TOKEN_VALIDATOR_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`, // Pass the access token
    },
  })

  return response.ok
}

export const getReconciliationsProjects = async () => {
  const session = await getSession()
  const accessToken = session?.user.access_token

  const response = await fetch(GET_RECONCILIATION_PROJECTS, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()
  return data
}

export async function updateProfile(formData: FormData) {
  const session = await getSession()
  try {
    const response = await fetch(USER_PROFILE_UPDATE_API_URL, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to update profile')
    }

    const responseData = await response.json()
    return { success: true, data: responseData }
  } catch (error) {
    console.error('Error updating profile:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

export const getBillingHistory = async (page: number, perPage: number) => {
  try {
    const session = await getSession()

    const response = await fetch(
      `${BILLING_HISTORY_API_URL}?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
          Accept: 'application/json',
        },
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export const fetchReconciliationHistory = async () => {
  const session = await getSession()

  try {
    const response = await fetch(`${RECONCILIATION_RESULT_API_URL}`, {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
        Accept: 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong')
    }

    return {
      success: true,
      data: data.data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export async function handleLedgerCSVUpload(
  ledgerCategory: string,
  file: File,
  transactionType: string,
  mappings?: Record<string, string>
): Promise<LedgerUploadResponse> {
  // Validate inputs before proceeding
  if (!ledgerCategory) throw new Error('Ledger category is required')
  if (!file) throw new Error('File is required')
  if (!transactionType) throw new Error('Transaction type is required')

  // Validate file size
  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds the 10MB limit')
  }

  // Check file type more thoroughly
  if (!file.type.includes('csv') && !file.name.endsWith('.csv')) {
    throw new Error('Only CSV files are accepted')
  }

  const session = await getSession()
  if (!session?.user?.access_token) {
    throw new Error('Authentication required. Please log in again.')
  }

  const formData = new FormData()
  formData.append('ledger', ledgerCategory)
  formData.append('ledger_file', file)
  formData.append('transaction_type', transactionType)

  // Process mappings
  if (mappings) {
    const requiredFields = ['Date', 'Description', 'Amount']

    // Check for required fields
    const mappedFields = Object.values(mappings).filter(
      (value) => value !== '' && value !== 'none'
    )
    const missingFields = requiredFields.filter(
      (field) => !mappedFields.includes(field)
    )

    if (missingFields.length > 0) {
      throw new Error(
        `The following required fields are not mapped: ${missingFields.join(', ')}`
      )
    }

    // Add mapper fields to FormData
    Object.entries(mappings).forEach(([csvColumn, reconxiField]) => {
      if (reconxiField && reconxiField !== '' && reconxiField !== 'none') {
        formData.append(`mapper[${reconxiField.toLowerCase()}]`, csvColumn)
      }
    })
  } else {
    throw new Error('Mappings are required for CSV upload')
  }

  // Add timeout handling
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 60000) // 1 minute timeout

  try {
    const response = await fetch(`${LEDGER_ENTRY_API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
        Accept: 'application/json',
      },
      body: formData,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // Check for network errors first
    if (!response) {
      throw new Error('Network error - unable to connect to server')
    }

    const data = await response.json()

    if (!response.ok) {
      // Enhanced error handling with status code
      const errorMessage =
        data.message || `Upload failed with status: ${response.status}`
      throw new Error(errorMessage)
    }

    return data
  } catch (error) {
    clearTimeout(timeoutId)
    console.error('Ledger CSV upload error:', error)

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(
        'Upload timed out. Please try again with a smaller file or better connection.'
      )
    }

    // Add more context to the error for the user
    throw new Error(
      `Failed to upload: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

export async function submitLedgerEntry(data: LedgerEntryData) {
  try {
    const session = await getSession()

    // Enhanced debugging
    console.log('=== Submit Ledger Entry Debug ===')
    console.log('1. Session exists:', !!session)
    console.log('2. User exists:', !!session?.user)
    console.log('3. Access token exists:', !!session?.user?.access_token)
    console.log(
      '4. Access token preview:',
      session?.user?.access_token?.substring(0, 20) + '...'
    )
    console.log('5. Form data:', data)

    if (!session?.user?.access_token) {
      throw new Error('User not authenticated - no access token found')
    }

    const formData = new FormData()
    formData.append('bookkeeping_ledger_id', data.ledgerCategory)
    formData.append('transaction_type', data.transactionType)
    formData.append('transaction_date', data.transactionDate)
    formData.append('description', data.description)
    formData.append('amount', data.amount)
    formData.append('paid_status', data.paidStatus)
    formData.append('due_date', data.dueDate)
    formData.append('amount_paid', data.amountPaid)
    formData.append('bank_account_id', data.bankAccount)
    formData.append('account_chart_id', data.account)
    if (data.reference) formData.append('reference', data.reference)

    // Log the headers being sent
    const headers = {
      Authorization: `Bearer ${session.user.access_token}`,
      Accept: 'application/json',
    }
    console.log('6. Request headers:', headers)
    console.log('7. API URL:', LEDGER_ENTRY_API_URL)

    const response = await fetch(`${LEDGER_ENTRY_API_URL}`, {
      method: 'POST',
      headers,
      body: formData,
    })

    console.log('8. Response status:', response.status)
    console.log('9. Response ok:', response.ok)

    if (!response.ok) {
      const errorData = await response.json()
      console.log('10. Error response data:', errorData)
      throw new Error(
        errorData.message ||
          `HTTP ${response.status}: Failed to submit ledger entry`
      )
    }

    const responseData = await response.json()
    console.log('11. Success response data:', responseData)
    return responseData
  } catch (error) {
    console.error('12. Submit ledger entry error:', error)
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    )
  }
}

export const fetchBookkeepingLedgers = async () => {
  const session = await getSession()

  try {
    const response = await fetch(BOOKKEEPING_LEDGER_API_URL, {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
        Accept: 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch bookkeeping ledgers')
    }

    return {
      success: true,
      data: data.data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export async function fetchBankAccounts() {
  try {
    const session = await getSession()
    if (!session?.user?.access_token) {
      throw new Error('Authentication required')
    }

    const response = await fetch(BANK_ACCOUNTS_API_URL, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session.user.access_token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch bank accounts')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching bank accounts:', error)
    throw error
  }
}

import { getSession } from 'next-auth/react'
import { RECONCILE_API_URL } from '@/lib/apiEndpoints'
import { save_reconcilation_id } from './reconcilation-server'

export async function reconcileFiles(bankFiles: File[], ledgerFiles: File[]) {
  const formData = new FormData()
  bankFiles.forEach((file) => formData.append('bank_statements[]', file))
  ledgerFiles.forEach((file) => formData.append('ledgers[]', file))
  const data = await getSession()
  const token = data?.user.access_token
  const headers: HeadersInit = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await fetch(RECONCILE_API_URL, {
      method: 'POST',
      headers,
      body: formData,
    })
    const data = await response.json()
    console.log('Reconciliation response:', data)
    await save_reconcilation_id(data.data.reconciliation_id)

    if (response.status === 429) {
      return {
        status: 'error',
        code: 429,
        message:
          'Maximum number of requests reached. Please login to continue.',
      }
    }

    if (response.status === 408) {
      return {
        status: 'error',
        code: 408,
        message: 'File processing took too long. Please try again later.',
      }
    }

    if (!response.ok) {
      return {
        status: 'error',
        code: response.status,
        message: data.message || 'Reconciliation failed',
      }
    }

    return {
      status: 'success',
      data: data,
    }
  } catch (error) {
    console.error('Reconciliation error:', error)
    return {
      status: 'error',
      code: 500,
      message: 'An unexpected error occurred',
    }
  }
}

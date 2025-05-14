import { getSession } from 'next-auth/react'
import { RECONCILE_API_URL, RECONCILIATION_API_URL, RECONCILIATION_RESULT_API_URL } from '@/lib/apiEndpoints'
import { save_reconcilation_id } from './reconcilation-server'
import { BankStatementData } from '@/store/reconciliation-store'
import { withAuth } from '@/lib/fetch-utils'

export async function reconcileFiles(bankFiles: BankStatementData[], ledgerFiles: string[], title: string) {
  const formData = new FormData()
  bankFiles.forEach((stmt, index) => {
    formData.append(`bank_statements[${index}][file]`, stmt.file as File);
    formData.append(`bank_statements[${index}][bank_account]`, stmt.bankAccount);
    formData.append(`bank_statements[${index}][period][from]`, stmt.period.from);
    formData.append(`bank_statements[${index}][period][to]`, stmt.period.to);
    formData.append(`bank_statements[${index}][mapper][date]`, stmt.mapper?.date as string);
    formData.append(`bank_statements[${index}][mapper][description]`, stmt.mapper?.description as string);
    formData.append(`bank_statements[${index}][mapper][amount]`, stmt.mapper?.amount as string);
  })
  ledgerFiles.forEach((file) => formData.append('ledgers[]', file));
  formData.append('title', title);
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

export async function createRecon(title: string) {
  const sesh = await getSession()
  const token = sesh?.user.access_token
  const headers = {
    'Content-Type': 'application/json',
    ...withAuth(token as string)
  }
  const data = {
    "title": title,
  }

  try {
    const response = await fetch(RECONCILIATION_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    const res = await response.json();

    if (res.status == 'success') {
      return {
        status: 'success',
        code: res.status_code,
        data: res.data,
      }
    } else {
      throw new Error(res.message);
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

export async function addLedgers(ledgers: string[], reconciliation_id: string) {
  const sesh = await getSession()
  const token = sesh?.user.access_token
  const headers = {
    'Content-Type': 'application/json',
    ...withAuth(token as string)
  }
  const data = {
    "ledgers": ledgers,
  }

  try {
    const response = await fetch(`${RECONCILIATION_RESULT_API_URL}${reconciliation_id}/ledgers`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    const res = await response.json();

    if (res.status == 'success') {
      return {
        status: 'success',
        data: res.data,
      }
    } else {
      throw new Error(res.message);
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

export async function saveDraft(step: number, reconciliation_id: string) {
  const sesh = await getSession()
  const token = sesh?.user.access_token
  const headers = {
    'Content-Type': 'application/json',
    ...withAuth(token as string)
  }
  const data = {
    "step": step,
  }

  try {
    const response = await fetch(`${RECONCILIATION_RESULT_API_URL}${reconciliation_id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    const res = await response.json();

    if (res.status == 'success') {
      return {
        status: 'success',
        data: res.data,
      }
    } else {
      throw new Error(res.message);
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

export async function addStatements(bank_statements: BankStatementData[], reconciliation_id: string) {
  const sesh = await getSession()
  const token = sesh?.user.access_token
  const headers = {
    ...withAuth(token as string)
  }
  const formData = new FormData()
  bank_statements.forEach((stmt, index) => {
    formData.append(`bank_statements[${index}]file`, stmt.file as File);
    formData.append(`bank_statements[${index}]bank_account`, stmt.bankAccount);
    formData.append(`bank_statements[${index}][period][from]`, stmt.period.from);
    formData.append(`bank_statements[${index}][period][to]`, stmt.period.to);
    formData.append(`bank_statements[${index}][mapper][date]`, stmt.mapper?.date as string);
    formData.append(`bank_statements[${index}][mapper][description]`, stmt.mapper?.description as string);
    formData.append(`bank_statements[${index}][mapper][amount]`, stmt.mapper?.amount as string);
  })

  try {
    const response = await fetch(`${RECONCILIATION_RESULT_API_URL}${reconciliation_id}/statements`, {
      method: 'POST',
      headers,
      body: formData,
    });
    const res = await response.json();

    if (res.status == 'success') {
      return {
        status: 'success',
        data: res.data,
      }
    } else {
      throw new Error(res.message);
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

export async function startReconciliation(reconciliation_id: string) {
  const sesh = await getSession();
  const token = sesh?.user.access_token;
  const headers = {
    'Content-Type': 'application/json',
    ...withAuth(token as string)
  };

  try {
    const response = await fetch(`${RECONCILIATION_RESULT_API_URL}${reconciliation_id}/start`, {
      method: 'POST',
      headers,
    });
    const res = await response.json();

    if (res.status === 'success') {
      return {
        status: 'success',
        data: res.data,
      };
    } else {
      throw new Error(res.message || 'Failed to start reconciliation');
    }
  } catch (error) {
    console.error('Start reconciliation error:', error);
    return {
      status: 'error',
      code: 500,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
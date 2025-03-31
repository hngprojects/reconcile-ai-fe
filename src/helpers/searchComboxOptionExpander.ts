import { Option } from '../components/reconciliation/quickFind/types'
import { FrontendTransaction } from '../types/frontendResponseTypes'

export interface TransactionOption extends Option, FrontendTransaction {}

export function addValueAndLabel(
  transactions: FrontendTransaction[]
): TransactionOption[] {
  return transactions?.map((transaction) => {
    // Ensure amount is always a string
    const amountString = String(transaction.amount)

    // Construct the label
    const label = `${transaction.date} - ${transaction.description}'s School fees - ${amountString}`

    return {
      ...transaction,
      value: transaction.id,
      label: label,
    }
  })
}

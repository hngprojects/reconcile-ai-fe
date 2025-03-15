import { Option } from "../components/quickFind/types";
import { Transaction } from "../types/frontendResponseTypes";

export interface TransactionOption extends Option, Transaction {}

export function addValueAndLabel(
  transactions: Transaction[]
): TransactionOption[] {
  return transactions?.map((transaction) => {
    // Ensure amount is always a string
    const amountString = String(transaction.amount);

    // Construct the label
    const label = `${transaction.date} - ${transaction.description}'s School fees - ${amountString}`;

    return {
      ...transaction,
      value: transaction.id,
      label: label,
    };
  });
}

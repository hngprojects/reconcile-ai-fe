import {
  Matched,
  ResponseData,
  Transaction as BackendTransaction,
} from "../types/backendResponseTypes copy";
import { ReconciliationResponse } from "../types/frontendResponseTypes copy";

export const revertToBackendFormat = (
  frontendData: ReconciliationResponse
): ResponseData => {
  const matches: Matched[] = [];
  const unmatched_file1: BackendTransaction[] = [];
  const unmatched_file2: BackendTransaction[] = [];

  frontendData.reconciliation_data?.forEach((row) => {
    if (row.bank_txn && row.ledger_txn) {
      // Matched transaction
      matches.push({
        file1_transaction: {
          Date: row.bank_txn.date,
          Description: row.bank_txn.description,
          Amount: row.bank_txn.amount,
        },
        file2_transaction: {
          Date: row.ledger_txn.date,
          Description: row.ledger_txn.description,
          Amount: row.ledger_txn.amount,
        },
        score: 100, // Defaulting to 100, can be adjusted based on logic
      });
    } else if (row.bank_txn) {
      // Unmatched bank transaction
      unmatched_file1.push({
        Date: row.bank_txn.date,
        Description: row.bank_txn.description,
        Amount: row.bank_txn.amount,
      });
    } else if (row.ledger_txn) {
      // Unmatched ledger transaction
      unmatched_file2.push({
        Date: row.ledger_txn.date,
        Description: row.ledger_txn.description,
        Amount: row.ledger_txn.amount,
      });
    }
  });

  return {
    reconciliation_id: frontendData.reconciliation_id,
    matches,
    only_in_file1: unmatched_file1,
    only_in_file2: unmatched_file2,
    unmatched: {
      unmatched_file1,
      unmatched_file2,
    },
    // matchSummary: {
    //   totalMatched: matches.length,
    //   totalUnmatched: unmatched_file1.length + unmatched_file2.length,
    // },
  };
};

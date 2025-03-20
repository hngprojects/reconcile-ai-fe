import type {
  Matched,
  ResponseData,
  Transaction as backendTransaction,
} from "../types/backendResponseTypes copy";
import {
  ReconciliationResponse,
  ReconciliationItem,
  Transaction,
} from "../types/frontendResponseTypes copy";

export const transformReconciliationData = (
  backendData: ResponseData
): ReconciliationResponse => {
  const reconciliation_id = backendData.reconciliation_id;
  const reconciliation_data: ReconciliationItem[] = [];
  const unmatched_bank_transactions: Transaction[] = [];
  const unmatched_ledger_transactions: Transaction[] = [];

  let reconciliationCounter = Date.now(); // Start with a timestamp

  // Processing matched transactions
  backendData.matches.forEach((match: Matched, index: number) => {
    reconciliation_data.push({
      reconciliation_pair_id: (reconciliationCounter++).toString(),
      bank_txn: {
        id: `bank_txn_${index + 1}`,
        date: match.file1_transaction.Date,
        description: match.file1_transaction.Description,
        amount: match.file1_transaction.Amount,
      },
      ledger_txn: {
        id: `ledger_txn_${index + 1}`,
        date: match.file2_transaction.Date,
        description: match.file2_transaction.Description,
        amount: match.file2_transaction.Amount,
      },
      matched: true,
      match_score: 100,
    });
  });

  // Processing unmatched bank transactions
  backendData.unmatched.unmatched_file1.forEach(
    (txn: backendTransaction, index: number) => {
      const bankTxn: Transaction = {
        id: `bank_txn_unmatched_${index + 1}`,
        date: txn.Date,
        description: txn.Description,
        amount: txn.Amount,
      };

      reconciliation_data.push({
        reconciliation_pair_id: (reconciliationCounter++).toString(),
        bank_txn: bankTxn,
        ledger_txn: null,
        matched: false,
        match_score: 0,
      });

      unmatched_bank_transactions.push(bankTxn);
    }
  );

  // Processing unmatched ledger transactions
  backendData.unmatched.unmatched_file2.forEach(
    (txn: backendTransaction, index: number) => {
      const ledgerTxn: Transaction = {
        id: `ledger_txn_unmatched_${index + 1}`,
        date: txn.Date,
        description: txn.Description,
        amount: txn.Amount,
      };

      reconciliation_data.push({
        reconciliation_pair_id: (reconciliationCounter++).toString(),
        bank_txn: null,
        ledger_txn: ledgerTxn,
        matched: false,
        match_score: 0,
      });

      unmatched_ledger_transactions.push(ledgerTxn);
    }
  );

  // Constructing summary
  const summary = {
    total_bank_transactions:
      backendData.matches.length + backendData.unmatched.unmatched_file1.length,
    total_ledger_transactions:
      backendData.matches.length + backendData.unmatched.unmatched_file2.length,
    total_matched: backendData.matches.length,
    total_unmatched:
      backendData.unmatched.unmatched_file1.length +
      backendData.unmatched.unmatched_file2.length,
    auto_matched: backendData.matches.length, // Assuming all matches are auto-matched
    manual_review_needed:
      backendData.unmatched.unmatched_file1.length +
      backendData.unmatched.unmatched_file2.length,
  };

  return {
    reconciliation_id,
    reconciliation_data,
    unmatched_bank_transactions,
    unmatched_ledger_transactions,
    summary,
  };
};

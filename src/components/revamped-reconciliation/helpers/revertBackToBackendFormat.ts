import {
  BackendTransaction,
  LedgerMatch,
  Matched,
  StatementMatch,
  UpdateResponseData,
} from "../types/backendResponseTypes";
import { ReconciliationResponse } from "../types/frontendResponseTypes";

export const revertToBackendFormat = (
  frontendData: ReconciliationResponse
): UpdateResponseData => {
  const reconciliation_id = frontendData.reconciliation_id;
  const matches: Matched[] = [];
  const unmatched_ledgers: BackendTransaction[] = [];
  const unmatched_statements: BackendTransaction[] = [];

  // Process the reconciliation data to rebuild matches and unmatched items
  frontendData.reconciliation_data.forEach((item) => {
    // Handle matched items
    if (item.matched) {
      const statements: StatementMatch[] =
        item.statements?.map((stmt) => ({
          statement: {
            Date: stmt.bank_txn.date,
            Description: stmt.bank_txn.description,
            Amount: String(stmt.bank_txn.amount), // Ensure amount is a string
          },
          score: stmt.score,
        })) || [];

      const ledgers: LedgerMatch[] =
        item.ledgers?.map((ldgr) => ({
          ledger: {
            Date: ldgr.ledger_txn.date,
            Description: ldgr.ledger_txn.description,
            Amount: String(ldgr.ledger_txn.amount), // Ensure amount is a string
          },
          score: ldgr.score,
        })) || [];

      matches.push({
        statements,
        ledgers,
      });
    }
    // Handle unmatched statement items
    else if (item.statements && !item.ledgers) {
      item.statements.forEach((stmt) => {
        unmatched_statements.push({
          Date: stmt.bank_txn.date,
          Description: stmt.bank_txn.description,
          Amount: String(stmt.bank_txn.amount),
        });
      });
    }
    // Handle unmatched ledger items
    else if (item.ledgers && !item.statements) {
      item.ledgers.forEach((ldgr) => {
        unmatched_ledgers.push({
          Date: ldgr.ledger_txn.date,
          Description: ldgr.ledger_txn.description,
          Amount: String(ldgr.ledger_txn.amount),
        });
      });
    }
  });

  // Use the summary directly from frontend data
  const summary = {
    totalMatched: frontendData.summary.total_matched,
    totalUnmatched: frontendData.summary.total_unmatched,
    total: frontendData.summary.total,
  };

  return {
    reconciliation_id,
    matches,
    unmatched_ledgers,
    unmatched_statements,
    summary,
  };
};

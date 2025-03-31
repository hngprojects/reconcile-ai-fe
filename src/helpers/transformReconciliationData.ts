import {
  BackendTransaction,
  Matched,
  UpdateResponseData,
} from '../types/backendResponseTypes'
import {
  FrontendTransaction,
  LedgerWithScore,
  ReconciliationItem,
  ReconciliationResponse,
  StatementWithScore,
} from '../types/frontendResponseTypes'

export const transformReconciliationData = (
  backendData: UpdateResponseData
): ReconciliationResponse => {
  const reconciliation_id = backendData.reconciliation_id
  const reconciliation_data: ReconciliationItem[] = []
  const unmatched_bank_transactions: FrontendTransaction[] = []
  const unmatched_ledger_transactions: FrontendTransaction[] = []

  let reconciliationCounter = Date.now() // Start with a timestamp as base for IDs

  // Process matched transactions
  backendData.matches.forEach((match: Matched) => {
    const statements: StatementWithScore[] = match.statements.map((stmt) => {
      return {
        bank_txn: {
          id: stmt.statement.id,
          date: stmt.statement.Date,
          description: stmt.statement.Description,
          amount: stmt.statement.Amount,
        },
        score: stmt.score,
      }
    })

    const ledgers: LedgerWithScore[] = match.ledgers.map((ldgr) => {
      return {
        ledger_txn: {
          id: ldgr.ledger.id,
          date: ldgr.ledger.Date,
          description: ldgr.ledger.Description,
          amount: ldgr.ledger.Amount,
        },
        score: ldgr.score,
      }
    })

    reconciliation_data.push({
      reconciliation_pair_id: (reconciliationCounter++).toString(),
      statements: statements.length > 0 ? statements : null,
      ledgers: ledgers.length > 0 ? ledgers : null,
      matched: true,
    })
  })

  // Process unmatched bank transactions (statements)
  backendData.unmatched_statements.forEach((stmt: BackendTransaction) => {
    const bankTxn: FrontendTransaction = {
      id: stmt.id,
      date: stmt.Date,
      description: stmt.Description,
      amount: stmt.Amount,
    }

    unmatched_bank_transactions.push(bankTxn)

    reconciliation_data.push({
      reconciliation_pair_id: (reconciliationCounter++).toString(),
      statements: [
        {
          bank_txn: bankTxn,
          score: '0',
        },
      ],
      ledgers: null,
      matched: false,
    })
  })

  // Process unmatched ledger transactions
  backendData.unmatched_ledgers.forEach((ldgr: BackendTransaction) => {
    const ledgerTxn: FrontendTransaction = {
      id: ldgr.id,
      date: ldgr.Date,
      description: ldgr.Description,
      amount: ldgr.Amount,
    }

    unmatched_ledger_transactions.push(ledgerTxn)

    reconciliation_data.push({
      reconciliation_pair_id: (reconciliationCounter++).toString(),
      statements: null,
      ledgers: [
        {
          ledger_txn: ledgerTxn,
          score: '0',
        },
      ],
      matched: false,
    })
  })

  // Return the transformed data with the summary directly from backend
  return {
    reconciliation_id,
    reconciliation_data,
    unmatched_bank_transactions,
    unmatched_ledger_transactions,
    summary: {
      total_matched: backendData.summary.totalMatched,
      total_unmatched: backendData.summary.totalUnmatched,
      total: backendData.summary.total,
    },
  }
}

// export const transformReconciliationData = (
//   backendData: UpdateResponseData
// ): ReconciliationResponse => {
//   const reconciliation_id = backendData.reconciliation_id;
//   const reconciliation_data: ReconciliationItem[] = [];
//   const unmatched_bank_transactions: FrontendTransaction[] = [];
//   const unmatched_ledger_transactions: FrontendTransaction[] = [];

//   let reconciliationCounter = Date.now(); // Start with a timestamp as base for IDs

//   // Process matched transactions
//   backendData.matches.forEach((match: Matched) => {
//     const statements: FrontendTransaction[] = match?.statements?.map((stmt) => {
//       return {
//         bank_txn: {
//           id: stmt.statement.id,
//           date: stmt.statement.Date,
//           description: stmt.statement.Description,
//           amount: stmt.statement.Amount,
//         },
//         score: stmt.score,
//       };
//     });

//     const ledgers: FrontendTransaction[] = match?.ledgers?.map((ldgr) => {
//       return {
//         ledger_txn: {
//           id: ldgr.ledger.id,
//           date: ldgr.ledger.Date,
//           description: ldgr.ledger.Description,
//           amount: ldgr.ledger.Amount,
//         },
//         score: ldgr.score,
//       };
//     });

//     reconciliation_data.push({
//       reconciliation_pair_id: (reconciliationCounter++).toString(),
//       statements: statements.length > 0 ? statements : null,
//       ledgers: ledgers.length > 0 ? ledgers : null,
//       matched: true,
//     });
//   });

//   // Process unmatched bank transactions (statements)
//   backendData?.unmatched_statements?.forEach((stmt: BackendTransaction) => {
//     const bankTxn: FrontendTransaction = {
//       id: stmt.id,
//       date: stmt.Date,
//       description: stmt.Description,
//       amount: stmt.Amount,
//     };

//     unmatched_bank_transactions.push(bankTxn);

//     reconciliation_data.push({
//       reconciliation_pair_id: (reconciliationCounter++).toString(),
//       statements: [
//         {
//           bank_txn: bankTxn,
//           score: "0",
//         },
//       ],
//       ledgers: null,
//       matched: false,
//     });
//   });

//   // Process unmatched ledger transactions
//   backendData?.unmatched_ledgers?.forEach((ldgr: BackendTransaction) => {
//     const ledgerTxn: FrontendTransaction = {
//       id: ldgr.id,
//       date: ldgr.Date,
//       description: ldgr.Description,
//       amount: ldgr.Amount,
//     };

//     unmatched_ledger_transactions.push(ledgerTxn);

//     reconciliation_data.push({
//       reconciliation_pair_id: (reconciliationCounter++).toString(),
//       statements: null,
//       ledgers: [
//         {
//           ledger_txn: ledgerTxn,
//           score: "0",
//         },
//       ],
//       matched: false,
//     });
//   });

//   // Return the transformed data with the summary directly from backend
//   return {
//     reconciliation_id,
//     reconciliation_data,
//     unmatched_bank_transactions,
//     unmatched_ledger_transactions,
//     summary: {
//       total_matched: backendData.summary.totalMatched,
//       total_unmatched: backendData.summary.totalUnmatched,
//       total: backendData.summary.total,
//     },
//   };
// };

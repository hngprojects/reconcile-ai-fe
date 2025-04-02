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

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   FrontendTransaction,
//   LedgerWithScore,
//   ReconciliationItem,
//   ReconciliationResponse,
//   StatementWithScore,
// } from '../types/frontendResponseTypes'

// export const transformReconciliationData = (
//   backendData: UpdateResponseData
// ): ReconciliationResponse => {
//   const reconciliation_id = backendData.reconciliation_id
//   const reconciliation_data: ReconciliationItem[] = []
//   const unmatched_bank_transactions: FrontendTransaction[] = []
//   const unmatched_ledger_transactions: FrontendTransaction[] = []

//   let reconciliationCounter = Date.now() // Start with a timestamp as base for IDs

//   // Process matched transactions
//   backendData.matches.forEach((match: Matched) => {
//     const statements: StatementWithScore[] = match.statements.map((stmt) => {
//       return {
//         bank_txn: {
//           id: stmt.statement.id,
//           date: stmt.statement.Date,
//           description: stmt.statement.Description,
//           amount: stmt.statement.Amount,
//         },
//         score: stmt.score,
//       }
//     })

//     const ledgers: LedgerWithScore[] = match.ledgers.map((ldgr) => {
//       return {
//         ledger_txn: {
//           id: ldgr.ledger.id,
//           date: ldgr.ledger.Date,
//           description: ldgr.ledger.Description,
//           amount: ldgr.ledger.Amount,
//         },
//         score: ldgr.score,
//       }
//     })

//     reconciliation_data.push({
//       reconciliation_pair_id: (reconciliationCounter++).toString(),
//       statements: statements.length > 0 ? statements : null,
//       ledgers: ledgers.length > 0 ? ledgers : null,
//       matched: true,
//     })
//   })

//   // Process unmatched bank transactions (statements)
//   backendData.unmatched_statements.forEach((stmt: BackendTransaction) => {
//     const bankTxn: FrontendTransaction = {
//       id: stmt.id,
//       date: stmt.Date,
//       description: stmt.Description,
//       amount: stmt.Amount,
//     }

//     unmatched_bank_transactions.push(bankTxn)

//     reconciliation_data.push({
//       reconciliation_pair_id: (reconciliationCounter++).toString(),
//       statements: [
//         {
//           bank_txn: bankTxn,
//           score: '0',
//         },
//       ],
//       ledgers: null,
//       matched: false,
//     })
//   })

//   // Process unmatched ledger transactions
//   backendData.unmatched_ledgers.forEach((ldgr: BackendTransaction) => {
//     const ledgerTxn: FrontendTransaction = {
//       id: ldgr.id,
//       date: ldgr.Date,
//       description: ldgr.Description,
//       amount: ldgr.Amount,
//     }

//     unmatched_ledger_transactions.push(ledgerTxn)

//     reconciliation_data.push({
//       reconciliation_pair_id: (reconciliationCounter++).toString(),
//       statements: null,
//       ledgers: [
//         {
//           ledger_txn: ledgerTxn,
//           score: '0',
//         },
//       ],
//       matched: false,
//     })
//   })

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
//   }
// }

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

// /**
//  * Transforms raw reconciliation data from the API into the frontend data structure
//  * @param data The raw data from the API
//  * @returns Transformed data in the frontend format
//  */
// export function transformReconciliationData(data: any): ReconciliationResponse {
//   if (!data) {
//     return {
//       reconciliation_id: "",
//       reconciliation_data: [],
//       unmatched_bank_transactions: [],
//       unmatched_ledger_transactions: [],
//       summary: {
//         total_matched: 0,
//         total_unmatched: 0,
//         total: 0,
//       },
//     }
//   }

//   const jsonData = data

//   const reconciliationData: ReconciliationItem[] = (jsonData.matches || []).map((match: any, index: number) => {
//     const statements: StatementWithScore[] | null = match.statements
//       ? match.statements.map((statementData: any) => {
//         const statement = statementData.statement
//         return {
//           bank_txn: {
//             id: statement.id,
//             date: statement.Date,
//             description: statement.Description,
//             amount: statement.Amount,
//           },
//           score: statementData.score.toString(),
//         }
//       })
//       : null

//     const ledgers: LedgerWithScore[] | null = match.ledgers
//       ? match.ledgers.map((ledgerData: any) => {
//         const ledger = ledgerData.ledger
//         return {
//           ledger_txn: {
//             id: ledger.id,
//             date: ledger.Date,
//             description: ledger.Description,
//             amount: ledger.Amount,
//           },
//           score: ledgerData.score.toString(),
//         }
//       })
//       : null

//     return {
//       reconciliation_pair_id: `pair-${index}-${Date.now()}`,
//       statements,
//       ledgers,
//       matched: true,
//     }
//   })

//   const unmatchedBankTransactions: FrontendTransaction[] = (jsonData.unmatched_statements || []).map(
//     (statement: any) => ({
//       id: statement.id,
//       date: statement.Date,
//       description: statement.Description,
//       amount: statement.Amount,
//     }),
//   )

//   // Transform unmatched ledger transactions
//   const unmatchedLedgerTransactions: FrontendTransaction[] = (jsonData.unmatched_ledgers || []).map((ledger: any) => ({
//     id: ledger.id,
//     date: ledger.Date,
//     description: ledger.Description,
//     amount: ledger.Amount,
//   }))

//   // Create summary
//   const summary = {
//     total_matched: jsonData.summary?.totalMatched || 0,
//     total_unmatched: jsonData.summary?.totalUnmatched || 0,
//     total: jsonData.summary?.total || 0,
//   }

//   return {
//     reconciliation_id: jsonData.reconciliation_id || "",
//     reconciliation_data: reconciliationData,
//     unmatched_bank_transactions: unmatchedBankTransactions,
//     unmatched_ledger_transactions: unmatchedLedgerTransactions,
//     summary,
//   }
// }

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

/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useParams } from 'next/navigation'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
  // useTransition,
} from 'react'
import { ColumnFiltersState } from '@tanstack/react-table'
import {
  ReconciliationItem,
  ReconciliationResponse,
  FrontendTransaction,
} from '../types/frontendResponseTypes'
import { updateReconciliation, fetchReconciliation } from '@/lib/api'
import { ManualRequestBody } from '@/types/reconciliation'
import { toast } from 'sonner'
import { transformReconciliationData } from '../helpers/transformReconciliationData'
import { useSession } from 'next-auth/react'
// import { useReconcilationsById } from '@/app/queries'

interface ReconciliationContextProps {
  data: ReconciliationResponse
  paginatedData: ReconciliationItem[]
  unmatchedBankTransactions: FrontendTransaction[]
  unmatchedLedgerTransactions: FrontendTransaction[]

  // Pagination
  pagination: { pageIndex: number; pageSize: number }
  totalItems: number
  totalPages: number
  setPagination: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >

  // Table state
  columnFilters: ColumnFiltersState
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>

  // Actions
  handleMatch: (
    bankTransaction: FrontendTransaction[],
    ledgerTransaction: FrontendTransaction[]
  ) => Promise<void>
  canPreviousPage: boolean
  canNextPage: boolean
  onPreviousPage: () => void
  onNextPage: () => void
  onRowsPerPageChange: (size: number) => void
  handleSearch: (query: string) => void
  handleUnlink: (
    bankTransaction: FrontendTransaction[],
    ledgerTransaction: FrontendTransaction[]
  ) => Promise<void>

  // Modals
  showUnlinkModal: boolean
  setShowUnlinkModal: React.Dispatch<React.SetStateAction<boolean>>
  showUnlinkModalMobile: boolean
  setShowUnlinkModalMobile: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isMatching: boolean
  setIsMatching: React.Dispatch<React.SetStateAction<boolean>>

  //Unlink Data
  selectedRow: ReconciliationItem | null
  setSelectedRow: React.Dispatch<
    React.SetStateAction<ReconciliationItem | null>
  >
  loading: boolean
}

const ReconciliationContext = createContext<
  ReconciliationContextProps | undefined
>(undefined)

export function ReconciliationProvider({ children }: { children: ReactNode }) {
  const [isMatching, setIsMatching] = useState(false)
  const [showUnlinkModal, setShowUnlinkModal] = useState(false)
  const [showUnlinkModalMobile, setShowUnlinkModalMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [data, setData] = useState<ReconciliationResponse>(
    {} as ReconciliationResponse
  )
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRow, setSelectedRow] = useState<ReconciliationItem | null>(
    null
  )
  // const [loading, startTrac] = useTransition()
  const [loading, setLoading] = useState(true)
  const param = useParams()
  const { id } = param
  // const { data: RE } = useReconcilationsById(id as string)

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchReconciliation(id as string)

        if (response.success) {
          const reconciliationData = transformReconciliationData(response.data)
          setData(reconciliationData)

          setLoading(false)
        } else {
          setLoading(false)
        }
      } catch (e) {
        console.error('Error: ', e)
        setLoading(false)
      }
    }
    fetch()
  }, [])

  // useEffect(() => {
  //   if (RE) {
  //     const reconciliationData = transformReconciliationData(RE)
  //     setData(reconciliationData)
  //   }
  // }, [])

  const reconciliationData = useMemo(
    () => data.reconciliation_data ?? [],
    [data]
  )

  const paginatedData = useMemo(() => {
    return reconciliationData.slice(
      pagination.pageIndex * pagination.pageSize,
      (pagination.pageIndex + 1) * pagination.pageSize
    )
  }, [reconciliationData, pagination.pageIndex, pagination.pageSize])

  const totalItems = reconciliationData.length
  const totalPages = Math.ceil(totalItems / pagination.pageSize)
  const canPreviousPage = pagination.pageIndex > 0
  const canNextPage = pagination.pageIndex < totalPages - 1

  const onPreviousPage = () =>
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }))
  const onNextPage = () =>
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))
  const onRowsPerPageChange = (size: number) =>
    setPagination({ pageSize: size, pageIndex: 0 })

  const handleSearch = (query: string) => setSearchQuery(query)

  const handleMatch = async (
    bankTransactions: FrontendTransaction[],
    ledgerTransactions: FrontendTransaction[]
  ) => {
    const body = {
      ledgers: ledgerTransactions.map(
        (ledgerTransaction) => ledgerTransaction.id
      ),
      statements: bankTransactions.map((bankTransaction) => bankTransaction.id),
      action: 'match',
    }

    setIsMatching(true)
    try {
      const reconciliationId = data.reconciliation_id
      const response = await updateReconciliation(
        reconciliationId,
        body as ManualRequestBody
      )

      if (response?.status !== 'success') {
        toast.error('Failed to match transactions')
        return
      }

      // Transform and update data
      const reconciliationData = transformReconciliationData(response?.data)
      localStorage.setItem('reconciliation', JSON.stringify(reconciliationData))
      setData(reconciliationData)

      toast.success('Transactions matched successfully!')
    } catch {
      toast.error('Failed to match transactions')
    } finally {
      setIsMatching(false)
    }
  }

  const handleUnlink = async (
    bankTransactions: FrontendTransaction[],
    ledgerTransactions: FrontendTransaction[]
  ) => {
    const body = {
      ledgers: ledgerTransactions.map(
        (ledgerTransaction) => ledgerTransaction.id
      ),
      statements: bankTransactions.map((bankTransaction) => bankTransaction.id),
      action: 'unmatch',
    }

    setIsLoading(true)
    try {
      const reconciliationId = data.reconciliation_id
      const response = await updateReconciliation(
        reconciliationId,
        body as ManualRequestBody
      )
      console.log(response)

      if (response?.status != 'success') {
        toast.error('Failed to unlink transactions')
        return
      }

      // Transform and update data
      const reconciliationData = transformReconciliationData(response.data)
      localStorage.setItem('reconciliation', JSON.stringify(reconciliationData))
      setData(reconciliationData)

      toast.success('Transactions unlinked successfully!')
    } catch {
      toast.error('Failed to unlink transactions')
    } finally {
      setShowUnlinkModal(false)
      setShowUnlinkModalMobile(false)
      setIsLoading(false)
    }
  }

  return (
    <ReconciliationContext.Provider
      value={{
        data,
        paginatedData,
        unmatchedBankTransactions: data.unmatched_bank_transactions ?? [],
        unmatchedLedgerTransactions: data.unmatched_ledger_transactions ?? [],

        // Pagination
        pagination,
        totalItems,
        totalPages,
        setPagination,

        // Table state
        columnFilters,
        setColumnFilters,
        searchQuery,
        setSearchQuery,

        // Actions
        handleMatch,
        canPreviousPage,
        canNextPage,
        onPreviousPage,
        onNextPage,
        onRowsPerPageChange,
        handleSearch,
        handleUnlink,

        // modal state
        showUnlinkModal,
        setShowUnlinkModal,
        showUnlinkModalMobile,
        setShowUnlinkModalMobile,
        isLoading,
        setIsLoading,
        isMatching,
        setIsMatching,

        // Unlink data
        selectedRow,
        setSelectedRow,
        loading,
      }}
    >
      {children}
    </ReconciliationContext.Provider>
  )
}

// Add plan to the context
export const useReconciliation = () => {
  const context = useContext(ReconciliationContext)
  const { data } = useSession()

  if (!context) {
    throw new Error(
      'useReconciliation must be used within a ReconciliationProvider'
    )
  }

  const getUserPlan = (plan: string | undefined) => {
    switch (plan) {
      case 'Starter':
        return 'starter'
      case 'Business':
        return 'business'
      default:
        return 'basic'
    }
  }

  const userPlan = getUserPlan(data?.plan?.plan.plan)

  return {
    ...context,
    userPlan,
  }
}

// 'use client'

// import { useParams } from 'next/navigation'
// import type React from 'react'
// import {
//   createContext,
//   type ReactNode,
//   useContext,
//   useMemo,
//   useState,
// } from 'react'
// import type { ColumnFiltersState } from '@tanstack/react-table'
// import type {
//   ReconciliationItem,
//   ReconciliationResponse,
//   FrontendTransaction,
// } from '../types/frontendResponseTypes'
// import { updateReconciliation } from '@/lib/api'
// import type { ManualRequestBody } from '@/types/reconciliation'
// import { toast } from 'sonner'
// import { transformReconciliationData } from '../helpers/transformReconciliationData'
// import { useSession } from 'next-auth/react'
// import { useReconcilationsById } from '@/app/queries'
// import type { UpdateResponseData } from '@/types/backendResponseTypes'

// // Define context interface
// interface ReconciliationContextProps {
//   // Data
//   data: ReconciliationResponse
//   paginatedData: ReconciliationItem[]
//   unmatchedBankTransactions: FrontendTransaction[]
//   unmatchedLedgerTransactions: FrontendTransaction[]

//   // Pagination
//   pagination: { pageIndex: number; pageSize: number }
//   totalItems: number
//   totalPages: number
//   setPagination: React.Dispatch<
//     React.SetStateAction<{ pageIndex: number; pageSize: number }>
//   >

//   // Table state
//   columnFilters: ColumnFiltersState
//   setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
//   searchQuery: string
//   setSearchQuery: React.Dispatch<React.SetStateAction<string>>

//   // Actions
//   handleMatch: (
//     bankTransaction: FrontendTransaction[],
//     ledgerTransaction: FrontendTransaction[]
//   ) => Promise<void>
//   handleUnlink: (
//     bankTransaction: FrontendTransaction[],
//     ledgerTransaction: FrontendTransaction[]
//   ) => Promise<void>

//   // Pagination actions
//   canPreviousPage: boolean
//   canNextPage: boolean
//   onPreviousPage: () => void
//   onNextPage: () => void
//   onRowsPerPageChange: (size: number) => void
//   handleSearch: (query: string) => void

//   // Modal state
//   showUnlinkModal: boolean
//   setShowUnlinkModal: React.Dispatch<React.SetStateAction<boolean>>
//   showUnlinkModalMobile: boolean
//   setShowUnlinkModalMobile: React.Dispatch<React.SetStateAction<boolean>>
//   isLoading: boolean
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
//   isMatching: boolean
//   setIsMatching: React.Dispatch<React.SetStateAction<boolean>>

//   // Selected row data
//   selectedRow: ReconciliationItem | null
//   setSelectedRow: React.Dispatch<
//     React.SetStateAction<ReconciliationItem | null>
//   >
// }

// // Create context
// const ReconciliationContext = createContext<
//   ReconciliationContextProps | undefined
// >(undefined)

// export function ReconciliationProvider({ children }: { children: ReactNode }) {
//   // State management
//   const [isMatching, setIsMatching] = useState(false)
//   const [showUnlinkModal, setShowUnlinkModal] = useState(false)
//   const [showUnlinkModalMobile, setShowUnlinkModalMobile] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedRow, setSelectedRow] = useState<ReconciliationItem | null>(
//     null
//   )

//   const param = useParams()
//   const { id } = param

//   const { data: res, refetch } = useReconcilationsById(id as string)
//   const data = res && transformReconciliationData(res)

//   console.log({ data })

//   const reconciliationData = useMemo(
//     () => data?.reconciliation_data ?? [],
//     [data]
//   )

//   const paginatedData = useMemo(() => {
//     return reconciliationData.slice(
//       pagination.pageIndex * pagination.pageSize,
//       (pagination.pageIndex + 1) * pagination.pageSize
//     )
//   }, [reconciliationData, pagination.pageIndex, pagination.pageSize])

//   const totalItems = reconciliationData.length
//   const totalPages = Math.ceil(totalItems / pagination.pageSize)
//   const canPreviousPage = pagination.pageIndex > 0
//   const canNextPage = pagination.pageIndex < totalPages - 1

//   const onPreviousPage = () =>
//     setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }))

//   const onNextPage = () =>
//     setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))

//   const onRowsPerPageChange = (size: number) =>
//     setPagination({ pageSize: size, pageIndex: 0 })

//   const handleSearch = (query: string) => setSearchQuery(query)
//   const handleMatch = async (
//     bankTransactions: FrontendTransaction[],
//     ledgerTransactions: FrontendTransaction[]
//   ) => {
//     const body = {
//       ledgers: ledgerTransactions.map(
//         (ledgerTransaction) => ledgerTransaction.id
//       ),
//       statements: bankTransactions.map((bankTransaction) => bankTransaction.id),
//       action: 'match',
//     }

//     setIsMatching(true)
//     try {
//       const reconciliationId = data?.reconciliation_id
//       const response = await updateReconciliation(
//         reconciliationId as string,
//         body as ManualRequestBody
//       )

//       if (response?.status !== 'success') {
//         toast.error('Failed to match transactions')
//         return
//       }

//       refetch()
//       toast.success('Transactions matched successfully!')
//     } catch {
//       toast.error('Failed to match transactions')
//     } finally {
//       setIsMatching(false)
//     }
//   }

//   const handleUnlink = async (
//     bankTransactions: FrontendTransaction[],
//     ledgerTransactions: FrontendTransaction[]
//   ) => {
//     const body = {
//       ledgers: ledgerTransactions.map(
//         (ledgerTransaction) => ledgerTransaction.id
//       ),
//       statements: bankTransactions.map((bankTransaction) => bankTransaction.id),
//       action: 'unmatch',
//     }

//     try {
//       const reconciliationId = data?.reconciliation_id
//       const response = await updateReconciliation(
//         reconciliationId as string,
//         body as ManualRequestBody
//       )

//       if (response?.status != 'success') {
//         toast.error('Failed to unlink transactions')
//         return
//       }

//       refetch()
//       toast.success('Transactions unlinked successfully!')
//     } catch {
//       toast.error('Failed to unlink transactions')
//     } finally {
//       setShowUnlinkModal(false)
//       setShowUnlinkModalMobile(false)
//       setIsLoading(false)
//     }
//   }

//   return (
//     <ReconciliationContext.Provider
//       value={{
//         data,
//         paginatedData,
//         unmatchedBankTransactions: data?.unmatched_bank_transactions ?? [],
//         unmatchedLedgerTransactions: data?.unmatched_ledger_transactions ?? [],

//         // Pagination
//         pagination,
//         totalItems,
//         totalPages,
//         setPagination,

//         // Table state
//         columnFilters,
//         setColumnFilters,
//         searchQuery,
//         setSearchQuery,

//         // Actions
//         handleMatch,
//         canPreviousPage,
//         canNextPage,
//         onPreviousPage,
//         onNextPage,
//         onRowsPerPageChange,
//         handleSearch,
//         handleUnlink,

//         // Modal state
//         showUnlinkModal,
//         setShowUnlinkModal,
//         showUnlinkModalMobile,
//         setShowUnlinkModalMobile,
//         isLoading,
//         setIsLoading,
//         isMatching,
//         setIsMatching,

//         // Selected row data
//         selectedRow,
//         setSelectedRow,
//       }}
//     >
//       {children}
//     </ReconciliationContext.Provider>
//   )
// }

// // Custom hook to use the reconciliation context
// export const useReconciliation = () => {
//   const context = useContext(ReconciliationContext)
//   const { data } = useSession()

//   if (!context) {
//     throw new Error(
//       'useReconciliation must be used within a ReconciliationProvider'
//     )
//   }

//   // Get user plan
//   const getUserPlan = (plan: string | undefined) => {
//     switch (plan) {
//       case 'Starter':
//         return 'starter'
//       case 'Business':
//         return 'business'
//       default:
//         return 'basic'
//     }
//   }

//   const userPlan = getUserPlan(data?.plan?.plan.plan)

//   return {
//     ...context,
//     userPlan,
//   }
// }

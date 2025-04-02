import { useEffect, useState } from 'react'
import { ReconciliationItem } from '../types/frontendResponseTypes'

const useRowHeights = (data: ReconciliationItem[]) => {
  const [rowHeights, setRowHeights] = useState<number[]>([])

  useEffect(() => {
    const heights = data.map((item) => {
      const statementLength = item.statements?.length || 0
      const ledgerLength = item.ledgers?.length || 0
      return Math.max(statementLength, ledgerLength, 1) * 60.8 // 60px per item
    })

    setRowHeights(heights)
  }, [data])

  return rowHeights
}

export default useRowHeights

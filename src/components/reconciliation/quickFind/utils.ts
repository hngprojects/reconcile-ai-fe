'use client'

import { useEffect, useState } from 'react'
import { TransactionOption } from '../../../helpers/searchComboxOptionExpander'
import type { GroupOption } from './types'

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export function transToGroupOption(
  options: TransactionOption[],
  groupBy?: string
) {
  if (options.length === 0) {
    return {}
  }
  if (!groupBy) {
    return {
      '': options,
    }
  }

  const groupOption: GroupOption = {}
  options.forEach((option) => {
    const key = option['description'] || ''

    if (!groupOption[key]) {
      groupOption[key] = []
    }

    groupOption[key].push(option)
  })
  return groupOption
}

export function removePickedOption(
  groupOption: GroupOption,
  picked: TransactionOption | null
) {
  const cloneOption = JSON.parse(JSON.stringify(groupOption)) as GroupOption

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter(
      (val) => !picked || val.value !== picked.value
    )
  }
  return cloneOption
}

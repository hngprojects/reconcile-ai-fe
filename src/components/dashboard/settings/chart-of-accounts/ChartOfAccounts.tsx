'use client'

import { Accounts } from './Accounts'
import { ChartOfAccountsCategories } from './Categories'

export default function ChartOfAccounts() {
  return (
    <div className="space-y-8">
      <ChartOfAccountsCategories />

      <Accounts />
    </div>
  )
}

'use client'

import { ReconciliationProvider } from '@/context/ReconciliationProvider'
import DesktopView from './DesktopView'
import { MobileView } from './MobileView'

export function View({ id }: { id: string }) {
  return (
    <ReconciliationProvider>
      <div className="md:hidden">
        <MobileView id={id} />
      </div>
      <div className="hidden md:block">
        <DesktopView id={id} />
      </div>
    </ReconciliationProvider>
  )
}

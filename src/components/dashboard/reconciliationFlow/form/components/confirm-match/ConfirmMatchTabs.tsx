import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ConfirmMatchTable from './match/ConfirmMatchTable'
import ConfirmUnmatchedTable from './unmatched/ConfirmUnmatchedTable'
import { useReconciliationStore } from '@/store/reconciliation-store'

export function ConfirmMatchTabs() {
  const { formState } = useReconciliationStore()
  const matchedCount = formState.results?.matches?.length || 0
  const unmatchedCount = formState.results?.unmatched_statements?.length || 0

  return (
    <>
      <p className="text-[15px] text-[#475467] dark:text-white">
        Review your matched and unmatched transactions before finalizing the
        reconciliation. You can still make changes at this stage
      </p>
      <Tabs defaultValue="matched" className="w-full">
        <TabsList className="grid h-full w-full grid-cols-2">
          <TabsTrigger
            className="cursor-pointer py-2 text-[#262626] dark:data-[state=active]:bg-[#000000] "
            value="matched"
          >
            Matched Transactions ({matchedCount})
          </TabsTrigger>
          <TabsTrigger
            className="cursor-pointer py-2 text-[#262626] dark:data-[state=active]:bg-[#000000] "
            value="unmatched"
          >
            Unmatched Transactions ({unmatchedCount})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="matched">
          <ConfirmMatchTable />
        </TabsContent>
        <TabsContent value="unmatched">
          <ConfirmUnmatchedTable />
        </TabsContent>
      </Tabs>
    </>
  )
}

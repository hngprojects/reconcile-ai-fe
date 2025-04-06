import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ConfirmMatchTable from './match/ConfirmMatchTable'
import ConfirmUnmatchedTable from './unmatched/ConfirmUnmatchedTable'

export function ConfirmMatchTabs() {
  return (
    <>
      <p className="text-[15px] text-[#475467]">
        Review your matched and unmatched transactions before finalizing the
        reconciliation. You can still make changes at this stage
      </p>
      <Tabs defaultValue="matched" className="w-full">
        <TabsList className="grid h-full w-full grid-cols-2">
          <TabsTrigger
            className="cursor-pointer py-2 text-[#262626]"
            value="matched"
          >
            Matched Transactions (2)
          </TabsTrigger>
          <TabsTrigger
            className="cursor-pointer py-2 text-[#262626]"
            value="unmatched"
          >
            Unmatched Transactions (4)
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

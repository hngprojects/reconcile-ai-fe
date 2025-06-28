import { useReconcilationsById } from '@/app/queries'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useParams } from 'next/navigation'
// import Attachments from './Attachments'
import MatchTable from './MatchTable'
import UnmatchedTable from './UnmatchedTable'

const SummaryTabs = () => {
  const params = useParams()
  const reconciliationId = params.id as string
  const { data } = useReconcilationsById(reconciliationId)

  return (
    <Tabs defaultValue="matched" className="w-full">
      <TabsList className="grid h-full grid-cols-2">
        <TabsTrigger
          className="cursor-pointer py-2 text-[#262626] dark:data-[state=active]:bg-[#000000]"
          value="matched"
        >
          Matched Transactions
        </TabsTrigger>
        <TabsTrigger
          className="cursor-pointer py-2 text-[#262626] dark:data-[state=active]:bg-[#000000]"
          value="unmatched"
        >
          Unmatched Transactions
        </TabsTrigger>
        {/* <TabsTrigger
          className="cursor-pointer py-2 text-[#262626]"
          value="attachments"
        >
          Attachments & Notes
        </TabsTrigger> */}
      </TabsList>
      <TabsContent value="matched">
        <div className="mt-2 text-black dark:text-white">
          <h3 className="text-lg font-medium">Matched Transactions</h3>
          <p className="text-sm font-light">
            All transactions that were successfully matched during
            reconciliation
          </p>
        </div>
        <MatchTable matchedTransactions={data?.matches} />
      </TabsContent>
      <TabsContent value="unmatched">
        <div className="mt-2 text-black dark:text-white">
          <h3 className="text-lg font-medium">Unmatched Transactions</h3>
          <p className="text-sm font-light">
            Transactions that could not be matched during reconciliation
          </p>
        </div>
        <UnmatchedTable unmatchedBankStatements={data?.unmatched_statements} />
      </TabsContent>
      {/* <TabsContent value="attachments">
        <Attachments />
      </TabsContent> */}
    </Tabs>
  )
}

export default SummaryTabs

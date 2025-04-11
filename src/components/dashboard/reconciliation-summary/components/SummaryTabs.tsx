import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MatchTable from './MatchTable'
import UnmatchedTable from './UnmatchedTable'
import Attachments from './Attachments'

const SummaryTabs = () => {
  return (
    <Tabs defaultValue="matched" className="w-full">
      <TabsList className="grid h-full grid-cols-3">
        <TabsTrigger
          className="cursor-pointer py-2 text-[#262626]"
          value="matched"
        >
          Matched Transactions
        </TabsTrigger>
        <TabsTrigger
          className="cursor-pointer py-2 text-[#262626]"
          value="unmatched"
        >
          Unmatched Transactions
        </TabsTrigger>
        <TabsTrigger
          className="cursor-pointer py-2 text-[#262626]"
          value="attachments"
        >
          Attachments & Notes
        </TabsTrigger>
      </TabsList>
      <TabsContent value="matched">
        <div className="mt-2 text-black">
          <h3 className="text-lg font-medium">Matched Transactions</h3>
          <p className="text-sm font-light">
            All transactions that were successfully matched during
            reconciliation
          </p>
        </div>
        <MatchTable />
      </TabsContent>
      <TabsContent value="unmatched">
        <div className="mt-2 text-black">
          <h3 className="text-lg font-medium">Unmatched Transactions</h3>
          <p className="text-sm font-light">
            Transactions that could not be matched during reconciliation
          </p>
        </div>
        <UnmatchedTable />
      </TabsContent>
      <TabsContent value="attachments">
        <Attachments />
      </TabsContent>
    </Tabs>
  )
}

export default SummaryTabs

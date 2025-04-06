import MatchTransactionSummaryCards from './components/match-transaction/MatchTransactionSummaryCards'
import MatchTransactionTable from './components/match-transaction/MatchTransactionTable'

const MatchTransaction = () => {
  return (
    <div className="flex flex-col gap-8">
      <MatchTransactionSummaryCards />
      <MatchTransactionTable />
    </div>
  )
}

export default MatchTransaction

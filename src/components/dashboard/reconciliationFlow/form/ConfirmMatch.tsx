import ConfirmMatchSummaryCards from './components/confirm-match/ConfirmMatchSummaryCards'
import { ConfirmMatchTabs } from './components/confirm-match/ConfirmMatchTabs'

const ConfirmMatch = () => {
  return (
    <div className="flex flex-col gap-8">
      <ConfirmMatchSummaryCards />
      <ConfirmMatchTabs />
    </div>
  )
}

export default ConfirmMatch

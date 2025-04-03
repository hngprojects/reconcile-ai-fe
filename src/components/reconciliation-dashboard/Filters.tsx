import { SearchIcon } from '../Icon/Icons'
import DropdownFilter from './DropdownFilter'

export default function Filters() {
  return (
    <div className="flex items-center justify-between self-stretch">
      <h1 className="font-inter text-[20px] font-medium text-black">
        Reconciliation History
      </h1>
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-[295px] items-center gap-2 rounded-lg border border-black/20 px-6 py-4">
          <SearchIcon className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            className="font-[Plus Jakarta Sans] overflow-hidden border-none text-base font-light text-ellipsis text-black outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownFilter label="All Banks" />
          <DropdownFilter label="All Status" />
        </div>
      </div>
    </div>
  )
}

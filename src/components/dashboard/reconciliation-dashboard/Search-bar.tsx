import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="relative mt-4 w-full md:mt-0 md:w-auto">
      <div className="relative w-full md:w-[300px]">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-[#98a2b3]" />
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-lg border border-[#d4d4d4] py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[#2e604a] focus:outline-none"
        />
      </div>
    </div>
  )
}

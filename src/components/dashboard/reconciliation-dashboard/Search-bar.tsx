import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="relative mt-4 w-full lg:mt-0 lg:w-auto">
      <div className="relative w-full lg:w-[300px]">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        <input
          type="text"
          placeholder="Search"
          className="bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:outline-none"
        />
      </div>
    </div>
  )
}

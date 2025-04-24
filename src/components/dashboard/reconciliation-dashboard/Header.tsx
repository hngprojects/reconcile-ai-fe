import SearchBar from './Search-bar'

export default function Header() {
  return (
    <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
      <div>
        <h1 className="text-xl font-medium text-black">
          Reconciliation Projects
        </h1>
        <p className="mt-1 text-base font-normal text-[#475467]">
          Manage and organize your bank reconciliation projects
        </p>
      </div>
      <SearchBar />
    </div>
  )
}

export default function DropdownFilter({ label }: { label: string }) {
  return (
    <select className="flex w-full items-center gap-2 rounded-lg border border-black/20 p-4">
      <option className="font-inter text-sm font-medium text-black">
        {label}
      </option>
      {/* Add options dynamically */}
    </select>
  )
}

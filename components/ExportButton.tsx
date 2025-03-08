import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function ExportButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} variant="outline" size="sm">
      <Download className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  )
}

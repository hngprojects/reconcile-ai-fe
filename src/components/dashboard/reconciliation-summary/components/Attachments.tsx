import { DotIcon, FileTextIcon } from '@/components/Icon/Icons'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React from 'react'

const Attachments = () => {
  return (
    <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-[#D0D0D0] p-6">
      <div>
        <h3 className="text-lg font-medium">Attachments & Notes</h3>
        <p className="text-sm font-light">
          Documents and notes related to this reconciliation
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Attachments</h4>
        <div className="flex items-center justify-between rounded-xl border border-[#D0D0D0] px-2.5 py-5">
          <div className="flex items-center justify-center gap-2">
            <div>
              <FileTextIcon className="size-8" />
            </div>
            <div>
              <h6 className="font-semibold text-[#333]">
                March_2025_Statement.pdf
              </h6>
              <div className="flex w-fit items-center justify-center gap-1 text-sm text-[#807F7F]">
                <span className="font-medium">1.2mb</span>
                <DotIcon className="size-2 text-inherit" />
                <span>Uploaded on Mar 25, 2025</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-primary text-primary hover:text-primary cursor-pointer"
          >
            <Download />
            <span>Download</span>
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Notes</h4>
        <div className="flex h-32 items-center justify-between rounded-xl border border-[#D0D0D0] px-2.5 py-5"></div>
      </div>
    </div>
  )
}

export default Attachments

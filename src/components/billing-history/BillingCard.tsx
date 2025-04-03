'use client'

import { CheckIcon } from '../Icon/Icons'
import { Button } from '../ui/button'
import { BillingRecord, formatDate, getStatusStyle } from './BillingHistory'
import { Download } from 'lucide-react'

interface BillingCardProps {
  data: BillingRecord[]
}

const BillingCard = ({ data }: BillingCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <div key={item.id} className="rounded-xl border border-[#E4E7EC] p-4">
          <div className="flex flex-col gap-2 text-[#333333]">
            <div className="flex items-center justify-between">
              <h5 className="font-semibold">{item.plan}</h5>
              <p>${item.amount.toFixed(2)}</p>
            </div>
            <div className="text-lg">{formatDate(item.transaction_date)}</div>
            <div> {item.description || 'Monthly Subscription'}</div>
            <div>
              <span
                className={`${getStatusStyle(item.status)} inline-flex items-center gap-1 rounded-[16px] px-2 py-[2px]`}
              >
                {item.status === 'completed' ? (
                  <>
                    <CheckIcon className="size-5 text-[#12B76A]" />
                    Successful
                  </>
                ) : (
                  item.status.charAt(0).toUpperCase() + item.status.slice(1)
                )}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="text-primary border-primary hover:text-primary hover:border-primary mt-4 w-full cursor-pointer"
          >
            <Download /> Download
          </Button>
        </div>
      ))}
    </div>
  )
}

export default BillingCard

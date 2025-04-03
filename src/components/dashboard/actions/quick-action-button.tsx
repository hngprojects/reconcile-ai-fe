import { ButtonHTMLAttributes } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface QuickActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

export function QuickActionButton({
  icon,
  label,
  onClick,
  className,
  ...props
}: QuickActionButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        'flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-3',
        'hover:bg-accent/50 dark:hover:bg-accent/20',
        'transition-colors duration-200',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="bg-background border-border/50 rounded-full border p-2">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Button>
  )
}

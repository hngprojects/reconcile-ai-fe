import { cn } from '@/lib/utils'
import { ReactNode, ElementType } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
  Variant?: ElementType
  variantProps?: React.ComponentProps<ElementType>
}

const Container = ({
  children,
  className = '',
  Variant = 'div',
  variantProps = {},
}: ContainerProps) => {
  return (
    <Variant
      {...variantProps}
      className={cn(`mx-auto max-w-[90rem] px-4 md:px-10`, className)}
    >
      {children}
    </Variant>
  )
}

export default Container

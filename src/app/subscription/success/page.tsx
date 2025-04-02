import Container from '@/components/Container'
import { SearchParams } from '@/types/global'
import React from 'react'
import { SubscriptionSuccessContent } from '.'
import { redirect } from 'next/navigation'

const SucessPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const plan = (await searchParams).plan

  console.log('plan', plan)

  if (plan !== 'starter' && plan !== 'business') {
    redirect('/not-found')
  }
  return (
    <Container className="flex w-full items-center justify-center p-4">
      <SubscriptionSuccessContent plan={plan as 'starter' | 'business'} />
    </Container>
  )
}

export default SucessPage

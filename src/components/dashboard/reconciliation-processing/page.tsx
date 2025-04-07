'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Loader2,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function ReconciliationProcessingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  const [processingTime, setProcessingTime] = useState(0)
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(120)
  const [transactionsProcessed, setTransactionsProcessed] = useState(0)
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Mock data for demonstration
  const totalTransactionsToProcess = 156
  const totalSteps = 5

  // Steps in the reconciliation process
  const steps = [
    {
      id: 1,
      name: 'Parsing bank statement',
      description: 'Extracting transactions from your uploaded statement',
    },
    {
      id: 2,
      name: 'Analyzing transaction patterns',
      description: 'Identifying recurring transactions and patterns',
    },
    {
      id: 3,
      name: 'Matching with ledger entries',
      description: 'Finding potential matches in your accounting records',
    },
    {
      id: 4,
      name: 'Applying AI-powered matching',
      description: 'Using machine learning to improve match accuracy',
    },
    {
      id: 5,
      name: 'Finalizing reconciliation',
      description: 'Preparing your reconciliation report',
    },
  ]

  // Simulate the reconciliation process
  useEffect(() => {
    setTotalTransactions(totalTransactionsToProcess)

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 100 / (totalSteps * 20)

        if (newProgress > 20 && currentStep === 1) setCurrentStep(2)
        else if (newProgress > 40 && currentStep === 2) setCurrentStep(3)
        else if (newProgress > 60 && currentStep === 3) setCurrentStep(4)
        else if (newProgress > 80 && currentStep === 4) setCurrentStep(5)

        const newTransactionsProcessed = Math.min(
          Math.floor((newProgress / 100) * totalTransactionsToProcess),
          totalTransactionsToProcess
        )
        setTransactionsProcessed(newTransactionsProcessed)

        setProcessingTime((prevTime) => prevTime + 1)

        const newEstimatedTime = Math.max(
          120 - Math.floor(newProgress * 1.2),
          0
        )
        setEstimatedTimeRemaining(newEstimatedTime)

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push('/dashboard/ledger')
          }, 1500)
          return 100
        }

        return Math.min(newProgress, 100)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [router, currentStep])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
          Processing Your Reconciliation
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Please wait while we analyze your bank statement and find matches in
          your ledger
        </p>
      </div>

      {error ? (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-6 w-6 text-red-500" />
              <div>
                <h3 className="mb-1 font-medium text-red-700">
                  Error Processing Your Reconciliation
                </h3>
                <p className="text-red-600">{error}</p>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push('/reconciliation')}
                  >
                    Return to Reconciliation
                  </Button>
                  <Button>Try Again</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Main progress indicator */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Loader2 className="text-primary h-6 w-6 animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium sm:text-lg">
                      {steps[currentStep - 1].name}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {steps[currentStep - 1].description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold sm:text-2xl">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm">
                    Step {currentStep} of {totalSteps}
                  </div>
                </div>
              </div>

              <Progress value={progress} className="mb-2 h-2" />

              <div className="text-muted-foreground mt-2 flex justify-between text-xs sm:text-sm">
                <div>Time elapsed: {formatTime(processingTime)}</div>
                <div>
                  Estimated time remaining: {formatTime(estimatedTimeRemaining)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground mb-1 text-sm">
                      Transactions
                    </p>
                    <div className="text-xl font-bold sm:text-2xl">
                      {transactionsProcessed}{' '}
                      <span className="text-muted-foreground text-xs font-normal sm:text-sm">
                        / {totalTransactions}
                      </span>
                    </div>
                  </div>
                  <FileSpreadsheet className="text-muted-foreground h-5 w-5" />
                </div>
                <Progress
                  value={(transactionsProcessed / totalTransactions) * 100}
                  className="mt-2 h-1"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground mb-1 text-sm">
                      Processing Speed
                    </p>
                    <div className="text-xl font-bold sm:text-2xl">
                      {Math.round(
                        transactionsProcessed / Math.max(processingTime, 1)
                      )}{' '}
                      <span className="text-muted-foreground text-xs font-normal sm:text-sm">
                        per sec
                      </span>
                    </div>
                  </div>
                  <Clock className="text-muted-foreground h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Steps progress */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 text-base font-medium sm:text-lg">
                Reconciliation Progress
              </h3>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-start gap-3">
                    <div
                      className={`rounded-full p-1 ${
                        currentStep > step.id
                          ? 'bg-green-100 text-green-600'
                          : currentStep === step.id
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : currentStep === step.id ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-medium sm:text-base ${
                            currentStep > step.id
                              ? 'text-green-600'
                              : currentStep === step.id
                                ? 'text-primary'
                                : 'text-muted-foreground'
                          }`}
                        >
                          {step.name}
                        </p>
                        {currentStep > step.id && (
                          <span className="text-xs text-green-600 sm:text-sm">
                            Completed
                          </span>
                        )}
                        {currentStep === step.id && (
                          <span className="text-primary text-xs sm:text-sm">
                            In progress
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

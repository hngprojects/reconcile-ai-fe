interface OnboardingProgressProps {
  currentStep: number
}

export default function OnboardingProgress({
  currentStep,
}: OnboardingProgressProps) {
  const steps = [
    { id: 1, name: 'Basics' },
    { id: 2, name: 'Bank' },
    { id: 3, name: 'Ledger' },
    { id: 4, name: 'Finish' },
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.9997 0.833344C13.8997 0.833344 0.833008 13.9 0.833008 30C0.833008 46.1 13.8997 59.1667 29.9997 59.1667C46.0997 59.1667 59.1663 46.1 59.1663 30C59.1663 13.9 46.0997 0.833344 29.9997 0.833344ZM29.9997 12.5C35.6288 12.5 40.208 17.0792 40.208 22.7083C40.208 28.3375 35.6288 32.9167 29.9997 32.9167C24.3705 32.9167 19.7913 28.3375 19.7913 22.7083C19.7913 17.0792 24.3705 12.5 29.9997 12.5ZM29.9997 53.3333C24.0788 53.3333 17.0788 50.9417 12.0913 44.9333C17.2008 40.9265 23.5065 38.7489 29.9997 38.7489C36.4929 38.7489 42.7985 40.9265 47.908 44.9333C42.9205 50.9417 35.9205 53.3333 29.9997 53.3333Z"
            fill="#2E604A"
          />
        </svg>
      </div>

      <h2 className="mb-[2px] text-center text-sm font-semibold md:text-xl">
        Setup Your Account
      </h2>
      <p className="mb-[29px] text-center text-[12px] text-[#4D4D4D] md:text-[15px]">
        Enter your business details to get started
      </p>

      <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                  step.id < currentStep
                    ? 'border-[#2E604A] bg-[#2E604A] text-white'
                    : step.id === currentStep
                      ? 'border-[#2E604A] bg-[#2E604A] text-white'
                      : 'border-[#333333] bg-white text-[#333333]'
                }`}
              >
                {step.id}
              </div>
              <span className="mt-2 text-sm font-medium">{step.name}</span>
            </div>

            {index < steps.length - 1 && (
              <div className="mx-2 h-[1px] w-[30px] flex-1 border-t border-dashed border-[#3D3D3D] md:w-[117px]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

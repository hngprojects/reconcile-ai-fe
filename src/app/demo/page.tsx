import DemoForm from "./demo-form";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full max-w-3xl px-4 py-[59px] flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
          Get a free <span className="text-[#2E604A]">Demo</span> and
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
          Automate Your Financial Reconciliation
        </h2>

        <p className="text-lg text-[#333333] mb-12 max-w-2xl">
          Experience the power of AI-driven financial reconciliation. Fill out
          the form below to get a free personalized Demo of ReconXi.
        </p>

        <DemoForm />
      </div>

      <footer className="w-full border-t border-gray-200 py-6 text-center text-gray-600">
        <p>Your data is secured and will not be shared.</p>
      </footer>
    </main>
  );
}

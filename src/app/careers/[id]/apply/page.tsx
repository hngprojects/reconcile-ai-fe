import Footer from "@/src/components/Footer";
import ApplyForm from "./ApplyForm";

export default function Apply() {
  return (
    <main className="min-h-screen flex flex-col ">
      <div className=" flex flex-col items-center">
        <div className="flex-1 w-full max-w-3xl px-4 py-[59px] flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
            Apply today!
          </h1>

          <p className="text-lg text-[#333333] mb-12 max-w-2xl flex flex-col">
           Thank you for your interest!{" "}
              Please fill out the form below, and our team will reach out to
              you.
          </p>

          <div className="w-full">
            {" "}
            <ApplyForm/>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
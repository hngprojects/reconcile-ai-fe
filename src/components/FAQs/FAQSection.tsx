import { FAQ } from "@/src/types/faq";
import Container from "../Container";
import FAQAccordion from "./FAQAccordion";

const faqItems: FAQ[] = [
  {
    question: "What is ReconXi?",
    answer:
      "ReconXi is an AI-powered financial reconciliation tool designed to help businesses automate the process of matching transactions between their bank statements and company ledgers.",
  },
  {
    question: "Is ReconXi really free to use?",
    answer:
      "Basic Reconciliation is free for Basic users. To get more features, please checkout our Starter and Business plans.",
  },
  {
    question: "What types of files can I upload to ReconXi?",
    answer:
      "You can upload CSV files for both your bank statements and company ledger. ReconXi will automatically match transactions based on the data from these files.",
  },
  {
    question: "Is my uploaded bank statement stored permanently?",
    answer: "No, uploaded bank statements are only stored temporarily for processing. Once the required data is extracted, the file is automatically deleted from our servers.",
  },
  {
    question: "Can I manually update matched transactions?",
    answer:
      "Yes, you can manually update matched transactions.",
  },
  {
    question:
      "Will ReconXi integrate with other financial software (e.g., QuickBooks, Xero)?",
    answer:
      "Currently, ReconXi supports manual file uploads (CSV) for reconciliation. As we move forward, we plan to add integrations with popular financial software like QuickBooks and Xero. Stay tuned for future updates as we continue to improve the tool!",
  },
];

const FAQSection = () => {
  return (
    <section>
      <Container className="py-16">
        <div className="w-full  max-w-[768px] mx-auto">
          <div className="flex flex-col gap-[20px] text-center">
            <h1 className="text-[#101828] font-semibold text-3xl sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="sm:text-xl text-[#475467]">
              Everything you need to know about ReconXi.
            </p>
          </div>
          <div className="mt-12">
            <FAQAccordion faqs={faqItems} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;

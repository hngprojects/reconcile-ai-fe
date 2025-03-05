import FAQAccordion from "./FAQAccordion";

interface FAQ {
  question: string;
  answer: string;
}

const faqItems: FAQ[] = [
  {
    question: "What is Reconxi?",
    answer: "Reconxi AI is an AI-powered financial reconciliation tool designed to help businesses automate the process of matching transactions between their bank statements and company ledgers. By using advanced algorithms, the tool saves time, reduces human error, and ensures your financial records are accurate and up-to-date."
  },
  {
    question: "Is Reconxi really free to use??",
    answer: "Yes! For now, Reconxi is completely free as part of our MVP release. You can sign up and start using the tool without any cost. We want you to experience the simplicity and efficiency it offers while we continue to improve it. This free access will be available for a limited time, so sign up now!"
  },
  {
    question: "What types of files can I upload to Reconcile AI?",
    answer: "You can upload CSV files for both your bank statements and company ledger. Reconcile AI will automatically match transactions based on the data from these files, making the reconciliation process fast and easy."
  },
  {
    question: "Is my data secure with Reconcile AI?",
    answer: "Absolutely! ReconXi AI is designed to handle both personal and business financial reconciliation needs."
  },
  {
    question: "Can I use Reconxi for personal finances?",
    answer: "Absolutely! Your privacy and security are our top priorities. All data uploaded to Reconxi is encrypted and securely processed using industry-standard encryption protocols. We do not share your data with third parties and comply with strict data protection standards."
  },
  {
    question: "Will Reconxi integrate with other financial software (e.g., QuickBooks, Xero)?",
    answer: "Currently, Reconxi supports manual file uploads (CSV) for reconciliation. As we move forward, we plan to add integrations with popular financial software like QuickBooks and Xero to streamline your workflow even further. Stay tuned for future updates as we continue to improve the tool!"
  }
];

const FAQSection = () => {
  return (
    <section className="flex justify-center py-[96px]">
      <div className="gap-[8px]">
        <div className="flex flex-col gap-[20px] text-center">
          <h1 className="font-inter text-[#101828] font-semibold text-[36px] leading-[44px] text-gray-900 my-0">
            Frequently Asked Questions
          </h1>
          <p className="font-inter font-normal text-[20px] leading-[30px] text-[#475467] my-0">
            Everything you need to know about ReconXi.
          </p>
        </div>
        <div className="my-[64]">
        <FAQAccordion  faqs={faqItems} />

        </div>
      </div>
    </section>
  );
};


export default FAQSection;
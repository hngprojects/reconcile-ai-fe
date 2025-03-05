import FAQAccordion from "./FAQAccordion";

interface FAQ {
  question: string;
  answer: string;
}

const faqItems: FAQ[] = [
  {
    question: "Is ReconXi AI Really Free to use?",
    answer: "Yes! For now, ReconXi AI is completely free as part of our MVP release. You can sign up and start using the tool without any cost. We want you to experience the simplicity and efficiency it offers while we continue to improve. This free access will be available for a limited time, so sign up now!"
  },
  {
    question: "What types of files can I upload to ReconXi AI?",
    answer: "ReconXi AI supports various file formats including CSV, Excel, and PDF for uploading financial data."
  },
  {
    question: "Is my data secure with ReconXi AI?",
    answer: "Yes, we prioritize data security and use industry-standard encryption and security practices to protect your information."
  },
  {
    question: "Can I use ReconXi AI for personal finances?",
    answer: "Absolutely! ReconXi AI is designed to handle both personal and business financial reconciliation needs."
  },
  {
    question: "Will ReconXi AI integrate with other financial software?",
    answer: "We are working on integrations with popular financial software. Stay tuned for updates!"
  },
  {
    question: "What happens after I sign up?",
    answer: "After signing up, you'll gain access to the ReconXi AI dashboard where you can start uploading your financial data and perform reconciliations."
  }
];

const FAQSection = () => {
  return (
    <section className="flex justify-center ">
      <div className="gap-[8px]">
        <div className="flex flex-col gap-[20px] text-center">
          <h1 className="font-inter text-[#101828] font-semibold text-[36px] leading-[44px] text-gray-900 my-0">
            Frequently Asked Questions
          </h1>
          <p className="font-inter font-normal text-[20px] leading-[30px] text-[#475467] my-0">
            Everything you need to know about ReconXi.
          </p>
        </div>
        <div>

        </div>
        <FAQAccordion  faqs={faqItems} />
      </div>
    </section>
  );
};


export default FAQSection;
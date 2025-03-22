"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-gray-100"
          onClick={() => toggleFAQ(index)}
        >
          <div className="flex justify-between items-center">
            <h3
              className={`text-lg font-medium ${
                openIndex === index ? "text-[#297B65]" : "text-gray-900"
              }`}
            >
              {faq.question}
            </h3>
            <motion.span
              animate={{ rotate: openIndex === index ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold text-[#297B65]"
            >
              {openIndex === index ? "−" : "+"}
            </motion.span>
          </div>
          {openIndex === index && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 text-gray-700"
            >
              {faq.answer}
            </motion.p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
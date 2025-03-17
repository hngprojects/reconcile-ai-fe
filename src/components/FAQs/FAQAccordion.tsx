// test
"use client";
import { motion, AnimatePresence } from "framer-motion";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AccordionItemProps, FAQ } from "@/src/types/faq";

const FAQAccordion = ({ faqs }: { faqs: FAQ[] }) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="overflow-hidden">
      <ul className="min-w-[100%] divide-y divide-[#E6E8EB] ">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            faq={faq}
            selected={selected}
            setSelected={setSelected}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
};

const AccordionItem = ({
  faq,
  selected,
  setSelected,
  index,
}: AccordionItemProps) => {
  const isOpen = selected === index;

  const handleClick = () => {
    setSelected(isOpen ? null : index);
  };

  return (
    <li>
      <motion.div
        className="border-b border-gray-200 py-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <button
          className="flex justify-between items-center w-full text-left py-2"
          onClick={handleClick}
        >
          <span className="text-lg font-medium text-[#101828]">
            {faq.question}
          </span>
          <div>{isOpen ? <Minus size={20} /> : <Plus size={20} />}</div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="py-3 text-[#475467]">{faq.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </li>
  );
};

export default FAQAccordion;

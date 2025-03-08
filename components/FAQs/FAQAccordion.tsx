"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AccordionItemProps, FAQ } from "@/types/faq";

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
    <li className="w-full">
      <button
        className="flex justify-between gap-1 cursor-pointer items-center w-full p-4 bg-white hover:bg-[#F9FAFB]"
        onClick={handleClick}
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-[#101828] text-left">
          {faq.question}
        </span>
        <div className="w-8 h-8 rounded-full border border-[#D1D5DB] flex items-center justify-center">
          {isOpen ? (
            <Minus className="w-5 h-5 text-[#6B7280]" />
          ) : (
            <Plus className="w-5 h-5 text-[#6B7280]" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="w-full px-4 pb-4 text-base text-[#475467] break-words">
          {faq.answer}
        </div>
      )}
    </li>
  );
};

export default FAQAccordion;

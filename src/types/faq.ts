export interface FAQ {
  question: string;
  answer: string;
}

export interface AccordionItemProps {
  faq: FAQ;
  selected: number | null;
  setSelected: (index: number | null) => void;
  index: number;
}

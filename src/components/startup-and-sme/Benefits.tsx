import React from "react";
import Container from "../Container";

// SVG components remain the same as in the original file
const AIAccuracyIcon = () => (
  <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1C4.582 1 1 4.72225 1 9.31495C1 10.8826 1.417 12.3494 2.143 13.6M12.5 10.45V12.55M15.5 10.45V12.55M12.5 2.05V4.15M15.5 2.05V4.15M11 5.725H9M11 8.875H9M19 5.725H17M19 8.875H17M12 18.85L11.87 19.5293C11.73 20.2717 11.659 20.6423 11.5 20.9363C11.255 21.3895 10.8583 21.7308 10.387 21.8939C10.082 22 9.72 22 9 22C8.28 22 7.918 22 7.613 21.895C7.14154 21.7316 6.74482 21.3899 6.5 20.9363C6.341 20.6423 6.27 20.2717 6.13 19.5293L6 18.85M15 4.15H13C12.057 4.15 11.586 4.15 11.293 4.45765C11 4.7653 11 5.25985 11 6.25V8.35C11 9.34015 11 9.8347 11.293 10.1423C11.586 10.45 12.057 10.45 13 10.45H15C15.943 10.45 16.414 10.45 16.707 10.1423C17 9.8347 17 9.34015 17 8.35V6.25C17 5.25985 17 4.7653 16.707 4.45765C16.414 4.15 15.943 4.15 15 4.15ZM4.383 16.8529C4.291 16.5631 4.245 16.4171 4.25 16.2995C4.25566 16.178 4.29475 16.0607 4.36254 15.9619C4.43033 15.8632 4.52393 15.7871 4.632 15.743C4.736 15.7 4.882 15.7 5.172 15.7H12.828C13.119 15.7 13.264 15.7 13.368 15.742C13.4762 15.7862 13.5699 15.8623 13.6377 15.9613C13.7055 16.0603 13.7445 16.1778 13.75 16.2995C13.755 16.4171 13.709 16.562 13.617 16.8529C13.447 17.3894 13.362 17.6582 13.231 17.8756C12.957 18.3298 12.5275 18.6564 12.031 18.788C11.793 18.85 11.525 18.85 10.988 18.85H7.012C6.475 18.85 6.206 18.85 5.969 18.787C5.47266 18.6556 5.04319 18.3294 4.769 17.8756C4.638 17.6582 4.553 17.3894 4.383 16.8529Z" 
      stroke="#2E604A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TimeIcon = () => (
  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3 15.2L14.7 13.8L11 10.1V5.5H9V10.9L13.3 15.2ZM10 20.5C8.61667 20.5 7.31667 20.2375 6.1 19.7125C4.88333 19.1875 3.825 18.475 2.925 17.575C2.025 16.675 1.3125 15.6167 0.7875 14.4C0.2625 13.1833 0 11.8833 0 10.5C0 9.11667 0.2625 7.81667 0.7875 6.6C1.3125 5.38333 2.025 4.325 2.925 3.425C3.825 2.525 4.88333 1.8125 6.1 1.2875C7.31667 0.7625 8.61667 0.5 10 0.5C11.3833 0.5 12.6833 0.7625 13.9 1.2875C15.1167 1.8125 16.175 2.525 17.075 3.425C17.975 4.325 18.6875 5.38333 19.2125 6.6C19.7375 7.81667 20 9.11667 20 10.5C20 11.8833 19.7375 13.1833 19.2125 14.4C18.6875 15.6167 17.975 16.675 17.075 17.575C16.175 18.475 15.1167 19.1875 13.9 19.7125C12.6833 20.2375 11.3833 20.5 10 20.5ZM10 18.5C12.2167 18.5 14.1042 17.7208 15.6625 16.1625C17.2208 14.6042 18 12.7167 18 10.5C18 8.28333 17.2208 6.39583 15.6625 4.8375C14.1042 3.27917 12.2167 2.5 10 2.5C7.78333 2.5 5.89583 3.27917 4.3375 4.8375C2.77917 6.39583 2 8.28333 2 10.5C2 12.7167 2.77917 14.6042 4.3375 16.1625C5.89583 17.7208 7.78333 18.5 10 18.5Z" 
      fill="#2E604A"/>
  </svg>
);

const CostIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 1H1M1 1V5M1 1L6 6M13 1H17M17 1V5M17 1L12 6M5 17H1M1 17V13M1 17L6 12M13 17H17M17 17V13M17 17L12 12" 
      stroke="#2E604A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScaleIcon = () => (
  <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 0V7.5H22.5V2.56641L13.5 11.5664L9 7.06641L1.08984 14.9648L0.0351562 13.9102L9 4.93359L13.5 9.43359L21.4336 1.5H16.5V0H24Z" 
      fill="#2E604A"/>
  </svg>
);

const benefits = [
  {
    icon: AIAccuracyIcon,
    title: "AI-Powered Accuracy",
    description: "No more human errors! Our intelligent matching system ensures that every transaction is correctly reconciled.",
  },
  {
    icon: TimeIcon,
    title: "Saves Hours of Work",
    description: "Automate reconciliation and focus on growing your business instead of wasting time on spreadsheets.",
  },
  {
    icon: CostIcon,
    title: "Cost-Effective Solution",
    description: "Get reconciliation features at an affordable price—starting with a free trial.",
  },
  {
    icon: ScaleIcon,
    title: "Scalable & Reliable",
    description: "Whether you're handling a few transactions or thousands, ReconXi grows with your business.",
  }
];

export default function Benefits() {
  return (
    <section
      className="bg-[#FCFCFC] py-8 sm:py-10 px-4 sm:px-6 lg:px-0"
      aria-labelledby="benefits-title"
    >
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h2
            id="benefits-title"
            className="text-2xl sm:text-3xl md:text-4xl leading-tight md:leading-[1.2] font-semibold text-[#101828] text-center tracking-tight mb-6 sm:mb-8 md:mb-12 max-w-3xl"
          >
            Benefits of Using ReconXi
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-6xl">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg duration-300 px-4 sm:px-5 py-4 sm:py-6 flex flex-col"
                role="listitem"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-[#2A2A2A] mb-2 sm:mb-3 flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center">{<benefit.icon />}</span>
                  {benefit.title}
                </h3>
                <p className="text-base sm:text-lg text-[#3B3E45] font-normal leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
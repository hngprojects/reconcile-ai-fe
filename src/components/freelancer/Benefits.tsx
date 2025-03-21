// "use client";
// import React from "react";
// import Container from "../Container";
// import { motion } from "framer-motion";

// const benefits = [
//   {
//     title: "Saves Time",
//     description:"Spend more time working, less time on accounting",
//   },
//   {
//     title: "Accurate & Fast",
//     description:
//       "AI-powered automated reconciliation software does the job in seconds.",
//   },
//   {
//     title: "Error-Free Reports",
//     description:
//       "Never worry about missing or duplicate transactions again.",
//   },
//   {
//     title: "Affordable for Freelancers",
//     description:
//       "Whether you're handling a few transactions or thousands, ReconXi grows with your business.",
//   },
// ];

// export default function Benefits() {
//   return (
//     <section className="bg-[#F5F5F5] py-12 md:py-20" aria-labelledby="benefits-title">
//       <Container>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="flex flex-col items-center text-center md:text-center"
//         >
//           {/* Section Heading */}
//           <h2
//             id="benefits-title"
//             className="text-[24px] sm:text-[28px] md:text-[36px] font-semibold text-[#101828] tracking-[-0.02em] mb-6 md:mb-12"
//           >
//             Benefits of Using ReconXi
//           </h2>

//           {/* Benefits Grid */}
//           <div
//             className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-[1100px] mx-auto"
//             role="list"
//           >
//             {benefits.map((benefit, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-white rounded-xl p-5 sm:p-6 flex items-start gap-4 text-left"
//                 role="listitem"
//               >
//                 {/* Checkmark Icon */}
//                 <div className="flex-shrink-0">
//                   <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M8.75016 14.0007L12.2502 17.5007L19.2502 10.5007M25.6668 14.0007C25.6668 20.444 20.4435 25.6673 14.0002 25.6673C7.55684 25.6673 2.3335 20.444 2.3335 14.0007C2.3335 7.55733 7.55684 2.33398 14.0002 2.33398C20.4435 2.33398 25.6668 7.55733 25.6668 14.0007Z"
//                       stroke="#297B65"
//                       strokeWidth="2.33333"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>

//                 {/* Text Content */}
//                 <div className="flex-1">
//                   <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-[#2A2A2A] mb-1">
//                     {benefit.title}
//                   </h3>
//                   <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[#3B3E45] leading-[1.5]">
//                     {benefit.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </Container>
//     </section>
//   );
// }
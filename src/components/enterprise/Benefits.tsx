// "use client";
// import React from "react";
// import Container from "../Container";
// import { motion } from "framer-motion";

// const benefits = [
//   {
//     title: "Built for Multinational Companies",
//     description:
//       "Specifically designed for CFOs managing large-scale financial reconciliation.",
//   },
//   {
//     title: "Easy to Automate",
//     description:
//       "Our advanced reconciliation process reduces manual workload significantly.",
//   },
//   {
//     title: "Clear and Accurate Reporting",
//     description:
//       "Get exportable financial reports that give you total clarity and control.",
//   },
// ];

// export default function Benefits() {
//   return (
//     <section
//       className="bg-[#F5F5F5] px-0 lg:px-20 py-10 md:py-20"
//       aria-labelledby="benefits-title"
//     >
//       <Container>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="flex flex-col items-center"
//         >
//           <h2
//             id="benefits-title"
//             className="text-[28px] sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[44px] font-semibold text-[#101828] text-center tracking-[-0.02em] mb-8 md:mb-12"
//           >
//             Why Choose ReconXi for Enterprises?
//           </h2>

//           <div className="flex flex-col items-center gap-6 md:gap-8 w-full">
//             {/* Top two cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
//               {benefits.slice(0, 2).map((benefit, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
//                   role="listitem"
//                 >
//                   <h3 className="text-[20px] leading-[30px] font-semibold text-[#2A2A2A] mb-3">
//                     {benefit.title}
//                   </h3>
//                   <p className="text-[16px] leading-[24px] text-[#3B3E45]">
//                     {benefit.description}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Center card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//               className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow w-full md:w-1/2"
//               role="listitem"
//             >
//               <h3 className="text-[20px] leading-[30px] font-semibold text-[#2A2A2A] mb-3">
//                 {benefits[2].title}
//               </h3>
//               <p className="text-[16px] leading-[24px] text-[#3B3E45]">
//                 {benefits[2].description}
//               </p>
//             </motion.div>
//           </div>
//         </motion.div>
//       </Container>
//     </section>
//   );
// }

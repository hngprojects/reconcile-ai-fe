import React from "react";
import Link from "next/link";
import { Dot } from "lucide-react";

const TableOfContents = () => {
  const data = [
    {
      link: "Introduction",
      target: "#Introduction",
    },
    {
      link: "Information We Collect",
      target: "#Information We Collect",
    },
    {
      link: "How We Use Your Information",
      target: "#How We Use Your Information",
    },
    {
      link: "Data Sharing and Security",
      target: "#Data Sharing and Security",
    },
    {
      link: "Your Choices and Rights",
      target: "#Your Choices and Rights",
    },
    {
      link: "Policy Updates",
      target: "#Policy Updates",
    },
    {
      link: "Contact Us",
      target: "#Contact Us",
    },
    {
      link: "Last Updated",
      target: "#Last Updated",
    },
  ];

  return (
    <div className="py-24 max-lg:py-16 hidden lg:flex flex-col">
      <h2 className="text-3xl max-lg:text-2xl font-semibold mb-4">
        Table of Contents
      </h2>
      <nav className="flex flex-col gap-2 text-[16px] list-none">
        {data.map((item, index) => (
          <li className="flex" key={index}>
            <Dot />
            <Link href={item.target}>{item.link}</Link>
          </li>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;

import React from "react";

const PrivacyPolicies = () => {
  const data = [
    {
      title: "Introduction",
      textlist: [
        "At ReconXi, we value your privacy and are committed to safeguarding your personal information. This Privacy Policy explains what data we collect, how we use it, and the steps we take to ensure its security. By using our services, you agree to the terms outlined in this policy.",
      ],
    },
    {
      title: "Information We Collect",
      textlist: [
        "We collect information to deliver and improve our reconciliation services, including:",
        "Transactional Data: Details of financial records, transfers, and reconciliation transactions.",
        "Personal Information: Such as account details, names, email addresses, and phone numbers provided during registration or service use.",
        "Usage Data: Log files, device information, and analytics that help us understand how you interact with our platform.",
        "Other Data: Additional information you provide or that is automatically collected to enhance your experience.",
      ],
    },
    {
      title: "How We Use Your Information",
      textlist: [
        "We collect information to deliver and improve our reconciliation services, including:",
        "Transactional Data: Details of financial records, transfers, and reconciliation transactions.",
        "Personal Information: Such as account details, names, email addresses, and phone numbers provided during registration or service use.",
        "Usage Data: Log files, device information, and analytics that help us understand how you interact with our platform.",
        "Other Data: Additional information you provide or that is automatically collected to enhance your experience.",
      ],
    },
    {
      title: "Data Sharing and Security",
      textlist: [
        "We do not sell your personal information to third parties.",
        "We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse. While we strive for maximum security, please be aware that no system is completely foolproof.",
      ],
    },
    {
      title: "Your Choices and Rights",
      textlist: [
        "You have certain rights regarding your personal information, including:",
        "Access & Correct Your Data: Update or modify your account details anytime.Delete Your Data: Request data deletion, subject to compliance with legal obligations.Manage Cookies & Tracking: Adjust settings in your browser to control cookies and tracking mechanisms.",
      ],
    },
    {
      title: "Policy Updates",
      textlist: [
        "Policy Updates We may revise this Privacy Policy periodically. Any updates will be posted on our platform, and significant changes will be communicated to you.",
      ],
    },
    {
      title: "Contact Us",
      textlist: [
        "For any privacy-related concerns, reach out to us at info@ReconXi.com.",
      ],
    },
    {
      title: "Last Updated",
      textlist: [
        "This Privacy Policy was last updated on 05/03/2025.",
        "For more information about our terms and conditions, please visit our Terms and Conditions page.",
      ],
    },
  ];
  return (
    <div
      className="flex flex-col gap-[30px] w-full md:w-[80vw] lg:w-[700px] mx-auto
    px-8 py-24 max-lg:py-16
    "
    >
      {data.map((item, index) => (
        <div key={index} id={item.title}>
          <h4 className=" text-2xl max-lg:text-xl font-semibold mb-4">
            {item.title}
          </h4>
          <ul className="list-none flex flex-col gap-8 max-lg:gap-4">
            {item.textlist.map((text, index) => (
              <li className="max-lg:text-sm" key={index}>
                {text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicies;

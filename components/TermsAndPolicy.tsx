import React from "react";

const TermsAndPolicy = () => {
  const data = [
    {
      title: "Introduction",
      textlist: [
        "Reconcile AI is a data reconciliation software that leverages AI-powered automation to streamline financial, operational, and business data matching. It helps businesses detect discrepancies, automate workflows, and generate reports. The platform integrates with third-party applications and prioritizes security and compliance.",
      ],
    },
    {
      title: "What information do we collect?",
      textlist: [
        "We collect information to deliver and improve our reconciliation services, including:",
        "Transactional Data: Details of financial records, transfers, and reconciliation transactions.",
        "Personal Information: Such as account details, names, email addresses, and phone numbers provided during registration or service use.",
        "Usage Data: Log files, device information, and analytics that help us understand how you interact with our platform.",
        "Other Data: Additional information you provide or that is automatically collected to enhance your experience.",
      ],
    },
    {
      title: "How do we use your information?",
      textlist: [
        "We collect information to deliver and improve our reconciliation services, including:",
        "Transactional Data: Details of financial records, transfers, and reconciliation transactions.",
        "Personal Information: Such as account details, names, email addresses, and phone numbers provided during registration or service use.",
        "Usage Data: Log files, device information, and analytics that help us understand how you interact with our platform.",
        "Other Data: Additional information you provide or that is automatically collected to enhance your experience.",
      ],
    },
    {
      title: "Cookies and Tracking Technologies",
      textlist: [
        "We use cookies and similar technologies to:",
        "Personalize your experience and remember your preferences.",
        "Analyze website traffic and improve our services.",
        "Deliver tailored content and advertisements.",
        "You can manage your cookie preferences through your browser settings.",
      ],
    },
    {
      title: "Retention of Your Information",
      textlist: [
        "We retain your data only as long as necessary to fulfill the purposes for which it was collected, including compliance with legal and regulatory obligations. Once the retention period expires, we will securely delete or anonymize your information.",
      ],
    },
    {
      title: "Data Security",
      textlist: [
        "We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse. While we strive for maximum security, please be aware that no system is completely foolproof.",
      ],
    },
    {
      title: "Your privacy rights",
      textlist: [
        "Depending on your location, you may have rights regarding your personal information, including the ability to access, correct, or delete your data. For more detailed information, please review our Privacy Policy.",
      ],
    },
    {
      title: "Contact Us",
      textlist: [
        "If you have any questions about these Terms of Service or our privacy practices, please contact us at:",
        "Email: [reconXi@gmail.com]",
        "Phone: [09012345789]",
        "Address: [Melbourne, Australia]",
        "We are committed to addressing privacy concerns promptly and transparently.",
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
        <div key={index}>
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

export default TermsAndPolicy;

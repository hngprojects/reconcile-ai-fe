interface ReleaseItem {
  id: string;
  date: string;
  version: string;
  isNew: boolean;
  bannerIntro: string;
  bannerTitle: string;
  bannerColor: string;
  content: {
    heading: string;
    intro: string;
    mainText: string;
    videoUrl?: string;
    sections: {
      title: string;
      items?: string[];
      text?: string;
    }[];
    feedback: {
      text: string;
      email: string;
    };
  };
}

export const releases: ReleaseItem[] = [
  {
    id: "release-0-1",
    date: "06 March 2025",
    version: "ReconXi Version Release 0.1",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 0.1! ",
    bannerTitle: "Reconciliation Made Simple and  Stress-Free",
    bannerColor: "#e0f7e0",
    content: {
      heading: "Hey Community",
      intro:
        "Welcome to ReconXi 0.1! The best AI-powered reconciliation tool that makes financial reconciliation faster, and easier. What is good about this? Everything can be done in minutes! Just smart automation that gets the job done! Get ready to experience smarter and faster way on reconciling data with ReconXi!",
      mainText: "What’s in Today?",
      videoUrl: "/assets/video/version0-1.MOV",
      sections: [
        {
          title: "What's New?",
          text: "Product: AI-Powered Reconciliation",
        },
        {
          title: "File Upload for Reconciliation",
          items: [
            "Users can now upload their bank statements and company ledger in CSV format only, and start the reconciliation process without the need to sign up.",
            "Automatic transaction matching between bank statements and company ledgers using AI",
            "Transactions are matched based on amounts, descriptions, and dates.",
            "Matched transactions are tagged in green.",
            "Unmatched transactions are tagged in red.",
            "AI-powered system for faster processing.",
            "Only CSV files are supported. Other formats will be considered in future releases.",
          ],
        },
        {
          title: "Known Limitations",
          items: [
            "AI matching is currently at 60% while future updates will improve the precision.",
            "Only CSV files are supported for upload. Other formats will be considered in future releases.",
          ],
        },
        {
          title: "What's Coming Next?",
          items: ["Export functionality for reconciled data."],
        },
      ],
      feedback: {
        text: "Got feedback? Tell us at support@reconxi.com",
        email:
          "Thanks for using ReconXi! The simplest way to reconcile with confidence!",
      },
    },
  },
  {
    id: "release-0-2",
    date: "07 March 2025",
    version: "ReconXi Version Release 0.2",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 0.2! ",
    bannerTitle: "Reconciliation Made Simpler and Easier",
    bannerColor: "#e0f7e0",
    content: {
      heading: "ReconXi Just Got Better!",
      intro:
        "ReconXi v0.2 is here, bringing even better performance, faster processing, and exporting to your data reconciliation tasks. We've improved the system to allow access for exporting reconciled data, ensuring a more efficient experience. Get ready to work smarter with ReconXi!",
      mainText: "We're live!",
      videoUrl: "/assets/video/version0-2.MOV",
      sections: [
        {
          title: "What's New?",
          // text: "Product: AI-Powered Reconciliation",
        },
        {
          title: "File Export",
          text: "In this new update, we have introduced the export reconciliation results; the export feature includes both matched and unmatched records.",
        },
        {
          title: "AI-Powered Bank Reconciliation",
          items: [
            "Users can now export reconciliation results only in CSV for future reference",
            "Exported files include details of both matched and unmatched transactions",
          ],
        },
        {
          title: "Known Limitations",
          items: [
            "Currently, exports are only available in CSV format (other formats may come in future versions)",
          ],
        },
        {
          title: "What's Coming Next?",
          items: ["Free reconciliation for up to 5 times without sign-up."],
        },
      ],
      feedback: {
        text: "Got feedback? Tell us at support@reconxi.com",
        email:
          "Thanks for using ReconXi! The simplest way to reconcile with confidence!",
      },
    },
  },
  {
    id: "release-0-3",
    date: "10 March 2025",
    version: "ReconXi Version Release 0.3",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 0.3",
    bannerTitle: "Reconciliation Made Simpler and Easier",
    bannerColor: "#e0f7e0",
    content: {
      heading: "Update Alert!",
      intro:
        "ReconXi v0.3 is here!! This update gives you access to use the ReconXi tool with limited trials of up to 5 uses!  With this update, you get to explore every available feature on the tool without restriction. Try it out, explore the possibilities, and see how ReconXi can transform your workflow!",
      mainText: "What's in today?",
      videoUrl: "/assets/video/version0-3.MOV",
      sections: [
        {
          title: "What's New?",
          text: "Product: AI-Powered Reconciliation",
        },
        {
          title: "Limited Trials for Users",
          text: "With Version 0.3, users can now perform up to 5 free reconciliation sessions. Each session includes file uploads, AI-powered matching, and export functionality.",
        },
        {
          title: "What this means?",
          items: [
            "Limited Free Access – Up to 5 Reconciliations",
            "Users can now perform up to 5 reconciliation sessions for free.",
            "Each reconciliation session includes full access to file uploads, AI-powered matching, and export functionality.",
            "Once the limit is reached, users will not be able to use free access.",
          ],
        },
        {
          title: "Known Limitations",
          items: [
            "The version only allows limit of trials after which users will not be able to reconcile unless signed in",
          ],
        },
        {
          title: "What's Coming Next?",
          items: ["User Registration and Authentication."],
        },
      ],
      feedback: {
        text: "Got feedback? Tell us at support@reconxi.com",
        email:
          "Thanks for using ReconXi! The simplest way to reconcile with confidence!",
      },
    },
  },
  {
    id: "release-0-4",
    date: "10 March 2025",
    version: "ReconXi Version Release 0.4",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 1.4! ",
    bannerTitle: "Reconciliation Made Simple and Stress-Free",
    bannerColor: "#e0f7e0",
    content: {
      heading: "Hey Community,",
      intro:
        "The ReconXi v0.4 here! We've brought you an exciting update on User Authentication. As a user of this tool, you can now easily sign up on the platform using your Google Account. This update aims at bringing ease of signing up for you as a user. ",
      mainText: "New Feature Update",
      videoUrl: "/assets/video/version0-4.MOV",
      sections: [
        {
          title: "User Registration and Authentication",
          text: "This update introduces user accounts, allowing users to sign up and log in for a more personalized experience. New Users can now register and log in using their Google account.",
        },
        {
          title: "What’s New?",
          items: [
            "Sign-Up/Sign-in with Google",
            "New users can create an account or log in using their Google account for quick and secure access.",
            "The Sign In option give users access to Reconcile without Limits",
          ],
        },
        {
          title: "Feature Limitations",
          items: [
            "Currently, only Google sign-up is supported (email/password registration may come in future updates).",
          ],
        },
        {
          title: "What's Coming Next?",
          items: ["Manual override by users."],
        },
      ],
      feedback: {
        text: "Got feedback? Tell us at support@reconxi.com",
        email:
          "Thanks for using ReconXi! The simplest way to reconcile with confidence!",
      },
    },
  },
  {
    id: "release-0-5",
    date: "11 March 2025",
    version: "ReconXi Version Release 0.5",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 1.5! ",
    bannerTitle: "Reconciliation Made Simple and Stress-Free",
    bannerColor: "#e0f7e0",
    content: {
      heading: "Hey Community,",
      intro:
        "Version 0.5 introduces the ability for users to manually search for and match unmatched transactions within the reconciliation platform. This update ensures greater accuracy and completeness in financial records by allowing users to identify and reconcile transactions that were not automatically matched. ",
      mainText: "New Features & Improvements",
      videoUrl: "/assets/video/version0-5.mp4",
      sections: [
        {
          title: "Manual Matching of Unmatched Records",
          items: [
            "Users can now search for unmatched transactions using any details (e.g., a name from the record).",
            "Users can select an unmatched transaction and manually match it with a corresponding record from either the bank statement or the company ledger.",
            'Once a transaction is manually matched, the system automatically updates its status to "Matched" in the user interface.',
            "Users see instant visual feedback upon successful matching, such as a status change or notification.",
          ],
        },
        {
          title: "Impact & Benefits",
          items: [
            "More accuracy in financial reconciliation. ",
            "Greater user control over unmatched transactions.",
            "Improved transparency with real-time status updates.",
          ],
        },
        {
          title: "Feature Limitations",
          items: ["Filtering options are not yet available in this version."],
        },
        {
          title: "What's Coming Next?",
          items: [
            "This update sets the foundation for future improvements, including unlinking of matched result and manually matching with a new record.",
          ],
        },
      ],
      feedback: {
        text: "Got feedback? Tell us at support@reconxi.com",
        email:
          "Thanks for using ReconXi! The simplest way to reconcile with confidence!",
      },
    },
  },

  {
    id: "release-0-6",
    date: "17 March 2025",
    version: "ReconXi Version Release 0.6",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 0.6! ",
    bannerTitle: "Reconciliation Made Simple and Stress-Free",
    bannerColor: "#e0f7e0",
    content: {
      heading: "Hey Community,",
      intro:
        "Version 0.6 introduces an important improvement to the reconciliation process, allowing users to manually manage their transaction matches. This feature empowers users to unlink incorrectly matched transactions and manually associate them with the correct records, improving data accuracy and reducing reconciliation errors.",
      mainText: "What's New?",
      videoUrl: "/assets/video/version0-6.mp4",
      sections: [
        {
          title: "New Features",
          items: [
            'Unlink Incorrectly Matched Transactions: Users can now unlink any transaction that has been incorrectly matched by the AI, resetting its status to "Unmatched."',
            "Manually Match Transactions: Users can select an unmatched transaction and manually link it to the correct record.",
            "Immediate Feedback on Re-Matching: The system provides instant confirmation when a transaction is successfully re-matched, ensuring transparency in the reconciliation process.",
          ],
        },
        {
          title: "User Benefits",
          items: [
            "User control over transaction matching.",
            "Reduction of reconciliation discrepancies.",
            "Improved data accuracy and compliance.",
          ],
        },
        {
          title: "Limitations",
          items: [
            "Users must manually search for the correct match, as there is no automatic suggestion system in this version.",
            "No bulk unlinking or matching functionality; transactions must be handled individually.",
            "System audit logs for manual changes are limited.",
          ],
        },
        {
          title: "How to Use",
          items: [
            "Navigate to the reconciliation page.",
            "Select a transaction that has been incorrectly matched.",
            'Click on the "Unlink" button option to reset the status.',
            "Manually choose the correct transaction match.",
            "Confirm the match and receive an updated match on the reconciliation status.",
          ],
        },
        {
          title: "Coming Soon!",
          items: [
            "This update sets the foundation for future improvements, including unlinking of matched result and manually matching with a new record.",
            "Advanced Search and Match: This will allow Authenticated users to filter their search. They can filter based on amount range, description, and date.",
          ],
        },
      ],
      feedback: {
        text: "Got feedback? Tell us at support@reconxi.com",
        email:
          "Thanks for using ReconXi! The simplest way to reconcile with confidence!",
      },
    },
  },

  {
    id: "release-0-7",
    date: "17 March 2025",
    version: "ReconXi Version Release 0.7",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 0.7! ",
    bannerTitle: "Reconciliation Made Simple and Stress-Free",
    bannerColor: "#e0f7e0",
    content: {
      heading: "Hey Community,",
      intro:
        "Version 0.7 enhances the reconciliation interface by introducing advanced filtering capabilities for unmatched records. Users can now efficiently search for transactions using date and amount range filters, significantly improving the accuracy and speed of the matching process.",
      mainText: "What's New?",
      videoUrl: "/assets/video/version0-7.mp4",
      sections: [
        {
          title: "New Features",
          items: [
            "Filter by Date Range: Users can specify a start and end date to narrow down unmatched transactions.",
            "Filter by Amount Range: Users can input minimum and maximum transaction amounts to refine their search.",
            "Combined Filtering: Users can apply both date and amount filters simultaneously for more precise results.",
            "User-Friendly Interface: The filtering options are clearly visible and easy to use within the reconciliation module.",
            "Restricted Access: This feature is available only to authenticated users.",
            "Real-Time Filtering Results: The system dynamically updates the display, showing only unmatched records that meet the specified criteria.",
            "Quick Match Selection: Once users identify the correct record, they can manually match transactions and update the reconciliation status instantly.",
          ],
        },
        {
          title: "User Benefits",
          items: [
            "Faster and more efficient transaction matching.",
            "Reduced manual effort in locating unmatched records.",
            "Improved reconciliation accuracy.",
          ],
        },
        {
          title: "Limitations",
          items: [
            "Filtering is limited to date and amount ranges; additional filter criteria (e.g., transaction type) are not yet available.",
            "Users still need to manually review and match transactions after filtering.",
            "This Update is only available for Authenticated Users.",
          ],
        },
        {
          title: "How to Use",
          items: [
            "Log in to the system (authentication required).",
            "Navigate to the reconciliation page..",
            "Use the filtering panel to set a date range and/or amount range.",
            "Apply the filters to view the refined list of unmatched transactions.",
            "Select and confirm the correct match.",
            "Receive instant confirmation of the updated reconciliation status.",
          ],
        },
        {
          title: "What's Coming Soon?",
          items: ["Version 0.8: Improved Reconciliation Accuracy. "],
        },
      ],
      feedback: {
        text: "Got feedback? Tell us at support@reconxi.com",
        email:
          "Thanks for using ReconXi! the simplest way to reconcile with confidence!",
      },
    },
  },

  {
    id: "release-0-8",
    date: "19 March 2025",
    version: "ReconXi Version Release 0.8",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 0.8! ",
    bannerTitle: "Reconciliation Made Simple and Stress-Free",
    bannerColor: "#e0f7e0",
    content: {
      heading: "Hey Community,",
      intro:
        "Version 0.8 introduces a more dynamic way of reconciliation. This version enhances accuracy in reconciliation by processing transactions in structured batches. This update now allows user to reconcile data files with more rows.",
      mainText: "What's New?",
      sections: [
        {
          title: "New Features",
          items: [
            "Advanced Reconciliation: More advanced accuracy that allows users to upload and reconcile files up to 3000 rows of data",
            "AI-Powered Matching: The system identifies and marks exact matches within each processing window based on date and amount.",
            "User Confirmation: Users can review, confirm, or correct AI-suggested matches before finalizing them.",
            "The improved version now allows users to reconcile a larger volume of data with more accuracy and speed.",
          ],
        },
        {
          title: "Limitations",
          items: [
            "The AI model currently matches only exact date and amount pairs; fuzzy matching (e.g., similar descriptions) is not yet supported.",
            "Requires user validation for final reconciliation to ensure accuracy.",
          ],
        },
        {
          title: "What’s Coming Next?",
          items: [
            "Email notification for reconciled results. This update aims to make large reconciliations easier by sending an automatic email when the reconciliation process is complete.",
          ],
        },
        {
          title: "What's Coming Soon?",
          items: ["Email notification for reconciled results. This update aims to make large reconciliations easier by sending an automatic email when the reconciliation process is complete.", "Stay tuned for upcoming versions with even more improvements!"],
        },
      ],
      feedback: {
        text: "Got feedback? Tell us at support@reconxi.com",
        email:
          "Thanks for using ReconXi! the simplest way to reconcile with confidence!",
      },
    },
  },

  {
    id: "release-0-9",
    date: "20 March 2025",
    version: "ReconXi Version Release 0.9",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 0.9! ",
    bannerTitle: "Email Notifications for Reconciled Results",
    bannerColor: "#e0f7e0",
    content: {
      heading: "Hey Community,",
      intro:
        "Version 0.9 enhances user experience by implementing automated email notifications for reconciliation completion. Users are notified when their reconciliation is ready, eliminating the need for constant manual checks.",
      mainText: "What's New?",
      videoUrl: "/assets/video/version0-9.mp4",
      sections: [
        {
          title: "New Features",
          items: [
            "Email Notifications: Users receive an email once the reconciliation process is complete.",
            "Direct Access Link: Emails include a link to view the reconciled results in the application.",
            "Authentication Prompt: If a user is not logged in, they must authenticate before accessing reconciliation results.",
            "Responsive Email Design: Notifications are optimized for both desktop and mobile viewing.",
          ],
        },
        {
          title: "Limitations",
          items: [
            "No customizable notification preferences in this version; all users receive default email alerts.",
            "The email contains only a brief and a link; it does not provide detailed reconciliation data..",
          ],
        },
        {
          title: "What’s Coming Next?",
          items: [
            "Email notification for reconciled results. This update aims to make large reconciliations easier by sending an automatic email when the reconciliation process is complete.",
          ],
        },
        {
          title: "What's Coming Soon?",
          items: [
            "Email notification for reconciled results. This update aims to make large reconciliations easier by sending an automatic email when the reconciliation process is complete. ",
          ],
        },
      ],
      feedback: {
        text: "Got feedback? Tell us at support@reconxi.com",
        email:
          "Thanks for using ReconXi! the simplest way to reconcile with confidence!",
      },
    },
  },

  {
    id: "release-0-10",
    date: "21 March 2025",
    version: "ReconXi Version Release 0.10",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 0.10! ",
    bannerTitle: "Email Notifications for Reconciled Results",
    bannerColor: "#e0f7e0",
    content: {
      heading: "Hey Community,",
      intro:
        "Version 1.0 introduces the ability to merge multiple records into a single transaction match, reducing discrepancies caused by split payments or duplicate entries.This version introduces the ability to merge multiple records either from the bank statement or company ledger into a single matched entry. For example, if a client paid for two projects in one transaction, the system allows the user to merge two separate company ledger entries into one matched transaction from the bank statement.",
      mainText: "What's New?",
      // videoUrl: "/assets/video/version0-9.mp4",
      sections: [
        {
          title: "New Features",
          items: [
            "Multi-Record Selection: Users can select multiple transactions from either the bank statement or company ledger.",
            'Merge Button: A new "Merge" option is enabled after selecting relevant records.',
            "Single Transaction Creation: Merging combines selected records into one matched transaction, updating the status accordingly.",
            "Confirmation and Summary: Users receive confirmation and a detailed summary of the merged records.",
          ],
        },
        {
          title: "Limitations",
          items: [
            "Only manual merging is supported; AI-driven merging recommendations are not yet available.",
            "Once merged, transactions cannot be split again (the undo function is not available in this version).",
          ],
        },
        {
          title: "What’s Coming Next?",
          items: [
            "Email notification for reconciled results. This update aims to make large reconciliations easier by sending an automatic email when the reconciliation process is complete.",
          ],
        },
        {
          title: "What's Coming Soon?",
          items: [
            "Platform subscriptions where we introduce subscription-based models that are categorized for different users.",
            "Merging Multiple file records that allow users to upload more files at a go for reconciliation. This update looks to give users more control over their reconciliation process.",
          ],
        },
      ],
      feedback: {
        text: "Got feedback? Tell us at support@reconxi.com",
        email:
          "Thanks for using ReconXi! the simplest way to reconcile with confidence!",
      },
    },
  },
];

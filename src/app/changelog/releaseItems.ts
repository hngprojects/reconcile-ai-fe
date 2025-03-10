interface ReleaseItem {
  id: string;
  date: string;
  version: string;
  isNew: boolean;
  bannerIntro: string;
  bannerTitle: string;
  bannerColor: string;
  content: {
    mainText: string;
    // videoUrl: string;
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
    id: "release-1-0",
    date: "7 March 2025",
    version: "ReconXi Version Release 1.0",
    isNew: true,
    bannerIntro:"Welcome to ReconXi 1.0! ",
    bannerTitle: "Reconciliation Made Simple and Easier",
    bannerColor: "#e0f7e0",
    content: {
      mainText:
        "What's in today?",
      // videoUrl:
      //   "/assets/video/version1.mp4",
      sections: [
        {
          title: "What's New?",
          // text: "Product: AI-Powered Reconciliation",
        },
        {
          title: "File Upload for Reconciliation",
          text: "Users can now upload their bank statements and company ledger in CSV format only, and start the reconciliation process without the need for sign-up.",
        },
        {
          title: "AI-Powered Bank Reconciliation",
          items: [
            "Automated matching of bank transactions with company ledgers using AI",
            "Transactions are matched based on amounts, descriptions, and dates",
            "Matched transactions are marked as green",
            "Unmatched transactions are marked as red",
            "Only CSV files supported. Other formats will be considered in future releases.",
          ],
        },
        {
          title: "Known Limitations",
          items: [
            "Processing accuracy is currently at 85% while future updates will improve the precision.",
            "Maximum file size is 3MB. Larger formats will be introduced in future releases.",
          ],
        },
        {
          title: "What's Coming Next?",
          items: [
            "Export functionality for reconciled data.",
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
    id: "release-1-1",
    date: "9 March 2025",
    version: "ReconXi Version Release 1.1",
    isNew: true,
    bannerIntro:"Welcome to ReconXi 1.1! ",
    bannerTitle: "Reconciliation Made Simpler and Easier",
    bannerColor: "#e0f7e0",
    content: {
      mainText:
        "We're live.",
      // videoUrl:
      //   "/assets/video/version1.mp4",
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
            "Processing accuracy is currently at 85% while future updates will improve the precision.",
            "Maximum file size is 5MB. Larger formats will be introduced in future releases.",
          ],
        },
        {
          title: "What's Coming Next?",
          items: [
            "Export functionality for reconciled data.",
            "Live manual edits and more speed!",
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
  // {
  //   id: "release-1-2",
  //   date: "7 March 2025",
  //   version: "ReconXi Version Release 1.2",
  //   isNew: true,
  //   bannerIntro:"Welcome to ReconXi 1.0! ",
  //   bannerTitle: "Reconciliation Made Simple and Stress-Free",
  //   bannerColor: "#e0f7e0",
  //   content: {
  //     // mainText:
  //       // "For the best AI-powered reconciliation tool that makes financial reconciliation faster, easier, and more accurate. ReconXi provides users with more accurate matching and error-free reconciliation. What's good about that?",
  //   //   videoUrl:
  //   //     "/assets/video/version1.mp4",
  //     sections: [
  //       {
  //         title: "What's New?",
  //         text: "Product: AI-Powered Reconciliation",
  //       },
  //       {
  //         title: "File Upload for Reconciliation",
  //         text: "Users can now upload their bank statements and company ledger in CSV format only, and start the reconciliation process without the need for sign-up.",
  //       },
  //       {
  //         title: "AI-Powered Bank Reconciliation",
  //         items: [
  //           "Automated matching of bank transactions with company ledgers using AI",
  //           "Transactions are matched based on amounts, descriptions, and dates",
  //           "Matched transactions are marked as green",
  //           "Unmatched transactions are marked as red",
  //           "AI-powered system for faster processing",
  //           "Only CSV files supported. Other formats will be considered in future releases.",
  //         ],
  //       },
  //       {
  //         title: "Known Limitations",
  //         items: [
  //           "Processing accuracy is currently at 85% while future updates will improve the precision.",
  //           "Maximum file size is 5MB. Larger formats will be introduced in future releases.",
  //         ],
  //       },
  //       {
  //         title: "What's Coming Next?",
  //         items: [
  //           "Export functionality for reconciled data.",
  //           "Live manual edits and more speed!",
  //         ],
  //       },
  //     ],
  //     feedback: {
  //       text: "Got feedback? Tell us at support@reconxi.com",
  //       email:
  //         "Thanks for using ReconXi! The simplest way to reconcile with confidence!",
  //     },
  //   },
  // },
  // {
  //   id: "release-1-3",
  //   date: "7 March 2025",
  //   version: "ReconXi Version Release 1.0",
  //   isNew: true,
  //   bannerIntro:"Welcome to ReconXi 1.0! ",
  //   bannerTitle: "Reconciliation Made Simple and Stress-Free",
  //   bannerColor: "#e0f7e0",
  //   content: {
  //     // mainText:
  //       // "For the best AI-powered reconciliation tool that makes financial reconciliation faster, easier, and more accurate. ReconXi provides users with more accurate matching and error-free reconciliation. What's good about that?",
  //   //   videoUrl:
  //   //     "/assets/video/version1.mp4",
  //     sections: [
  //       {
  //         title: "What's New?",
  //         text: "Product: AI-Powered Reconciliation",
  //       },
  //       {
  //         title: "File Upload for Reconciliation",
  //         text: "Users can now upload their bank statements and company ledger in CSV format only, and start the reconciliation process without the need for sign-up.",
  //       },
  //       {
  //         title: "AI-Powered Bank Reconciliation",
  //         items: [
  //           "Automated matching of bank transactions with company ledgers using AI",
  //           "Transactions are matched based on amounts, descriptions, and dates",
  //           "Matched transactions are marked as green",
  //           "Unmatched transactions are marked as red",
  //           "AI-powered system for faster processing",
  //           "Only CSV files supported. Other formats will be considered in future releases.",
  //         ],
  //       },
  //       {
  //         title: "Known Limitations",
  //         items: [
  //           "Processing accuracy is currently at 85% while future updates will improve the precision.",
  //           "Maximum file size is 5MB. Larger formats will be introduced in future releases.",
  //         ],
  //       },
  //       {
  //         title: "What's Coming Next?",
  //         items: [
  //           "Export functionality for reconciled data.",
  //           "Live manual edits and more speed!",
  //         ],
  //       },
  //     ],
  //     feedback: {
  //       text: "Got feedback? Tell us at support@reconxi.com",
  //       email:
  //         "Thanks for using ReconXi! The simplest way to reconcile with confidence!",
  //     },
  //   },
  // },
  // {
  //   id: "release-1-4",
  //   date: "7 March 2025",
  //   version: "ReconXi Version Release 1.0",
  //   isNew: true,
  //   bannerIntro:"Welcome to ReconXi 1.0! ",
  //   bannerTitle: "Reconciliation Made Simple and Stress-Free",
  //   bannerColor: "#e0f7e0",
  //   content: {
  //     // mainText:
  //       // "For the best AI-powered reconciliation tool that makes financial reconciliation faster, easier, and more accurate. ReconXi provides users with more accurate matching and error-free reconciliation. What's good about that?",
  //   //   videoUrl:
  //   //     "/assets/video/version1.mp4",
  //     sections: [
  //       {
  //         title: "What's New?",
  //         text: "Product: AI-Powered Reconciliation",
  //       },
  //       {
  //         title: "File Upload for Reconciliation",
  //         text: "Users can now upload their bank statements and company ledger in CSV format only, and start the reconciliation process without the need for sign-up.",
  //       },
  //       {
  //         title: "AI-Powered Bank Reconciliation",
  //         items: [
  //           "Automated matching of bank transactions with company ledgers using AI",
  //           "Transactions are matched based on amounts, descriptions, and dates",
  //           "Matched transactions are marked as green",
  //           "Unmatched transactions are marked as red",
  //           "AI-powered system for faster processing",
  //           "Only CSV files supported. Other formats will be considered in future releases.",
  //         ],
  //       },
  //       {
  //         title: "Known Limitations",
  //         items: [
  //           "Processing accuracy is currently at 85% while future updates will improve the precision.",
  //           "Maximum file size is 5MB. Larger formats will be introduced in future releases.",
  //         ],
  //       },
  //       {
  //         title: "What's Coming Next?",
  //         items: [
  //           "Export functionality for reconciled data.",
  //           "Live manual edits and more speed!",
  //         ],
  //       },
  //     ],
  //     feedback: {
  //       text: "Got feedback? Tell us at support@reconxi.com",
  //       email:
  //         "Thanks for using ReconXi! The simplest way to reconcile with confidence!",
  //     },
  //   },
  // },
  // {
  //   id: "release-1-5",
  //   date: "7 March 2025",
  //   version: "ReconXi Version Release 1.5",
  //   isNew: true,
  //   bannerIntro:"Welcome to ReconXi 1.0! ",
  //   bannerTitle: "Free Reconciliation Limit",
  //   bannerColor: "#e0f7e0",
  //   content: {
  //     // mainText:
  //       // "Managing users Files Made Easy! In this update, we have added a File Size Limit to help you work with large data files more easily and efficiently. This ensures smoother uploads and better processing without slowdowns.",
  //   //   videoUrl:
  //   //     "/assets/video/version1.mp4",
  //     sections: [
  //       {
  //         title: "Limited Free Access - Up to 5 Reconciliations",
  //         items: [
  //           "Users can now perform up to 5 reconciliations sessions for free.",
  //           "After the limit is reached, users will need to be subscribed to the service, AI-powered matching, and export functionality.",
  //         ],
  //       },
  //     ],
  //     feedback: {
  //       text: "Got Feedback? Tell us at support@reconxi.com",
  //       email:
  //         "Thanks for using ReconXi! The simplest way to reconcile with confidence!",
  //     },
  //   },
  // },
];

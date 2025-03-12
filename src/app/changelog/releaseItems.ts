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
    videoUrl: string;
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
    date: "06 March 2025",
    version: "ReconXi Version Release 1.0",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 1.0! ",
    bannerTitle: "Reconciliation Made Simple and Easier",
    bannerColor: "#e0f7e0",
    content: {
      heading: "Hey Community",
      intro:
        "Welcome to ReconXi 1.0! The best AI-powered reconciliation tool that makes financial reconciliation faster, and easier. What is good about this? Everything can be done in minutes! Just smart automation that gets the job done! Get ready to experience smarter and faster way on reconciling data with ReconXi!",
      mainText: "What's in today?",
      videoUrl: "/video/version1.mp4",
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
            "Maximum file size is 2MB. Larger formats will be introduced in future releases.",
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
    id: "release-1-1",
    date: "09 March 2025",
    version: "ReconXi Version Release 1.1",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 1.1! ",
    bannerTitle: "Reconciliation Made Simpler and Easier",
    bannerColor: "#e0f7e0",
    content: {
      heading: "ReconXi Just Got Better!",
      intro:
        "ReconXi v1.1 is here, bringing even better performance, faster processing, and exporting to your data reconciliation tasks. We've improved the system to allow access for exporting reconciled data, ensuring a more efficient experience. Get ready to work smarter with ReconXi!",
      mainText: "We're live!",
      videoUrl: "/video/version1-1.mp4",
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
  {
    id: "release-1-2",
    date: "10 March 2025",
    version: "ReconXi Version Release 1.2",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 1.2",
    bannerTitle: "Reconciliation Made Simpler and Easier",
    bannerColor: "#e0f7e0",
    content: {
      heading: "Update Alert!",
      intro:
        "ReconXi v1.2 is here!! This update gives you access to use the ReconXi tool with limited trials of up to 5 uses!  With this update, you get to explore every available feature on the tool without restriction. Try it out, explore the possibilities, and see how ReconXi can transform your workflow!",
      mainText: "What's in today?",
      videoUrl: "/video/version1-1.mp4",
      sections: [
        {
          title: "What's New?",
          text: "Product: AI-Powered Reconciliation",
        },
        {
          title: "Limited Trials for Users",
          text: "With Version 1.2, users can now perform up to 5 free reconciliation sessions. Each session includes file uploads, AI-powered matching, and export functionality.",
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
    id: "release-1-3",
    date: "10 March 2025",
    version: "ReconXi Version Release 1.3",
    isNew: true,
    bannerIntro: "Welcome to ReconXi 1.3! ",
    bannerTitle: "Reconciliation Made Simple and Stress-Free",
    bannerColor: "#e0f7e0",
    content: {
      heading: "Hey Community,",
      intro:
        "The ReconXi v1.3 here! We've brought you an exciting update on User Authentication. As a user of this tool, you can now easily sign up on the platform using your Google Account. This update aims at bringing ease of signing up for you as a user. ",
      mainText: "New Feature Update",
      videoUrl: "/video/version1-1.mp4",
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

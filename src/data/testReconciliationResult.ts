export const reconciliationData = {
  matches: [
    {
      file1_transaction: {
        Date: "12/02/24",
        Description: "Naza",
        Amount: "50,000",
      },
      file2_transaction: {
        Date: "12/02/24",
        Description: "Naza",
        Amount: "50,000",
      },
      match_score: 100,
    },
    {
      file1_transaction: {
        Date: "12/02/24",
        Description: "Tunde",
        Amount: "40,000",
      },
      file2_transaction: {
        Date: "12/02/24",
        Description: "Tunde",
        Amount: "40,000",
      },
      match_score: 100,
    },
  ],
  only_in_file1: [
    {
      Date: "12/02/24",
      Description: "Bola",
      Amount: "60,000",
    },
    {
      Date: "12/02/24",
      Description: "Beau",
      Amount: "90,000",
    },
  ],
  only_in_file2: [
    {
      Date: "12/02/24",
      Description: "Muyiwa",
      Amount: "60,000",
    },
    {
      Date: "12/02/24",
      Description: "Beau",
      Amount: "100,000",
    },
  ],
  unmatched: {
    unmatched_file1: [
      {
        Date: "12/02/24",
        Description: "Bola",
        Amount: "60,000",
      },
      {
        Date: "12/02/24",
        Description: "Beau",
        Amount: "90,000",
      },
    ],
    unmatched_file2: [
      {
        Date: "12/02/24",
        Description: "Muyiwa",
        Amount: "60,000",
      },
      {
        Date: "12/02/24",
        Description: "Beau",
        Amount: "100,000",
      },
    ],
  },
  matchSummary: {
    totalMatched: 2,
    totalUnmatched: 4,
  },
};

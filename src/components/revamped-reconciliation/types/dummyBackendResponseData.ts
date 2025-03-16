export const dummyBackendResponseData = {
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
    {
      file1_transaction: {
        Date: "13/02/24",
        Description: "Joy",
        Amount: "30,000",
      },
      file2_transaction: {
        Date: "13/02/24",
        Description: "Joy",
        Amount: "30,000",
      },
      match_score: 100,
    },
    {
      file1_transaction: {
        Date: "14/02/24",
        Description: "Samson",
        Amount: "25,000",
      },
      file2_transaction: {
        Date: "14/02/24",
        Description: "Samson",
        Amount: "25,000",
      },
      match_score: 100,
    },
  ],
  only_in_file1: [
    { Date: "12/02/24", Description: "Bola", Amount: "60,000" },
    { Date: "12/02/24", Description: "Beau", Amount: "90,000" },
    { Date: "15/02/24", Description: "Mike", Amount: "45,000" },
    { Date: "16/02/24", Description: "Ada", Amount: "70,000" },
  ],
  only_in_file2: [
    { Date: "12/02/24", Description: "Muyiwa", Amount: "60,000" },
    { Date: "12/02/24", Description: "Beau", Amount: "100,000" },
    { Date: "17/02/24", Description: "Elvis", Amount: "20,000" },
    { Date: "18/02/24", Description: "Chidi", Amount: "35,000" },
  ],
  unmatched: {
    unmatched_file1: [
      { Date: "12/02/24", Description: "Bola", Amount: "60,000" },
      { Date: "12/02/24", Description: "Beau", Amount: "90,000" },
      { Date: "15/02/24", Description: "Mike", Amount: "45,000" },
      { Date: "16/02/24", Description: "Ada", Amount: "70,000" },
    ],
    unmatched_file2: [
      { Date: "12/02/24", Description: "Muyiwa", Amount: "60,000" },
      { Date: "12/02/24", Description: "Beau", Amount: "100,000" },
      { Date: "17/02/24", Description: "Elvis", Amount: "20,000" },
      { Date: "18/02/24", Description: "Chidi", Amount: "35,000" },
    ],
  },
  matchSummary: {
    totalMatched: 4,
    totalUnmatched: 8,
  },
};

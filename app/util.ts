import { Transaction } from "./types";
import Fuse from "fuse.js";

export const getTransactionAmountsPerDay = (data: Transaction[]) => {
  const amountsPerDay: { [day: string]: number } = {};

  data.forEach((transaction) => {
    const amount = Number(transaction.amount);
    if (amountsPerDay[transaction.formattedDate]) {
      amountsPerDay[transaction.formattedDate] += amount;
    } else {
      amountsPerDay[transaction.formattedDate] = amount;
    }
  });
  return amountsPerDay;
};

export const filterPositivePayments = (data: Transaction[]) => {
  return data.filter((transaction) => {
    const amount = Number(transaction.amount);
    return amount < 0;
  });
};

type Test = Omit<Transaction, "date" | "memo">;

export const getCountsPerValue = (data: Transaction[], field: keyof Test) => {
  const countsPerValue: { [key: string]: number } = {};
  console.log("data: ", data);
  data.forEach((transaction) => {
    if (countsPerValue[transaction[field]]) {
      countsPerValue[transaction[field]] += 1;
    } else {
      countsPerValue[transaction[field]] = 1;
    }
  });
  return countsPerValue;
};

export const fuzzyMatchMostCommonTransactions = (data: Transaction[]) => {
  //   const options = {
  //     includeScore: true,
  //     includeMatches: true,
  //     keys: ["description"],
  //     threshold: 0.2,
  //   };
  //   const fuse = new Fuse(data, options);
  //   const matches: { [key: string]: { count: number; matchingParts: string[] } } =
  //     {};
  //   data.forEach((transaction) => {
  //     console.log("searching for: ", transaction.description);
  //     const results = fuse.search(transaction.description);
  //     results.forEach((result) => {
  //       const matchedObject = result.item;
  //       const matchingParts =
  //         result.matches?.map((match) =>
  //           match.value.substring(match.indices[0][0], match.indices[0][1] + 1)
  //         ) ?? [];
  //       if (!matches[matchedObject.description]) {
  //         matches[matchedObject.description] = {
  //           count: 1,
  //           matchingParts: matchingParts,
  //         };
  //       } else {
  //         matches[matchedObject.description].count += 1;
  //         matches[matchedObject.description].matchingParts.push(...matchingParts);
  //       }
  //     });
  //   });
  //   console.log(matches);
  //   fs.writeFile("data.json", JSON.stringify(matches, null, 2), "utf8", (err) => {
  //     if (err) {
  //       console.error("An error occurred:", err);
  //       return;
  //     }
  //     console.log("JSON file has been saved.");
  //   });
};

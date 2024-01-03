import { DateTime } from "luxon";
import { Transaction } from "./types";

// update to handle different formats
export const translateCSVData = (data: any[]): Transaction[] =>
  data
    .map((row) => {
      const dateTime = DateTime.fromFormat(
        row["Transaction Date"],
        "MM/dd/yyyy"
      );

      return {
        date: dateTime,
        formattedDate: dateTime.toISODate() || "",
        description: row.Description,
        category: row.Category,
        type: row.Type,
        amount: Number(row.Amount),
        memo: row.Memo,
      };
    })
    .filter((transaction) => transaction.date.isValid)
    .sort((a: any, b: any) => a.date - b.date);

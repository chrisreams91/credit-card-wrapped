import { DateTime } from "luxon";

// TODO translate everything into this
export interface Transaction {
  date: DateTime;
  formattedDate: string;
  description: string;
  category: string;
  type: string;
  amount: number;
  memo?: string;
}

export interface ChaseData {
  "Transaction Date": string;
  "Post Date"?: string;
  Description?: string;
  Category?: ChaseCategory | string;
  Type?: ChaseType | string;
  Amount?: string;
  Memo?: string;
}

export enum ChaseType {
  Sale = "Sale",
  Payment = "Payment",
  Refund = "Refund",
  Return = "Return",
  Adjustment = "Adjustment",
  Fee = "Fee",
  // undefined: 1
}

export enum ChaseCategory {
  Shopping = "Shopping",
  Gas = "Gas",
  "Food & Drink" = "Food & Drink",
  Personal = "Personal",
  Travel = "Travel",
  "Health & Wellness" = "Health & Wellness",
  "Bills & Utilities" = "Bills & Utilities",
  Entertainment = "Entertainment",
  Home = "Home",
  Automotive = "Automotive",
  "Fees & Adjustments" = "Fees & Adjustments",
  Groceries = "Groceries",
  "Professional Services" = "Professional Services",
  // '': 12,
  // undefined: 1
}

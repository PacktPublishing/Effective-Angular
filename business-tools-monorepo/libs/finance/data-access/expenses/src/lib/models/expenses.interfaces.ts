export interface ExpenseDto {
  title: string;
  amount: number;
  vatPercentage: number;
  vatAmount: number;
}

export interface ExpenseModel {
  description: string;
  amount: number;
  percentage: number;
  vat: number;
}

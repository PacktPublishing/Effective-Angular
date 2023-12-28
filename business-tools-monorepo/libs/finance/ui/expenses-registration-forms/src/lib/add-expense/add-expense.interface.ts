export interface AddExpense {
  description: string;
  amountExclVat: number | null;
  vatPercentage: number | null;
  date: Date | null;
}

export interface AddExpenseReactive {
  description?: string;
  amount?: {
    amountExclVat?: number | null;
    vatPercentage?: number | null;
  };
  date?: string[];
  tags?: string[];
}

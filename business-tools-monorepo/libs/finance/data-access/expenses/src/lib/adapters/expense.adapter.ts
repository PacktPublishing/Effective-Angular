import { ModelAdapter } from "@bt-libs/shared/data-access/generic-http";
import { ExpenseDto, ExpenseModel } from "../models/expenses.interfaces";

export class ExpensesModelAdapter implements ModelAdapter<ExpenseDto, ExpenseModel> {

  fromDto(dto: ExpenseDto): ExpenseModel {
    return {
      description: dto.title,
      amount: dto.amount,
      percentage: dto.vatPercentage,
      vat: dto.vatAmount
    };
  }

  toDto(model: ExpenseModel): ExpenseDto {
    return {
      title: model.description,
      amount: model.amount,
      vatPercentage: model.percentage,
      vatAmount: model.vat
    };
  }
}

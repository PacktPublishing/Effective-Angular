import { ModelAdapter } from "@bt-libs/shared/data-access/generic-http";
import { ExpenseDto, ExpenseModel } from "../models/expenses.interfaces";

export class ExpensesModelAdapter implements ModelAdapter<ExpenseDto, ExpenseModel> {
  fromDto(dto: ExpenseDto): ExpenseModel {
    return {
      description: dto.title,
      amount: {
        value: dto.amount,
        vatPercentage: dto.vatPercentage
      },
      date: dto.date,
      tags: dto.tags,
      id: dto.id
    };
  }

  toDto(model: ExpenseModel): ExpenseDto {
    return {
      id: model.id ? model.id : null,
      title: model.description,
      amount: model.amount.value,
      vatPercentage: model.amount.vatPercentage,
      date: model.date,
      tags: model.tags ? model.tags : []
    };
  }
}

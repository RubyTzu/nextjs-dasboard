'use client';
import { useParams } from 'next/navigation';

import { filterExpense } from '@/app/test/(data)/totalDebts';
import { findExpenseGroupId } from '@/app/test/(data)/expense';
import { expenses } from '@/app/test/(data)/data';

import { TopExpenseBar } from '@/app/test/(ui)/TopBars';
import {
  ExpenseDetailOne,
  ExpenseDetailTwo,
  ExpenseDetailThree,
} from '@/app/test/(ui)/ExpenseDetails';
import DeleteExpenseButton from '@/app/test/(ui)/DeleteExpenseButton';

export default function Page() {
  const params = useParams<{ expenseid: string }>();

  const { expensesWithDebts } = filterExpense(findExpenseGroupId(params.expenseid), expenses)

  const expenseData = expensesWithDebts.filter(
    (expense: any) => expense.expenseId === params.expenseid,
  )[0];


  return (
    <div className="flex flex-col items-center">
      <TopExpenseBar expenseData={expenseData} />
      {expenseData && expenseData.expenseDebt ? (
        <div className="mt-16 flex w-full flex-col items-center px-4 py-6">
          <ExpenseDetailOne expenseData={expenseData} />
          <ExpenseDetailTwo expenseData={expenseData} />
          <ExpenseDetailThree expenseData={expenseData} />
          <DeleteExpenseButton />
        </div>
      ) : (
        <div className="mt-16 pt-6">no such expense</div>
      )}
    </div>
  );
}

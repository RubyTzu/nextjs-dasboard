'use client';
import { useParams } from 'next/navigation';
import { filterExpense } from '@/app/test/(data)/totalDebts';
import { TopExpenseBar } from '@/app/test/(ui)/TopBars';

import { findExpenseGroupId } from '@/app/test/(data)/expense';
import { expenses } from '@/app/test/(data)/data';
import { ExpenseDetailOne, ExpenseDetailTwo } from '@/app/test/(ui)/ExpenseDetails';

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
        <div className="flex flex-col items-center mt-16 w-full px-4 py-6">
          <ExpenseDetailOne expenseData={expenseData} />
          <ExpenseDetailTwo expenseData={expenseData} />
          
          <div className="mx-1 w-full">
            <div className="text-sm">備註</div>
            <div className="text-base mt-2 bg-white p-3 rounded-lg min-h-[101px]">{expenseData.note}</div>
          </div>
         
          <div className="flex justify-center items-center bg-grey-100 w-44 h-9 mt-8 rounded-full">
            刪除費用
            </div>
        </div>
      ) :
        <div className="mt-16 pt-6">
          no such expense
        </div>}
    </div>
  );
}

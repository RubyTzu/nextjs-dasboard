'use client';
//import from next
import { useParams } from 'next/navigation';
//import data
import { useExpense } from '@/app/test/(data)/Providers';
import { loginUserId } from '@/app/test/(data)/user';
//import ui
import { TopExpenseBar } from '@/app/test/(ui)/TopBars';
import {
  ExpenseDetailOne,
  ExpenseDetailTwo,
  ExpenseDetailThree,
} from '@/app/test/(ui)/ExpenseDetails';
import DeleteExpenseButton from '@/app/test/(ui)/DeleteExpenseButton';

export default function Page() {
  const params = useParams<{ expenseid: string }>();
  const expense = useExpense(params.expenseid);

  return (
    <div className="flex flex-col items-center">
      <TopExpenseBar expenseData={expense} />
      {expense &&
      (expense.sharers?.some((sharer: any) => sharer.id === loginUserId) ||
        expense.payerId?.includes(loginUserId)) ? (
        <div className="mt-16 flex w-full flex-col items-center px-4 py-6">
          <ExpenseDetailOne expenseData={expense} />
          <ExpenseDetailTwo expenseData={expense} />
          <ExpenseDetailThree expenseData={expense} />
          <DeleteExpenseButton expenseData={expense} />
        </div>
      ) : (
        <div className="mt-16 pt-6">no such expense</div>
      )}
    </div>
  );
}

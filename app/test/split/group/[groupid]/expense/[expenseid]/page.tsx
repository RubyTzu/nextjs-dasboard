'use client';
//import from next
import { useParams } from 'next/navigation';
//import data
import { useGroup } from '@/app/test/(data)/Providers';
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
  const params = useParams<{ groupid: string; expenseid: string }>();
  const group = useGroup(params.groupid)
  if (!group) return
  let expense: any = group.expense.filter((i: any) => i.id === params.expenseid)[0]
  let users: any = group.users

  return (
    <div className="flex flex-col items-center">
      <TopExpenseBar expenseData={expense} />
      {expense &&
        (expense.sharers?.some((sharer: any) => sharer.id === loginUserId) ||
          expense.payerId?.includes(loginUserId)) ? (
        <div className="mt-16 flex w-full flex-col items-center px-4 py-6">
          <ExpenseDetailOne expenseData={expense} users={users}/>
          <ExpenseDetailTwo expenseData={expense} users={users}/>
          <ExpenseDetailThree expenseData={expense} />
          <DeleteExpenseButton expenseData={expense} />
        </div>
      ) : (
        <div className="mt-16 pt-6">no such expense</div>
      )}
    </div>
  );
}

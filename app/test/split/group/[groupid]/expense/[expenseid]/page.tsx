'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
//import data
import { loginUserId } from '@/app/test/(data)/user';
import { useGroup, useExpense } from '@/app/test/(data)/Providers';
//import ui
import { TopExpenseBar } from '@/app/test/(ui)/TopBars';
import {
  ExpenseDetailOne,
  ExpenseDetailTwo,
  ExpenseDetailThree,
} from '@/app/test/(ui)/ExpenseDetails';
import DeleteExpenseButton from '@/app/test/(ui)/DeleteExpenseButton';
import { ExpenseSkeleton } from '@/app/test/(ui)/LoadingSkeletons';

export default function Page() {
 const params = useParams<{ groupid: string; expenseid: string }>();
 const group = useGroup(params.groupid);
 const expense: any = useExpense(params.expenseid);
  if (!group) return;
 const users: any = group.users;
 
  return (
    <div className="flex flex-col items-center">
      <Suspense fallback={<ExpenseSkeleton />}>
        <TopExpenseBar expenseData={expense} group={group} />
        {expense &&
        (expense.sharers?.some((sharer: any) => sharer.id === loginUserId) ||
          expense.payerId?.includes(loginUserId)) ? (
          <div className="mt-16 flex w-full flex-col items-center px-4 py-6">
            <ExpenseDetailOne expenseData={expense} users={users} />
            <ExpenseDetailTwo expenseData={expense} users={users} />
            <ExpenseDetailThree expenseData={expense} />
            <DeleteExpenseButton expenseData={expense} />
          </div>
        ) : (
          <div className="mt-16 pt-6"></div>
        )}
      </Suspense>
    </div>
  );
}

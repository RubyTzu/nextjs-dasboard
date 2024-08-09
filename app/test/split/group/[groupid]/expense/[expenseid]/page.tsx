'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
//import data
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
import { useGroup, useExpense } from '@/app/test/(data)/(fetchData)/Providers';
import { ExtendedExpense, ExtendedGroup, GroupUser } from '@/app/test/(data)/(sharedFunction)/types';
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
  const { groupid, expenseid } = useParams<{ groupid: string; expenseid: string }>();
  const group: ExtendedGroup = useGroup(groupid);
  const expense: ExtendedExpense = useExpense(groupid, expenseid);
  const users: GroupUser[] = group?.users || [{
    id: "",
    name: "",
    picture: "",
    adoptable: false
  }];

  return (
    <div className="flex flex-col items-center">
      <Suspense fallback={<ExpenseSkeleton />}>
        <TopExpenseBar groupData={group} expenseData={expense} />
        {group && expense &&
          (expense.sharers?.some((sharer) => sharer.id === loginUserId) ||
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

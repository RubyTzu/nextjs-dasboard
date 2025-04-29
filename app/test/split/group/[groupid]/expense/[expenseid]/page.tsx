'use client';
//import from next & react
import { useParams } from 'next/navigation';
//import data
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
import { TopBarSkeleton } from '@/app/test/(ui)/LoadingSkeletons';
import { FadeIn } from '@/app/test/(ui)/FadeIn';

export default function Page() {
  const { groupid, expenseid } = useParams<{
    groupid: string;
    expenseid: string;
  }>();
  const group: ExtendedGroup = useGroup(groupid);
  const expense: ExtendedExpense = useExpense(expenseid);
  const users: GroupUser[] = group?.users || [
    {
      id: '',
      name: '',
      picture: '',
      adoptable: false,
    },
  ];

  return (
    <>
      {group && expense ? (
        <div className="mx-auto flex max-w-[800px] flex-col items-center">
          <TopExpenseBar groupData={group} expenseData={expense} />
          <FadeIn direction="top">
            <div className="mt-16 flex w-full flex-col items-center px-4 py-6">
              <ExpenseDetailOne expenseData={expense} />
              <ExpenseDetailTwo expenseData={expense} users={users} />
              <ExpenseDetailThree expenseData={expense} />
              <DeleteExpenseButton expenseData={expense} group={group} />
            </div>
          </FadeIn>
        </div>
      ) : (
        <TopBarSkeleton />
      )}
    </>
  );
}
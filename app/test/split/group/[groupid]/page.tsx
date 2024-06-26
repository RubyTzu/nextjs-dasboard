'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
//import data
import { useGroup, useUser } from '@/app/test/(data)/Providers';
import { loginUserId } from '@/app/test/(data)/user';
//import ui
import { TopGroupBar } from '@/app/test/(ui)/TopBars';
import UsersBar from '@/app/test/(ui)/UsersBar';
import BalanceAndShareButtons from '@/app/test/(ui)/BalanceAndShareButtons';
import ExpensesList from '@/app/test/(ui)/ExpensesList';
import AddExpenseButton from '@/app/test/(ui)/AddExpenseButton';
//import ui loading fallback
import { UsersBarSkeleton } from '@/app/test/(ui)/LoadingSkeletons';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const user = useUser(loginUserId);
  const group = useGroup(params.groupid);

  let groupName = '';
  if (!user) return;
  if (!group) return;
  for (let group of user.groups) {
    if (group.id === params.groupid) {
      groupName = group.name;
    }
  }

  return (
    <div className="flex flex-col">
      <Suspense fallback={<UsersBarSkeleton />}>
        <TopGroupBar groupData={group} groupName={groupName} />
        <UsersBar groupData={group} />
        <BalanceAndShareButtons groupData={group} groupName={groupName} />
        <ExpensesList groupData={group} />
        <AddExpenseButton />
      </Suspense>
    </div>
  );
}

'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
//import data
import { useGroup, useUser } from '@/app/test/(data)/(fetchData)/Providers';
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
//import ui
import { TopGroupBar } from '@/app/test/(ui)/TopBars';
import BalanceAmount from '@/app/test/(ui)/BalanceAmount';
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
        <TopGroupBar
          groupData={group}
          groupName={groupName}
          isBalancePage={true} />
        <BalanceAmount />
      </Suspense>
    </div>
  );
}

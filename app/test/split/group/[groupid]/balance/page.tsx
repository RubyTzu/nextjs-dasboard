'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
//import data
import { useGroup } from '@/app/test/(data)/(fetchData)/Providers';
//import ui
import { TopGroupBar } from '@/app/test/(ui)/TopBars';
import { BalanceAmount } from '@/app/test/(ui)/BalanceAmount';
//import ui loading fallback
import { UsersBarSkeleton } from '@/app/test/(ui)/LoadingSkeletons';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const group = useGroup(params.groupid);

  return (
    <div className="flex flex-col">
      <Suspense fallback={<UsersBarSkeleton />}>
        <TopGroupBar
          groupData={group}
          isBalancePage={true} />
        <BalanceAmount group={group}/>
      </Suspense>
    </div>
  );
}

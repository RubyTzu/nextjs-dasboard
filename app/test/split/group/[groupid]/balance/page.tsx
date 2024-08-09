'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
//import data
import { useGroup } from '@/app/test/(data)/(fetchData)/Providers';
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
import { splitExpense } from '@/app/test/(data)/(sharedFunction)/splitDebt';
import { Debt, ExtendedGroup } from '@/app/test/(data)/(sharedFunction)/types';
//import ui
import { TopGroupBar } from '@/app/test/(ui)/TopBars';
import { BalanceAmount } from '@/app/test/(ui)/BalanceAmount';
import { BalanceDetails } from '@/app/test/(ui)/BalanceDetails';
//import ui loading fallback
import { UsersBarSkeleton } from '@/app/test/(ui)/LoadingSkeletons';
//import other
import clsx from 'clsx';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const group: ExtendedGroup = useGroup(params.groupid);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [ownerDebt, setOwnerDebt] = useState<Debt>({ initial: 0 });
  const groupUsers = group?.users
    ? group?.users
    : [{ id: '', name: '', picture: '', adoptable: false }];

  useEffect(() => {
    if (group?.expenses && group?.expenses.length > 0) {
      const splitExpenses = splitExpense(group.expenses);
      const debtAmounts = Object.values(splitExpenses[loginUserId] || {});
      const TotalDebtsAmount = debtAmounts.reduce(
        (sum, value) => sum + value,
        0,
      );

      setOwnerDebt(splitExpenses[loginUserId] || {});
      setTotalAmount(TotalDebtsAmount);
    }
  }, [group]);

  return (
    <div
      className={clsx('flex flex-col', {
        'items-center': totalAmount === 0,
      })}
    >
      <Suspense fallback={<UsersBarSkeleton />}>
        <TopGroupBar groupData={group} isBalancePage={true} />
        <BalanceAmount totalAmount={totalAmount} />
        {totalAmount !== 0 ? (
          <BalanceDetails
            groupUsers={groupUsers}
            ownerDebt={ownerDebt}
            totalAmount={totalAmount}
          />
        ) : (
          <div className="mt-9">-尚未有費用紀錄-</div>
        )}
      </Suspense>
    </div>
  );
}

'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
//import data
import { useGroup } from '@/app/test/(data)/(fetchData)/Providers';
import { loginUserId } from "@/app/test/(data)/(fetchData)/user";
import { splitExpense } from "@/app/test/(data)/(sharedFunction)/splitDebt";
//import ui
import { TopGroupBar } from '@/app/test/(ui)/TopBars';
import { BalanceAmount } from '@/app/test/(ui)/BalanceAmount';
import { BalanceDetails } from '@/app/test/(ui)/BalanceDetails';
//import ui loading fallback
import { UsersBarSkeleton } from '@/app/test/(ui)/LoadingSkeletons';

interface Debt {
  [expenseId: string]: number;
};

interface Sharer {
  id: string;
  amount: string | number;
}

interface Expense {
  id: string;
  name: string;
  amount: string | number;
  date: string;
  category: string;
  payerId: string;
  sharers: Sharer[];
  note: string;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface Group {
  id: string;
  name: string;
  picture: string;
  creatorId: string;
  expenses: Expense[];
  users: User[];
}

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const group: Group = useGroup(params.groupid);
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [ownerDebt, setOwnerDebt] = useState<Debt>({ "initial": 0 })

  useEffect(() => {
    if (group?.expenses.length > 0) {
      const splitExpenses = splitExpense(group.expenses);
      const debtAmounts = Object.values(splitExpenses[loginUserId] || {});
      const TotalDebtsAmount = debtAmounts.reduce((sum, value) => sum + value, 0);

      setOwnerDebt(splitExpenses[loginUserId] || {});
      setTotalAmount(TotalDebtsAmount)
    }

  }, [group])




  return (
    <div className="flex flex-col">
      <Suspense fallback={<UsersBarSkeleton />}>
        <TopGroupBar
          groupData={group}
          isBalancePage={true} />
        <BalanceAmount totalAmount={totalAmount} />
        {totalAmount !== 0 ? 
        <BalanceDetails groupUsers={group?.users}
          ownerDebt={ownerDebt}
          totalAmount={totalAmount}
        /> : null}
      </Suspense>
    </div>
  );
}

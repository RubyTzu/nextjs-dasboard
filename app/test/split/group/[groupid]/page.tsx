"use client"
//import from next & react
import { useParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
//import data
import { getGroup, getExpenses } from "@/app/test/(data)/API";
//import ui
import { TopGroupBar } from "@/app/test/(ui)/TopBars";
import UsersBar from "@/app/test/(ui)/UsersBar";
import BalanceAndShareButtons from "@/app/test/(ui)/BalanceAndShareButtons";
import ExpensesList from "@/app/test/(ui)/ExpensesList";
import AddExpenseButton from "@/app/test/(ui)/AddExpenseButton";
//import ui loading fallback
import { UsersBarSkeleton } from "@/app/test/(ui)/LoadingSkeletons";


export default function Page() {
  const params = useParams<{ groupid: string }>();
  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState(null);

  const fetchData = async () => {
    try {
      setGroup(await getGroup(params.groupid));
      setExpenses(await getExpenses());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => { fetchData() }, []);

  return (
    <div className="flex flex-col">
      <Suspense fallback={<UsersBarSkeleton />}>
        <TopGroupBar groupData={group} />
        <UsersBar groupData={group} />
        <BalanceAndShareButtons groupData={group} />
        <ExpensesList groupId={params.groupid} expensesData={expenses} />
        <AddExpenseButton groupData={group} />
      </Suspense>
    </div>
  );
}
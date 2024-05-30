"use client"
import { useParams } from "next/navigation";
import { groups } from "@/app/test/(data)/data";
import { TopGroupBar } from "@/app/test/(ui)/TopBars";
import UsersBar from "@/app/test/(ui)/UsersBar";
import ExpensesList from "@/app/test/(ui)/ExpensesList";
import BalanceAndShareButtons from "@/app/test/(ui)/BalanceAndShareButtons";
import AddExpenseButton from "@/app/test/(ui)/AddExpenseButton";
import { useState } from "react";
import { expenses } from '@/app/test/(data)/data';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const groupData = groups.filter((group) => group.groupId === params.groupid)[0];
  
  const [data, setData] = useState(expenses);

  return (
    <div className="flex flex-col">
      <TopGroupBar groupData={groupData} />
      <UsersBar groupData={groupData} />
      <BalanceAndShareButtons groupData={groupData} />
      <ExpensesList groupId={params.groupid} expensesData={data}/>
      <AddExpenseButton groupData={groupData} groupId={params.groupid} data={data} setData={setData} />
    </div>
  );
}
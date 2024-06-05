"use client"
//import from next & react
import { useParams } from "next/navigation";
import { Suspense } from "react";
//import data
import { useGroup } from "@/app/test/(data)/Providers";
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
  const group = useGroup(params.groupid)

  return (
    <div className="flex flex-col">
      <Suspense fallback={<UsersBarSkeleton />}>
        <TopGroupBar groupData={group} />
        <UsersBar groupData={group} />
        <BalanceAndShareButtons groupData={group} />
        <ExpensesList groupId={params.groupid} />
        <AddExpenseButton groupData={group} />
      </Suspense>
    </div>
  );
}
"use client"
import { useParams } from "next/navigation";
import { groups, expenses } from '@/app/test/(data)/data';
import { getGroup, getExpenses } from "@/app/test/(data)/API";
import { TopGroupBar } from "@/app/test/(ui)/TopBars";
import UsersBar from "@/app/test/(ui)/UsersBar";
import ExpensesList from "@/app/test/(ui)/ExpensesList";
import BalanceAndShareButtons from "@/app/test/(ui)/BalanceAndShareButtons";
import AddExpenseButton from "@/app/test/(ui)/AddExpenseButton";
import { useState, useEffect } from "react";


export default function Page() {
  const params = useParams<{ groupid: string }>();
//use client can't appear with async function
  // const groupData = await getGroup("g1");
  // const ExpensesData = await getExpenses();
  const [groupData, setGroupData] = useState(null); 
  // const [Expenses, setExpenses ] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGroup(params.groupid);
        // const ExpensesData = await getExpenses();
        // Handle data...

        setGroupData(data);
        // setExpensesData(ExpensesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);


  const ExpensesData = expenses

  return (
    <div className="flex flex-col">
      <TopGroupBar groupData={groupData} />
      <UsersBar groupData={groupData} />
      <BalanceAndShareButtons groupData={groupData} />
      <ExpensesList groupId={params.groupid} expensesData={ExpensesData}/>
      <AddExpenseButton groupData={groupData} />
    </div>
  );
}
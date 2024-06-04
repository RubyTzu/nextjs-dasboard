'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";
//import data
import { getExpense } from "@/app/test/(data)/API";
import { loginUserId } from '@/app/test/(data)/user';
//import ui
import { TopExpenseBar } from '@/app/test/(ui)/TopBars';
import {
  ExpenseDetailOne,
  ExpenseDetailTwo,
  ExpenseDetailThree,
} from '@/app/test/(ui)/ExpenseDetails';
import DeleteExpenseButton from '@/app/test/(ui)/DeleteExpenseButton';

export default function Page() {
  const params = useParams<{ expenseid: string }>();
  const [expense, setExpense] = useState<any>({});

  //use client can't appear with async function, need useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ExpenseData = await getExpense((params.expenseid));

        setExpense(ExpenseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <TopExpenseBar expenseData={expense} />
      {expense && (expense.sharers?.some((sharer: any) => sharer.id === loginUserId) ||
        expense.payerId?.includes(loginUserId)) ? (
        <div className="mt-16 flex w-full flex-col items-center px-4 py-6">
          <ExpenseDetailOne expenseData={expense} />
          <ExpenseDetailTwo expenseData={expense} />
          <ExpenseDetailThree expenseData={expense} />
          <DeleteExpenseButton />
        </div>
      ) : (
        <div className="mt-16 pt-6">no such expense</div>
      )}
    </div>
  );
}

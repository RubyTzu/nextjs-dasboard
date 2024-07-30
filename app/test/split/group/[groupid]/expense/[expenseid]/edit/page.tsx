'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
//import data
import { useGroup, useExpense } from '@/app/test/(data)/(fetchData)/Providers';
//import ui
import { TopExpenseSettingBar } from '@/app/test/(ui)/TopBars';
import {
  GroupInfoBar,
  NextStepButton,
} from '@/app/test/(ui)/ExpenseSettingDetails';
import { ExpenseSettingStepOne } from '@/app/test/(ui)/ExpenseSettingStepOne';
import { ExpenseSettingStepTwo } from '@/app/test/(ui)/ExpenseSettingStepTwo';
import { ExpenseSettingStepThree } from '@/app/test/(ui)/ExpenseSettingStepThree';

interface SettingExpense {
  id: string;
  name: undefined;
  category: undefined;
  amount: number | string;
  date: undefined;
  note: undefined;
  payerId: string;
  sharers: {
    id: string;
    amount: number;
  }[];
};

interface AddingExpense {
  name: string;
  category: string;
  amount: number | string;
  date: string;
  note: string;
  payerId: string;
  sharers: {
    id: string;
    amount: number;
  }[];
};

export default function Page() {
  const params = useParams<{ groupid: string; expenseid: string }>();
  const [phase, setPhase] = useState(1);
  const [isNotEqual, setIsNotEqual] = useState(false);

  const group = useGroup(params.groupid);
  const expense: SettingExpense | AddingExpense = useExpense(params.groupid, params.expenseid);
  const [currentExpense, setCurrentExpense] = useState(expense);

  useEffect(() => {
    if (expense) {
      setCurrentExpense(expense);
    }
  }, [expense]);

  const expenseId = expense && 'id' in expense ? expense.id : null

  return (
    <form
      method="post"
      action={`/test/split/group/${params.groupid}/expense/${params.expenseid}`}
    >
      <div className="relative flex flex-col">
        <TopExpenseSettingBar
          isAddPage={false}
          group={group}
          expenseData={expense}
          phase={phase}
          setPhase={setPhase}
          hintword='編輯費用'
          cancelLink={`/test/split/group/${params.groupid}/expense/${expenseId}`}
        />
        <GroupInfoBar expenseData={currentExpense} group={group} />
        <section>
          <ExpenseSettingStepOne
            group={group}
            expenseData={currentExpense}
            setCurrentExpense={setCurrentExpense}
            phase={phase}
          />
          <ExpenseSettingStepTwo
            expenseData={currentExpense}
            setCurrentExpense={setCurrentExpense}
            group={group}
            phase={phase}
          />
          <ExpenseSettingStepThree
            expenseData={currentExpense}
            setCurrentExpense={setCurrentExpense}
            group={group}
            phase={phase}
            setIsNotEqual={setIsNotEqual}
          />
        </section>
        <section>
          <NextStepButton
            expenseData={currentExpense}
            setCurrentExpense={setCurrentExpense}
            phase={phase}
            setPhase={setPhase}
            isNotEqual={isNotEqual}
            setIsNotEqual={setIsNotEqual}
            isNotZero={true}
          />
        </section>
      </div>
    </form>
  );
}

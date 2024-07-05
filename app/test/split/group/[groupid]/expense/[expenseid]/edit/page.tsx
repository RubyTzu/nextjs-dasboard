'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState } from 'react';
//import data
import { useGroup, useExpense } from '@/app/test/(data)/(fetchData)/Providers';
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
//import ui
import { TopExpenseSettingBar } from '@/app/test/(ui)/TopBars';
import {
  GroupInfoBar,
  NextStepButton,
} from '@/app/test/(ui)/ExpenseSettingDetails';
import { ExpenseSettingStepOne } from '@/app/test/(ui)/ExpenseSettingStepOne';
import { ExpenseSettingStepTwo } from '@/app/test/(ui)/ExpenseSettingStepTwo';
import { ExpenseSettingStepThree } from '@/app/test/(ui)/ExpenseSettingStepThree';
import SharerAmountInput from '@/app/test/(ui)/SharerAmountInput';

export default function Page() {
  const params = useParams<{ groupid: string; expenseid: string }>();
  const [phase, setPhase] = useState(1);
  const [isNotEqual, setIsNotEqual] = useState(false);

  const group = useGroup(params.groupid);
  const expense: any = useExpense(params.groupid, params.expenseid);

  const [currentExpense, setCurrentExpense] = useState(expense);
  const [showKeyboard, setShowKeyboard] = useState(false);

  if (!group) return;


  return (
    <form
      method="post"
      action={`/test/split/group/${params.groupid}/expense/${params.expenseid}`}
    >
      <div className="relative flex flex-col">
        <TopExpenseSettingBar
          group={group}
          expenseData={expense}
          phase={phase}
          setPhase={setPhase}
        />
        <GroupInfoBar expenseData={currentExpense} group={group} />
        <section>
          <ExpenseSettingStepOne
            group={group}
            expenseData={currentExpense}
            setCurrentExpense={setCurrentExpense}
            phase={phase}
            showKeyboard={showKeyboard}
            setShowKeyboard={setShowKeyboard}
            setIsNotEqual={setIsNotEqual}
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
            group={group}
            phase={phase}
            setPhase={setPhase}
            isNotEqual={isNotEqual}
            setIsNotEqual={setIsNotEqual}
            showKeyboard={showKeyboard}
          />
        </section>
        <div className="h-[420px]"></div>
      </div>
    </form>
  );
}

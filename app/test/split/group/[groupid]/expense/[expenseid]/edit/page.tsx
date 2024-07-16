'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState } from 'react';
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

export default function Page() {
  const params = useParams<{ groupid: string; expenseid: string }>();
  const [phase, setPhase] = useState(1);
  const [isNotEqual, setIsNotEqual] = useState(false);

  const group = useGroup(params.groupid);
  const expense: any = useExpense(params.groupid, params.expenseid);

  const [currentExpense, setCurrentExpense] = useState(expense);
  const [updatedSharers, setUpdatedSharers] = useState([
    ...currentExpense?.sharers,
  ]);

if (!currentExpense) return null;
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
            group={group}
            phase={phase}
            setIsNotEqual={setIsNotEqual}
            updatedSharers={updatedSharers}
            setUpdatedSharers={setUpdatedSharers}
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
          />
        </section>
        {/* <div className="h-[420px]"></div> */}
      </div>
    </form>
  );
}

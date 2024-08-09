'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
//import data
import { useGroup, useExpense } from '@/app/test/(data)/(fetchData)/Providers';
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
import { ExtendedExpense, ExtendedGroup } from '@/app/test/(data)/(sharedFunction)/types';
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
  const { groupid, expenseid } = useParams<{ groupid: string; expenseid: string }>();
  const [phase, setPhase] = useState<number>(1);
  const [isNotEqual, setIsNotEqual] = useState<boolean>(false);

  const group: ExtendedGroup = useGroup(groupid);
  const expense: ExtendedExpense = useExpense(groupid, expenseid);
  const [currentExpense, setCurrentExpense] = useState<ExtendedExpense>(expense);

  useEffect(() => {
    if (expense) {
      setCurrentExpense(expense);
    }
  }, [expense]);

  return (
    <form
      method="post"
      action={`/test/split/group/${groupid}/expense/${expenseid}`}
    >
      <div className="relative flex flex-col">
        <TopExpenseSettingBar
          isAddPage={false}
          group={group}
          expenseData={expense}
          phase={phase}
          setPhase={setPhase}
          hintword='編輯費用'
          cancelLink={`/test/split/group/${groupid}/expense/${expenseid}`}
        />
        {expense &&
          (expense.sharers?.some((sharer) => sharer.id === loginUserId) ||
            expense.payerId?.includes(loginUserId)) ? (
          <>
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
          </>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
}

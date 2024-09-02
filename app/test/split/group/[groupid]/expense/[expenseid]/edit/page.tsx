'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
//import data
import { useGroup, useExpense } from '@/app/test/(data)/(fetchData)/Providers';
import {
  ExtendedExpense,
  ExtendedGroup,
  Expense,
} from '@/app/test/(data)/(sharedFunction)/types';
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
  const { groupid, expenseid } = useParams<{
    groupid: string;
    expenseid: string;
  }>();
  const [phase, setPhase] = useState<number>(1);
  const [isNotEqual, setIsNotEqual] = useState<boolean>(false);
  const [isIncorrectTotalNum, setisIncorrectTotalNum] =
    useState<boolean>(false);
  const [nameExist, setNameExist] = useState<boolean>(false);
  const [hasNameLength, setHasNameLength] = useState<boolean>(true);

  const group: ExtendedGroup = useGroup(groupid);
  const expense: ExtendedExpense = useExpense(expenseid);
  const [currentExpense, setCurrentExpense] = useState<
    ExtendedExpense | Expense
  >(expense);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (expense) {
      setCurrentExpense(expense);
    }
  }, [expense]);

  return (
    <form
      ref={formRef}
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
          hintword="編輯費用"
          cancelLink={`/test/split/group/${groupid}/expense/${expenseid}`}
        />
        {expense ? (
          <>
            <GroupInfoBar expenseData={currentExpense} group={group} />
            <section>
              <ExpenseSettingStepOne
                isAddPage={false}
                group={group}
                oldExpenseData={expense}
                expenseData={currentExpense}
                setCurrentExpense={setCurrentExpense}
                phase={phase}
                setisIncorrectTotalNum={setisIncorrectTotalNum}
                nameExist={nameExist}
                setNameExist={setNameExist}
                hasNameLength={hasNameLength}
                setHasNameLength={setHasNameLength}
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
                isAddExpensePage={false}
                formRef={formRef}
                phase={phase}
                setPhase={setPhase}
                groupid={groupid}
                expenseData={currentExpense}
                isNotEqual={isNotEqual}
                setIsNotEqual={setIsNotEqual}
                isNotZero={true}
                isIncorrectTotalNum={isIncorrectTotalNum}
                nameExist={nameExist}
                hasNameLength={hasNameLength}
                group={group}
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
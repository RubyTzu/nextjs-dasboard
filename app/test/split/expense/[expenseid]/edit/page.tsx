'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState } from 'react';
//import data
import { useExpenses, useUser } from '@/app/test/(data)/Providers';
import { loginUserId } from '@/app/test/(data)/user';
//import ui
import { TopExpenseSettingBar } from '@/app/test/(ui)/TopBars';
import { GroupInfoBar, NextStepButton } from '@/app/test/(ui)/ExpenseSettingDetails';
import { ExpenseSettingStepOne } from '@/app/test/(ui)/ExpenseSettingStepOne';
import { ExpenseSettingStepTwo } from '@/app/test/(ui)/ExpenseSettingStepTwo';
import { ExpenseSettingStepThree } from '@/app/test/(ui)/ExpenseSettingStepThree';
import Example from '@/app/test/(ui)/Example';

export default function Page() {
  const [phase, setPhase] = useState(1);
  const params = useParams<{ expenseid: string }>();
  const user = useUser(loginUserId);
  const [isNotEqual, setIsNotEqual] = useState(false)

  //group users and this expense's info
  let users: any = useExpenses(params.expenseid).users;
  let groupWithExpense: any = useExpenses(params.expenseid).expense;

  let expense = groupWithExpense.expense;
  let group = groupWithExpense.group;

  const [currentExpense, setCurrentExpense] = useState(expense)
  const [showKeyboard, setShowKeyboard] = useState(false);

  if (!user) return;
  if (!group) return;

  //match groupId to find group name and picture
  let groupNameAndImage = null;

  for (let groupInfo of user.groups) {
    if (groupInfo.id === group.id) {
      groupNameAndImage = groupInfo;
    }
  }



  return (
    <form method="post" action={`/test/split/expense/${params.expenseid}`}>
      <div className="relative flex flex-col">
        <TopExpenseSettingBar expenseData={expense} phase={phase} setPhase={setPhase} />
        <GroupInfoBar expenseData={currentExpense} group={groupNameAndImage} />
        <section>
          <ExpenseSettingStepOne
            expenseData={currentExpense}
            phase={phase}
            showKeyboard={showKeyboard}
            setShowKeyboard={setShowKeyboard} />
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
          <NextStepButton expenseData={currentExpense} phase={phase} setPhase={setPhase} isNotEqual={isNotEqual} showKeyboard={showKeyboard}/>
        </section>
        <div className="h-[420px]"></div>
        {/* testing popup alert on top of keyboard */}
        {/* <Example /> */}
      </div>
    </form>
  );
}


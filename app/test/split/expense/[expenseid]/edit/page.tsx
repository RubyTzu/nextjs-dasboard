'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState } from 'react';
//import data
import { useExpenses, useUser, useGroup } from '@/app/test/(data)/Providers';
import { loginUserId } from '@/app/test/(data)/user';
//import ui
import { TopExpenseSettingBar } from '@/app/test/(ui)/TopBars';
import {
  ExpenseSettingStepOne,
  ExpenseSettingStepTwo,
  ExpenseSettingStepThree,
  GroupInfoBar,
  NextStepButton
} from '@/app/test/(ui)/ExpenseSettingDetails';
import Example from '@/app/test/(ui)/Example';

export default function Page() {
  const [phase, setPhase] = useState(1);
  const params = useParams<{ expenseid: string }>();
  const user = useUser(loginUserId);

  //group users and this expense's info
  let users: any = useExpenses(params.expenseid).users;
  let groupWithExpense: any = useExpenses(params.expenseid).expense;

  let expense = groupWithExpense.expense;
  let group = groupWithExpense.group;
  
  const [currentExpense, setCurrentExpense] = useState(expense)

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
        <TopExpenseSettingBar expenseData={currentExpense} phase={phase} setPhase={setPhase} />
        <GroupInfoBar expenseData={currentExpense} group={groupNameAndImage} />
        <section>
          <ExpenseSettingStepOne expenseData={currentExpense} phase={phase} />
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
          />
        </section>
        <section>
          <NextStepButton expenseData={currentExpense} phase={phase} setPhase={setPhase} />
        </section>
        {/* testing popup alert on top of keyboard */}
        {/* <Example /> */}
      </div>
    </form>
  );
}


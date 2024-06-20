'use client';
//import from next & react
import { useParams } from 'next/navigation';
//import data
import { useExpenses, useUser, useGroup } from '@/app/test/(data)/Providers';
import { loginUserId } from '@/app/test/(data)/user';
import { TopExpenseSettingBar } from '@/app/test/(ui)/TopBars';
import {
  ExpenseSettingStepOne,
  ExpenseSettingStepTwo,
  GroupInfoBar,
} from '@/app/test/(ui)/ExpenseSettingDetails';

export default function Page() {
  const params = useParams<{ expenseid: string }>();
  const user = useUser(loginUserId);

  //group users and this expense's info
  let users: any = useExpenses(params.expenseid).users;
  let groupWithExpense: any = useExpenses(params.expenseid).expense;

  let expense = groupWithExpense.expense;
  let group = groupWithExpense.group;

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
    <form action={`/test/split/expense/${params.expenseid}`}>
      <div className="relative flex flex-col">
        <TopExpenseSettingBar expenseData={expense} />
        <GroupInfoBar expenseData={expense} group={groupNameAndImage} />
        {/* <ExpenseSettingStepOne expenseData={expense} /> */}
        <ExpenseSettingStepTwo expenseData={expense} group={group} />
      </div>
    </form>
  );
}

"use client"
//import from next & react
import { useParams } from 'next/navigation';
//import data
import { useExpenses, useGroup } from '@/app/test/(data)/Providers';
import { loginUserId } from "@/app/test/(data)/user";
import { TopExpenseSettingBar } from '@/app/test/(ui)/TopBars';
import { ExpenseSettingStepOne, ExpenseSettingStepTwo, GroupInfoBar } from '@/app/test/(ui)/ExpenseSettingDetails';

export default function Page() {
    const params = useParams<{ expenseid: string }>();

    // can fetch all usersInfo in the groups this loginUser are in
    // can fetch all expenses in the groups this loginUser are in (include groupid in each expense)
    // find the expense for this page from all expenses
    let users:any = useExpenses(params.expenseid).users;
    let groupWithExpense:any = useExpenses(params.expenseid).expense;
    let expense = groupWithExpense.expense
    let group = groupWithExpense.group

    return (
        <form action={`/test/split/expense/${params.expenseid}`}>
            <div className="relative flex flex-col">
                <TopExpenseSettingBar expenseData={expense} />
                <GroupInfoBar expenseData={expense} group={group}/>
                <ExpenseSettingStepOne expenseData={expense} />
                <ExpenseSettingStepTwo expenseData={expense} />
            </div>
        </form>
    );
}
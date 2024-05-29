'use client';
import { useParams } from 'next/navigation';
import { expenses } from '@/app/test/(data)/data';
import { filterExpense } from '@/app/test/(data)/totalDebts';
import { TopExpenseBar } from '@/app/test/(ui)/TopBars';

export default function Page() {
  const params = useParams<{ expenseid: string }>();
  let groupId = ""
  for (let expense of expenses) {
    if (!expense) return
    if (expense.expenseId === params.expenseid) {
      groupId = expense.groupId
      break
    }
  }
  const { expensesWithDebts } = filterExpense(groupId)

  const expenseData = expensesWithDebts.filter(
    (expense: any) => expense.expenseId === params.expenseid,
  )[0];

  return (
    <div className="flex flex-col items-center">
      <TopExpenseBar />

      {expenseData && expenseData.expenseDebt ? (
        <div className="mt-16 flex flex-col gap-3 pt-6 justify-center items-start w-[70%]">
          <p>
            Date:<br/> {expenseData.date}
          </p>
          <p>
            Spending Name:<br/> {expenseData.event}
          </p>
          <p>
            Your Debt:<br/> {expenseData.expenseDebt}
          </p>
          <p>
            Total Spending:<br/> {expenseData.cost}
          </p>

        </div>
      ) : null}
      {/* {expenseData.groupId} <br/>
      {expenseData.expenseId} <br/>
      {expenseData.expenseType} <br/>
      {expenseData.cost} <br/>
      {expenseData.date} <br/>
      {expenseData.event} <br/>
      {expenseData.payerId} <br/>
      {console.log(expenseData)}
      {expenseData.sharersIds} <br/> */}
    </div>
  );
}

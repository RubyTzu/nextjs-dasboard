'use client';
//import from next
import { useParams } from 'next/navigation';
//import data
import { loginUserId } from '@/app/test/(data)/user';
//import ui
import { TopExpenseBar } from '@/app/test/(ui)/TopBars';
import {
  ExpenseDetailOne,
  ExpenseDetailTwo,
  ExpenseDetailThree,
} from '@/app/test/(ui)/ExpenseDetails';
import DeleteExpenseButton from '@/app/test/(ui)/DeleteExpenseButton';

export default function Page() {
  const params = useParams<{ expenseid: string }>();

  let expense = {
    "id": "teste1",
    "name": "fake expense",
    "amount": 1000,
    "date": "2024/6/7",
    "category": "other",
    "payerId": "u1",
    "sharers": [
      {
        "id": "u1",
        "amount": 1000
      }
    ],
    "note": "",
    "createBy": "u1",
    "createAt": "2024/6/7",
    "updateBy": "u1",
    "updateAt": "2024/6/7"
  }
  
  let users =  [
    {
      "id": "u1",
      "name": "a",
      "picture": "https://cdn2.thecatapi.com/images/a4v.jpg"
    }
  ]

  return (
    <div className="flex flex-col items-center">
      <TopExpenseBar expenseData={expense} />
      {expense &&
        (expense.sharers?.some((sharer: any) => sharer.id === loginUserId) ||
          expense.payerId?.includes(loginUserId)) ? (
        <div className="mt-16 flex w-full flex-col items-center px-4 py-6">
          <ExpenseDetailOne expenseData={expense} users={users} />
          <ExpenseDetailTwo expenseData={expense} users={users} />
          <ExpenseDetailThree expenseData={expense} />
          <DeleteExpenseButton expenseData={expense} />
        </div>
      ) : (
        <div className="mt-16 pt-6">no such expense</div>
      )}
    </div>
  );
}

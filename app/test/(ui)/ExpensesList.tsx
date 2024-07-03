//import from next & react
import Link from 'next/link';
import { Fragment } from 'react';
//import data
import { filterExpense } from '@/app/test/(data)/totalDebts';
import { loginUserId } from '@/app/test/(data)/user';
//import ui
import { GreaterThanIcon, expenseIconMap } from '@/app/test/(ui)/Icons';

export default function ExpensesList({ groupData }: { groupData: any }) {
  let { expensesWithDebts } = filterExpense(groupData.expense); //TODO: change to groupData.expenses
  let users = groupData.users;
  let expenses = expensesWithDebts;

  // Step 1: Group expenses by date
  const groupedExpenses = expenses.reduce((acc: any, expense: any) => {
    const date = expense.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(expense);
    return acc;
  }, {});

  // Step 2: Render expenses grouped by date
  const renderExpensesByDate = () => {
    return Object.keys(groupedExpenses).map((date, index) => {
      // const dateObj = new Date();
      // const year = String(dateObj.getUTCFullYear());
      // let dateArray = date.split('/')
      // let formateDate
      // if (dateArray[0] === year) {
      //   formateDate = `${dateArray[1]}月${dateArray[2]}日`;
      // } else {
      //   formateDate = `${dateArray[0]}年${dateArray[1]}月${dateArray[2]}日`;
      // }

      return (
        <div key={index}>
          {groupedExpenses[date].find(
            (expense: any) => expense.expenseDebt !== undefined,
          ) ? (
            <p className="mx-8 mb-3 text-sm text-grey-500">{date}</p>
          ) : null}
          {groupedExpenses[date].map((expense: any) => (
            <Fragment key={expense.id}>
              {expense.sharers.some((sharer: any) => sharer.id === loginUserId) ||
                expense.payerId.includes(loginUserId) ? (
                <ExpenseButton users={users} expense={expense} />
              ) : null}
            </Fragment>
          ))}
        </div>
      )
    });
  };

  return <>{renderExpensesByDate()}</>;
}

function ExpenseButton({ users, expense }: { users: any; expense: any }) {
  const {
    id,
    category,
    amount,
    name,
    payerId,
    expenseDebt,
  }: {
    id: string;
    category:
    | 'food'
    | 'drink'
    | 'transport'
    | 'stay'
    | 'shopping'
    | 'entertainment'
    | 'other';
    amount: string;
    name: string;
    payerId: string;
    expenseDebt: any;
  } = expense;

  const payerData = users.filter((user: any) => user.id === payerId)[0];

  const Icon = expenseIconMap[category];
  let nf = new Intl.NumberFormat('en-US');

  return (
    <Link
      href={`/test/split/expense/${id}`}
      className="mx-4 mb-4 flex justify-between rounded-lg bg-white py-3 pl-4 pr-3"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-highlight-60">
          {Icon ? <div className="scale-[1.2]"><Icon /> </div> : null}
        </div>
        <div className="leading-[20px]">
          <p className="font-normal">{name}</p>
          <p className="font-base text-sm text-grey-500">
            <span>{loginUserId === payerId ? '你' : payerData?.name}</span>
            付了
            <span>${nf.format(Number(amount))}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {expenseDebt.includes('-') ? (
          <p className="text-highlight-30 text-[15px]">
            -${nf.format(Math.abs(expenseDebt))}
          </p>
        ) : (
          <p className="text-highlight-50 text-[15px]">+${nf.format(expenseDebt)}</p>
        )}
        <GreaterThanIcon />
      </div>
    </Link>
  );
}

//import from next & react
import Link from 'next/link';
import { Fragment } from 'react';
//import data
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
import { filterExpense } from '@/app/test/(data)/(sharedFunction)/totalDebts';
import {
  Sharer,
  ExtendedExpense,
  GroupUser,
  ExtendedGroup,
} from '@/app/test/(data)/(sharedFunction)/types';
//import ui
import { GreaterThanIcon, expenseIconMap } from '@/app/test/(ui)/Icons';
//import other
import { format } from 'date-fns';

export default function ExpensesList({
  groupData,
}: {
  groupData: ExtendedGroup;
}) {
  let { expensesWithDebts } = filterExpense(
    groupData.expenses
      ? groupData.expenses
      : [
          {
            id: '',
            name: '',
            amount: 0,
            date: '',
            category: 'food',
            payerId: '',
            sharers: [],
            note: '',
          },
        ],
  );
  let groupId = groupData?.id ? groupData?.id : '';
  let users = groupData?.users
    ? groupData?.users
    : [
        {
          id: '',
          name: '',
          picture: '',
          adoptable: false,
        },
      ];
  let expenses = expensesWithDebts;
  // Step 1: Group expenses by date
  const groupedExpenses = expenses.reduce(
    (acc: { [date: string]: ExtendedExpense[] }, expense: ExtendedExpense) => {
      const date = expense.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(expense);
      return acc;
    },
    {},
  );

  // Step 2: Render expenses grouped by date
  const renderExpensesByDate = () => {
    return Object.keys(groupedExpenses).map((date, index) => {
      let formateDate: Date | string = new Date(date);
      formateDate = format(formateDate, 'yyyy/MM/dd');

      return (
        <div key={index}>
          {groupedExpenses[date].find(
            (expense: ExtendedExpense) => expense.expenseDebt !== undefined,
          ) ? (
            <p className="mx-8 mb-3 text-sm text-grey-500">{formateDate}</p>
          ) : null}
          {groupedExpenses[date].map((expense: ExtendedExpense) => (
            <Fragment key={expense.id}>
              {expense.sharers.some(
                (sharer: Sharer) => sharer.id === loginUserId,
              ) || expense.payerId.includes(loginUserId) ? (
                <ExpenseButton
                  users={users}
                  expense={expense}
                  groupId={groupId}
                />
              ) : null}
            </Fragment>
          ))}
        </div>
      );
    });
  };

  return <>{renderExpensesByDate()}</>;
}

function ExpenseButton({
  users,
  expense,
  groupId,
}: {
  users: GroupUser[];
  expense: ExtendedExpense;
  groupId: string;
}) {
  const { id, name, amount, category, payerId, expenseDebt } = expense;

  const payerData = users.filter((user: GroupUser) => user.id === payerId)[0];

  const Icon = expenseIconMap[category];
  let nf = new Intl.NumberFormat('en-US');
  return (
    <Link
      href={`/test/split/group/${groupId}/expense/${id}`}
      className="mx-4 mb-4 flex justify-between rounded-lg bg-white py-3 pl-4 pr-3"
      scroll={false}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-highlight-60">
          {Icon ? <Icon strokeWidth={1} /> : null}
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
        {expenseDebt?.includes('-') ? (
          <p className="text-[15px] text-highlight-30">
            -${nf.format(Math.abs(Number(expenseDebt)))}
          </p>
        ) : (
          <p className="text-[15px] text-highlight-50">
            +${nf.format(Number(expenseDebt))}
          </p>
        )}
        <GreaterThanIcon />
      </div>
    </Link>
  );
}

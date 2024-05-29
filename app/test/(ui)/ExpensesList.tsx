import { Fragment } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { filterExpense } from '@/app/test/(data)/totalDebts';
import { loginUserId, user } from '@/app/test/(data)/user';
import { expenseIconMap } from '@/app/test/(ui)/Icons';
import Link from 'next/link';

export default function ExpensesList({ groupId }: { groupId: any }) {
  let { expensesWithDebts } = filterExpense(groupId)
  let expenses = expensesWithDebts;

  return (
    <div>
      {expenses.map((expense: any) => (
        <Fragment key={expense.expenseId}>
          {expense.groupId === groupId &&
            (expense.sharersIds.includes(loginUserId) ||
              expense.payerId.includes(loginUserId)) ? (
            <ExpenseButton expense={expense} />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

function ExpenseButton({ expense }: { expense: any }) {
  const {
    expenseId,
    expenseType,
    cost,
    event,
    payerId,
    expenseDebt,
  }: {
    expenseId: string;
    expenseType:
    | 'food'
    | 'drink'
    | 'transport'
    | 'stay'
    | 'shopping'
    | 'entertainment'
    | 'other';
    cost: string;
    event: string;
    payerId: string;
    expenseDebt: any;
  } = expense;
  const Icon = expenseIconMap[expenseType];

  return (
    <Link
      href={`/test/split/expense/${expenseId}`}
      className="m-4 flex justify-between rounded-lg bg-white p-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-orange">
          {Icon ? <Icon /> : null}
        </div>
        <div className="leading-[20px]">
          <p className="font-semibold">{event}</p>
          <p className="text-sm font-base text-grey-400">
            <span>
              {loginUserId === payerId ?
              '你'
              :
              user(payerId)?.displayName
              }
            </span>
            付了
            <span>{cost}$</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <p>$ {expenseDebt}</p>
        <ChevronRightIcon className="h-3 w-3" />
      </div>
    </Link>
  );
}

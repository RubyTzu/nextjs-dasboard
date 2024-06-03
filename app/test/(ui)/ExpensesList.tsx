import { Fragment } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { filterExpense } from '@/app/test/(data)/totalDebts';
import { loginUserId, user } from '@/app/test/(data)/user';
import { expenseIconMap } from '@/app/test/(ui)/Icons';
import Link from 'next/link';

export default function ExpensesList({ groupId, expensesData }: { groupId: any; expensesData: any }) {
  let { expensesWithDebts } = filterExpense(groupId, expensesData)
  let expenses = expensesWithDebts;

  return (
    <div>
      {expenses.map((expense: any) => (
        <Fragment key={expense.id}>
          {expense.groupId === groupId &&
            (expense.sharers.some((sharer: any) => sharer.id === loginUserId) ||
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
  const Icon = expenseIconMap[category];
  let nf = new Intl.NumberFormat('en-US');

  return (
    <Link
      href={`/test/split/expense/${id}`}
      className="m-4 flex justify-between rounded-lg bg-white p-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-orange">
          {Icon ? <Icon /> : null}
        </div>
        <div className="leading-[20px]">
          <p className="font-semibold">{name}</p>
          <p className="text-sm font-base text-grey-500">
            <span>
              {loginUserId === payerId ?
                '你'
                :
                user(payerId)?.displayName
              }
            </span>
            付了
            <span>${nf.format(Number(amount))}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {expenseDebt.includes('-') ?
          <p className='text-primary-pink'>
            -${nf.format(Math.abs(expenseDebt))}
          </p>
          :
          <p className='text-primary-blue'>
            +${nf.format(expenseDebt)}
          </p>
        }
        <ChevronRightIcon className="h-3 w-3" />
      </div>
    </Link>
  );
}

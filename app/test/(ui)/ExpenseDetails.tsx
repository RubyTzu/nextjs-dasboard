import { loginUserId, user } from '@/app/test/(data)/user';
import { expenseIconMap } from '@/app/test/(ui)/Icons';
import { Fragment } from 'react';
import SharerExpenseDetail from './SharerExpenseDetail';
import Image from 'next/image';

// expense = {
//     id: 'e1',
//     groupId: 'g1',
//     name: 'fruits',
//     amount: 180,
//     date: '2024/5/28',
//     category: 'food',
//     payerId: 'u1',
//     sharers: [
//       {
//         id: 'u1',
//         amount: 20
//       },
//       {
//         id: 'u2',
//         amount: '70'
//       },
//       {
//         id: 'u3',
//         amount: '90'
//       },
//     ]
// }

export function ExpenseDetailOne({ expenseData }: { expenseData: any }) {
  const {
    category,
    amount,
    name,
    date,
  }: {
    category:
      | 'food'
      | 'drink'
      | 'transport'
      | 'stay'
      | 'shopping'
      | 'entertainment'
      | 'other';
    amount: any;
    name: string;
    date: string;
  } = expenseData;
  const Icon = expenseIconMap[category];
  let nf = new Intl.NumberFormat('en-US');

  return (
    <div className="flex w-full justify-between pl-2 pr-3">
      {expenseData ? (
        <>
          <div className="flex gap-5">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border-[5px] border-white bg-primary-orange">
              <div className="scale-125">{Icon ? <Icon /> : null}</div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="text-xl leading-8">{name}</div>
              <div className="text-xs text-grey-300">
                <div className="leading-3">{date} 新增</div>
                <div className="leading-6">{date} 最後更新</div>
              </div>
            </div>
          </div>
          <div className="text-xl leading-8">${nf.format(amount)}</div>
        </>
      ) : null}
    </div>
  );
}

export function ExpenseDetailTwo({ expenseData }: { expenseData: any }) {
  const {
    amount,
    payerId,
    sharers,
  }: {
    amount: any;
    payerId: string;
    sharers: string[];
  } = expenseData;
  let nf = new Intl.NumberFormat('en-US');

  return (
    <>
      {expenseData ? (
        <div className="mt-7 w-full px-3">
          <div className="flex gap-4">
            <Image
              className="z-10 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-grey-200"
              src={user(payerId)?.pictureUrl}
              width={64}
              height={64}
              alt="sharer image"
            />
            <div className="flex grow items-center justify-between">
              <div className="text-base">
                {loginUserId === payerId ? '你' : user(payerId)?.displayName}
                先付了
              </div>
              <div>${nf.format(amount)}</div>
            </div>
          </div>

          {sharers.map((sharer: any, idx: any) => {
            return (
              <Fragment key={idx}>
                {sharer.id !== payerId ? (
                  <>
                    <SharerExpenseDetail
                      expenseData={expenseData}
                      sharer={sharer}
                    />
                  </>
                ) : null}
              </Fragment>
            );
          })}

          {sharers.length === 1 && sharers.some((sharer: any) => sharer.id === payerId) ? (
            <div className="my-5 flex w-full items-center justify-end">
              已結清無欠款
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export function ExpenseDetailThree({ expenseData }: { expenseData: any }) {
  return (
    <div className="mx-1 w-full">
      <div className="text-sm">備註</div>
      <div className="mt-2 min-h-[101px] rounded-lg bg-white p-3 text-base">
        {expenseData.note}
      </div>
    </div>
  );
}

'use client';
//import from next & react
import { useState } from 'react';
//import data
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
import {
  ExtendedGroup
} from '@/app/test/(data)/(sharedFunction)/types';
//import ui
import {
  GroupInfoBar,
  NextStepButton,
} from '@/app/test/(ui)/ExpenseSettingDetails';
import { ExpenseSettingStepOne } from '@/app/test/(ui)/ExpenseSettingStepOne';
import { ExpenseSettingStepTwo } from '@/app/test/(ui)/ExpenseSettingStepTwo';
import { ExpenseSettingStepThree } from '@/app/test/(ui)/ExpenseSettingStepThree';
import clsx from 'clsx';

export default function Page() {
  // const { groupid, expenseid } = useParams<{ groupid: string; expenseid: string }>();
  const [phase, setPhase] = useState<number>(1);
  const [isNotEqual, setIsNotEqual] = useState<boolean>(false);
  const [isIncorrectTotalNum, setisIncorrectTotalNum] = useState<boolean>(false);

  const group: ExtendedGroup = {
    id: 'g2',
    name: '2024 Japan',
    picture: 'groupIcon02',
    creatorId: 'u1',
    expenses: [
      {
        id: 'e17',
        name: 'plane ticket',
        amount: 180000,
        date: '2024-05-28T00:00:00.000Z',
        category: 'transport',
        payerId: 'u1',
        sharers: [
          {
            id: 'u1',
            amount: 30000,
          },
          {
            id: 'u2',
            amount: 30000,
          },
          {
            id: 'u3',
            amount: 30000,
          },
          {
            id: 'u4',
            amount: 30000,
          },
          {
            id: 'u5',
            amount: 30000,
          },
          {
            id: 'u6',
            amount: 30000,
          },
        ],
        note: '',
      },
    ],
    users: [
      {
        id: 'u1',
        name: 'a',
        picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
        adoptable: false,
      },
      {
        id: 'u2',
        name: 'b',
        picture:
          'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
        adoptable: false,
      },
      {
        id: 'u3',
        name: 'c',
        picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
        adoptable: false,
      },
      {
        id: 'u4',
        name: 'd',
        picture:
          'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
        adoptable: false,
      },
      {
        id: 'u5',
        name: 'e',
        picture: 'https://cdn2.thecatapi.com/images/cib.jpg',
        adoptable: false,
      },
      {
        id: 'u6',
        name: 'f',
        picture:
          'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
        adoptable: false,
      },
    ],
  };
const expense = {
  id: 'e17',
  groupId: "g2",
  name: 'plane ticket',
  amount: 180000,
  date: '2024-05-28T08:18:15.063Z',
  category: 'transport',
  creatorId: 'u1',
  payerId: 'u1',
  sharers: [
    {
      id: 'u1',
      amount: 30000,
    },
    {
      id: 'u2',
      amount: 30000,
    },
    {
      id: 'u3',
      amount: 30000,
    },
    {
      id: 'u4',
      amount: 30000,
    },
    {
      id: 'u5',
      amount: 30000,
    },
    {
      id: 'u6',
      amount: 30000,
    },
  ],
  note: '',
  createAt: '2024-05-28T08:18:15.063Z',
  updateAt: '2024-05-28T08:18:15.063Z',
}
  const [currentExpense, setCurrentExpense] = useState<any>(expense);


  function handleClick() {
    if (phase === 1) return;
    setPhase(phase - 1);
    console.log(phase);
  }
  const isAddPage = false

  const shouldRender = currentExpense && group && (
    isAddPage ||
    (currentExpense.payerId === loginUserId || currentExpense.sharers?.some((sharer: any) => sharer.id === loginUserId))
  );

  return (
    <form
      method="post"
      action={`/test/split/group/${group.id}/expense/${currentExpense.id}`}
    >
      <div className="relative flex flex-col">
      <div className="fixed z-20 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
      <div className="flex h-6 w-12 items-center justify-start">
        <button
          type="button"
          onClick={handleClick}
          className={clsx('cursor-pointer text-sm', {
            hidden: phase === 1
          })}
        >
          上一步
        </button>
      </div>
      <h1 className="text-lg">
      {shouldRender && group.name}
      </h1>
      <div className="flex h-6 w-12 items-center justify-end">
      </div>
    </div>
        {expense &&
          (expense.sharers?.some((sharer) => sharer.id === loginUserId) ||
            expense.payerId?.includes(loginUserId)) ? (
          <>
            <GroupInfoBar expenseData={currentExpense} group={group} />
            <section>
              <ExpenseSettingStepOne
                group={group}
                expenseData={currentExpense}
                setCurrentExpense={setCurrentExpense}
                phase={phase}
                setisIncorrectTotalNum={setisIncorrectTotalNum}
              />
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
                setIsNotEqual={setIsNotEqual}
              />
            </section>
            <section>
              <NextStepButton
                expenseData={currentExpense}
                phase={phase}
                setPhase={setPhase}
                isNotEqual={isNotEqual}
                setIsNotEqual={setIsNotEqual}
                isNotZero={true}
                isIncorrectTotalNum={isIncorrectTotalNum}
              />
            </section>
          </>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
}

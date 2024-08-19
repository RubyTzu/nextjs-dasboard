'use client';
import { useState } from 'react';
//import ui
import {
  GroupInfoBar,
} from '@/app/test/(ui)/ExpenseSettingDetails';
import { ExpenseSettingStepThree } from '@/app/test/(ui)/ExpenseSettingStepThree';
import GroupPictureButton from '../../(ui)/GroupPictureButton';
import GroupNameButton from '../../(ui)/EditGroupNameButton';
import { GroupUsersSetting } from '../../(ui)/GroupSettingDetails';
import {
  ExtendedExpense,
  ExtendedGroup,
  Group,
  Expense
} from '../../(data)/(sharedFunction)/types';

export default function Page() {
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
  const [currentExpense, setCurrentExpense] = useState<ExtendedExpense | Expense>({
    id: 'e17',
    // groupId: "g2",
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
  });
  const [currentGroup, setCurrentGroup] = useState<Group>({
    id: '',
    name: '',
    picture: 'groupIcon01',
    users: [],
  });
  const [phase, setPhase] = useState(3);
  const [isNotEqual, setIsNotEqual] = useState<boolean>(false);


  return (
    <div className="relative flex flex-col">
      <div className="fixed z-20 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
        <div className="flex h-6 w-12 items-center"></div>
        <h1 className="text-lg">編輯費用</h1>
        <div className="flex h-6 w-12 items-center"></div>
      </div>
      <GroupInfoBar expenseData={currentExpense} group={group} />
      <ExpenseSettingStepThree
        expenseData={currentExpense}
        setCurrentExpense={setCurrentExpense}
        group={group}
        phase={phase}
        setIsNotEqual={setIsNotEqual}
      />
    </div>
  );
}

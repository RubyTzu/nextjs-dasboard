'use client';
import { useState } from 'react';
//import ui
import { CalculatorAndInput } from '../../(ui)/Calculator';
import SharerAmountInput from '../../(ui)/SharerAmountInput';
import DatePickerButton from '@/app/test/(ui)/DatePickerButton';
import ExpenseCategoryButton from '@/app/test/(ui)/ExpenseCategoryButton';
import NoteButton from '../../(ui)/NoteButton';
import { GroupInfoBar } from '@/app/test/(ui)/ExpenseSettingDetails';
import SharersAmountButton from '../../(ui)/SharersAmountButton';

export default function Page() {
  const group = {
    id: 'g1',
    name: '5月聚餐',
    picture: 'groupIcon01',
    creatorId: 'u1',
    expenses: [
      {
        id: 'e1',
        name: '燒鳥肌肉串',
        amount: 210,
        date: '2024-05-28T00:00:00.000Z',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u1',
            amount: 105,
          },
          {
            id: 'u2',
            amount: 105,
          },
        ],
        note: '',
      },
      {
        id: 'e2',
        name: '手工醃蘿波',
        amount: 50,
        date: '2024-05-28T00:00:00.000Z',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u2',
            amount: 16.666666666666668,
          },
          {
            id: 'u3',
            amount: 16.666666666666668,
          },
          {
            id: 'u4',
            amount: 16.666666666666668,
          },
        ],
        note: '',
      },
      {
        id: 'e3',
        name: '豆腐沙拉',
        amount: 150,
        date: '2024-05-28T00:00:00.000Z',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u2',
            amount: 50,
          },
          {
            id: 'u3',
            amount: 50,
          },
          {
            id: 'u4',
            amount: 50,
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
      },
      {
        id: 'u2',
        name: 'b',
        picture:
          'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
      },
      {
        id: 'u3',
        name: 'c',
        picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
      },
      {
        id: 'u4',
        name: 'd',
        picture:
          'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
      },
    ],
  };
  const [currentExpense, setCurrentExpense] = useState({
    id: 'e1',
    groupId: 'g1',
    name: '燒鳥肌肉串',
    amount: 210,
    date: '2024-05-28T09:18:15.063Z',
    category: 'food',
    creatorId: 'u1',
    payerId: 'u1',
    sharers: [
      {
        id: 'u1',
        amount: 105,
      },
      {
        id: 'u2',
        amount: 105,
      },
    ],
    note: 'I am just testing',
    createAt: '2024-05-28T09:18:15.063Z',
    updateAt: '2024-05-28T09:18:15.063Z',
    historys: [
      {
        editedAt: '2024-05-28T09:18:15.063Z',
        editorId: 'u1',
      },
    ],
  });
  // const [phase, setPhase] = useState(3);
  const [updatedSharers, setUpdatedSharers] = useState([
    ...currentExpense.sharers,
  ]);
  
  return (
    <div className="relative flex flex-col">
      <div className="fixed z-20 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
        <div className="flex h-6 w-12 items-center"></div>
        <h1 className="text-lg">編輯費用</h1>
        <div className="flex h-6 w-12 items-center"></div>
      </div>
      <GroupInfoBar expenseData={currentExpense} group={group} />
      <section>
        {/* <div className="relative">
          <div
            className='mx-auto py-6 w-fit'
          >
            <div className="mb-4">
              <DatePickerButton
                date={currentExpense.date}
                expenseData={currentExpense}
                setCurrentExpense={setCurrentExpense}
              />
            </div>
            <div className="my-3 flex items-end justify-between gap-6">
              <ExpenseCategoryButton
                setCurrentExpense={setCurrentExpense}
                expenseData={currentExpense}
              />
              <input
                className="w-48 border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:outline-none focus:ring-0"
                onChange={() => { }}
                onBlur={(e) => {
                  setCurrentExpense({
                    ...currentExpense,
                    name: e.target.value,
                  });
                }}
                type="text"
                defaultValue={currentExpense.name}
              />
            </div>
            <div className="my-3">
              <CalculatorAndInput expenseData={currentExpense} />
            </div>
            <NoteButton
              expenseData={currentExpense}
              setCurrentExpense={setCurrentExpense}
            />
          </div>
        </div> */}
        <SharersAmountButton
          //  users,
          expenseData={currentExpense}
          users={group.users}
          updatedSharers={updatedSharers}
          setUpdatedSharers={setUpdatedSharers}
        />
      </section>
    </div>
  );
}

'use client';
import { useState } from 'react';
//import ui
import { CalculatorAndInput } from '../../(ui)/Calculator';
import SharerAmountInput from '../../(ui)/SharerAmountInput';
import DatePickerButton from '@/app/test/(ui)/DatePickerButton';
import ExpenseCategoryButton from '@/app/test/(ui)/ExpenseCategoryButton';

export default function Page() {
const [currentExpense, setCurrentExpense] = useState({
    id: "e1",
    groupId: "g1",
    name: "燒鳥肌肉串",
    amount: 210,
    date: "2024-05-28T17:18:15.063Z",
    category: "food",
    creatorId: "u1",
    payerId: "u1",
    sharers: [
        {
            id: "u1",
            amount: 105
        },
        {
            id: "u2",
            amount: 105
        }
    ],
    note: "",
    createAt: "2024-05-28T17:18:15.063Z",
    updateAt: "2024-05-28T17:18:15.063Z",
    historys: [
        {
            editedAt: "2024-05-28T17:18:15.063Z",
            editorId: "u1"
        }
    ]
});
const date = '2024-07-07T09:00:00.000Z';

  return (
    <div className="relative">
      <SharerAmountInput />
      <ExpenseCategoryButton
        setCurrentExpense={setCurrentExpense}
        expenseData={currentExpense}
      />
      <CalculatorAndInput expenseData={currentExpense} />
      <DatePickerButton
        date={date}
        expenseData={currentExpense}
        setCurrentExpense={setCurrentExpense}
      />
      <div>test</div>
    </div>
  );
}

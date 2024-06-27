'use client';
//import react
import { useState } from 'react';
//import ui
import { CalculatorAndInput } from '../../(ui)/Calculator';
import SharerAmountInput from '../../(ui)/SharerAmountInput';

export default function Page() {
  const [isNotEqual, setIsNotEqual] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [currentExpense, setCurrentExpense] = useState({
    id: 'e1',
    name: '燒鳥肌肉串',
    amount: '210',
    date: '2024/5/28',
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
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  });

  const group = {
    id: 'g1',
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
    expense: [],
  };
  return (
    <div className="relative">
      <SharerAmountInput />
      <CalculatorAndInput
        group={group}
        expenseData={currentExpense}
        setCurrentExpense={setCurrentExpense}
        showKeyboard={showKeyboard}
        setShowKeyboard={setShowKeyboard}
        setIsNotEqual={setIsNotEqual}
      />
    </div>
  );
}

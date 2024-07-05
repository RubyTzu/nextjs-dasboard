'use client';
//import ui
import { CalculatorAndInput } from '../../(ui)/Calculator';
import SharerAmountInput from '../../(ui)/SharerAmountInput';

export default function Page() {
 const currentExpense = {
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
}


  return (
    <div className="relative">
      <SharerAmountInput />
      <CalculatorAndInput
        expenseData={currentExpense}
      />
    </div>
  );
}

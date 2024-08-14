//import react
import { useState } from 'react';
//import data
import { ExtendedExpense, Expense, GroupUser, Sharer } from '../(data)/(sharedFunction)/types';
//import ui
import { SharerAmountHint } from './SharerAmountHint';
import { Calculator } from './Calculator';

interface SharerAmountInputProps {
  users: GroupUser[];
  sharer: Sharer;
  user: GroupUser;
  expenseData: ExtendedExpense | Expense;
  setIsNotEqual: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentExpense: React.Dispatch<React.SetStateAction<ExtendedExpense | Expense>>;
  setisIncorrectNum: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SharerAmountInput({ users, sharer, user, expenseData, setIsNotEqual, setCurrentExpense, setisIncorrectNum }: SharerAmountInputProps) {
  // const [onFocus, setOnFocus] = useState(false);
  const [currentSharer, setCurrentSharer] = useState<Sharer>({
    id: '',
    amount: 0,
  });

  const updateAmount = (id: string, newAmount: number | string) => {
    let updatedSharersCopy = expenseData.sharers.map((sharer) =>
      sharer.id === id ? { ...sharer, amount: Number(newAmount) } : sharer,
    );

    if (!expenseData.sharers.some((sharer) => sharer.id === id)) {
      updatedSharersCopy.push({ id, amount: Number(newAmount) });
    }

    updatedSharersCopy = updatedSharersCopy.filter(
      (sharer) =>
        sharer.amount !== 0 && sharer.amount !== '' && sharer.amount !== 0,
    );

    setCurrentExpense({
      ...expenseData,
      sharers: updatedSharersCopy
    })
  };

  const handleInputFocus = () => {
    // setOnFocus(true);
    setCurrentSharer(sharer);
    if (sharer) {
      setCurrentSharer(sharer);
    } else {
      setCurrentSharer({
        id: user.id,
        amount: 0,
      });
    }
  }

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setOnFocus(false);
    let value = e.target.value.replace(/^0+/, '');
    if (value === '' || Number(value) < 0) {
      value = '0';
    }
    updateAmount(user.id, value);
    sharer =
      sharer && String(sharer.amount).replace(/^0+/, '') !== ''
        ? sharer
        : {
          id: user.id,
          amount: 0,
        };

    console.log(sharer.amount);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === '' || Number(value) < 0) {
      value = '0';
    }
    updateAmount(user.id, value);
    setCurrentSharer({
      ...sharer,
      amount: Number(value),
    });
  }


  return (
    <>
      <input
        className=" w-20 border-0 border-b-[1px] border-black bg-transparent text-neutrals-70 focus:border-highlight-40 focus:outline-none focus:ring-0"
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        value={sharer.amount === 0 ? '' : sharer.amount}
      />
      <Calculator
        expenseData={expenseData}
        setCurrentExpense={setCurrentExpense}
        setisIncorrectNum={setisIncorrectNum}
      />
    </>
  )
}
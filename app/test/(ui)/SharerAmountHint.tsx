//import react
import { useEffect, useState } from 'react';
//import data
import { ExtendedExpense, Expense, GroupUser, Sharer } from '../(data)/(sharedFunction)/types';
//import other
import clsx from 'clsx';

interface SharerAmountHintProps {
  users: GroupUser[];
  expenseData: ExtendedExpense | Expense;
  setIsNotEqual: React.Dispatch<React.SetStateAction<boolean>>;
  sharer: Sharer;
  display: string;
  showKeyboard: boolean;
}

export function SharerAmountHint({ users, expenseData, setIsNotEqual, sharer, display, showKeyboard }: SharerAmountHintProps) {
  const addedAmount = expenseData?.sharers.reduce(
    (total, sharer) => Number(total) + Number(sharer.amount),
    0,
  ) || '';
  const remainingAmount = expenseData && Number(expenseData.amount) - Number(addedAmount);
  const adjustedRemainingAmount = Math.abs(remainingAmount) < 0.1 ? 0 : remainingAmount;

  useEffect(() => {
    const difference = Math.abs(Number(expenseData?.amount) - Number(addedAmount));

    const isNotEqual = difference >= 0.1;

    setIsNotEqual(isNotEqual);

  }, [expenseData?.sharers, expenseData?.amount, setIsNotEqual, display]);

  return (
    <div
      className={clsx(
        'fixed bottom-[300px] left-0 z-100 h-fit w-full bg-black p-3 text-center transition-all duration-300',
        {
          'z-100 transform opacity-100': showKeyboard,
          '-z-50 transform opacity-0': !showKeyboard,
        },
      )}
    >
      <div className="text-white">
        {users &&
          users.filter((user) => {
            return user.id === sharer.id;
          })[0]?.name
        }
        負擔 ${expenseData.amount} 中的 ${display}
      </div>
      <div className="text-sm text-white">
        {/* {console.log(addedAmount)} */}
        {addedAmount || (!isNaN(Number(display)) && display !== "") ? <>
          {adjustedRemainingAmount > 0
            ? `還剩下$${adjustedRemainingAmount}還沒被分帳`
            : `目前分帳金額多出$${Math.abs(adjustedRemainingAmount)}`}
        </> : '計算中'}

      </div>
    </div>
  );
};

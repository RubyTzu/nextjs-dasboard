//import react
import { useEffect, useState } from 'react';
//import data
import { ExtendedExpense,Expense, GroupUser,Sharer } from '../(data)/(sharedFunction)/types';
//import other
import clsx from 'clsx';

interface SharerAmountHintProps {
    users: GroupUser[];
    expenseData: ExtendedExpense | Expense;
    setIsNotEqual: React.Dispatch<React.SetStateAction<boolean>>;
    onFocus: boolean;
    currentSharer: Sharer;
  }

export function SharerAmountHint({ users, expenseData, setIsNotEqual, onFocus, currentSharer }: SharerAmountHintProps) {
    const [barBottom, setBarBottom] = useState('0');
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
  
      const handleResize = () => {
        if (window.visualViewport) {
          const newBottom = `${window.innerHeight - window.visualViewport.height
            }px`;
          setBarBottom(newBottom);
        }
      };
  
      if (typeof window !== 'undefined') {
        if (window.visualViewport) {
          handleResize(); // Initial setup
          window.visualViewport.addEventListener('resize', handleResize);
          window.visualViewport.addEventListener('scroll', handleResize);
          return () => {
            window.visualViewport?.removeEventListener(
              'resize',
              handleResize,
            );
            window.visualViewport?.removeEventListener(
              'scroll',
              handleResize,
            );
          };
        }
      }
    }, [expenseData?.sharers, expenseData?.amount, setIsNotEqual]);
  
    return (
      <div
        className={clsx(
          'fixed left-0 z-100 h-fit w-full bg-grey-keyBoard p-6 text-center',
          {
            hidden: !onFocus,
            block: onFocus,
          },
        )}
        style={{ bottom: barBottom }}
      >
        <div className="text-black">
          {users &&
            users.filter((user) => {
              return user.id === currentSharer.id;
            })[0]?.name
          }
          負擔${expenseData.amount}中的$
          {currentSharer.amount === '' ? 0 : currentSharer.amount}
        </div>
        <div className="text-sm text-neutrals-60">
          {adjustedRemainingAmount > 0
            ? `還剩下$${adjustedRemainingAmount}還沒被分帳`
            : `目前分帳金額多出$${Math.abs(adjustedRemainingAmount)}`}
        </div>
      </div>
    );
  };
  
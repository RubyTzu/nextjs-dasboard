'use client';
import { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import { CalculatorKeyboardAndInput } from './CalculatorDetail';
import { Expense, ExtendedExpense } from '../(data)/(sharedFunction)/types';

interface Props {
  expenseData: ExtendedExpense | Expense;
  setCurrentExpense: React.Dispatch<
    React.SetStateAction<ExtendedExpense | Expense>>;
  setisIncorrectNum: React.Dispatch<
    React.SetStateAction<boolean>>;
}

export const Calculator = ({
  expenseData,
  setCurrentExpense,
  setisIncorrectNum,
}: Props) => {
  const [display, setDisplay] = useState<string>('');

  const updateDisplay = (updateDisplayString: string) => {
    setDisplay(updateDisplayString);
  };

  const allowedKeys = [
    'Backspace',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '(',
    ')',
    '+',
    '-',
    '*',
    '/',
    '%',
    '=',
    '.',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
  ];

  const [focusDisplay, setFocusDisplay] = useState(false);

  const onFocusDisplay = () => {
    setFocusDisplay(true);
  };

  const onBlurDisplay = () => {
    setFocusDisplay(false);
    const isValidNum = !isNaN(Number(display)) && Number(display) > 1;
    if (isValidNum && expenseData.amount !== Number(display)) {
      setCurrentExpense({ ...expenseData, amount: Number(display) });
    }
  };

  const buttonClick = (num: string) => {
    if (num === 'Backspace') {
      let myString = String(display);
      // console.log(typeof num)
      myString = myString.split('').reverse().slice(1).reverse().join('');
      updateDisplay(myString);
    } else {
      updateDisplay(display + num);
    }
  };

  const equalClick = () => {
    try {
      if (display.length > 0) {
        const result = evaluate(display.replaceAll(',', ''));

        // Determine whether there are non-zero digits after the decimal point
        const hasDecimal = result % 1 !== 0;

        function hasTwoZeroesAfterDecimal(num: number) {
          let fixedNumStr = num.toFixed(2);
          let parts = fixedNumStr.split('.');

          return parts[1] === '00';
        }

        setDisplay(
          hasDecimal && !hasTwoZeroesAfterDecimal(result)
            ? result.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              useGrouping: false,
            })
            : result.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              useGrouping: false,
            }),
        );
      }
    } catch (error) {
      setDisplay('語法錯誤，請再試一次');
      setTimeout(() => {
        setDisplay('');
      }, 1500);
    }
  };

  const clearClick = () => {
    setDisplay('');
  };

  const backspace = () => {
    setDisplay(display.slice(0, -1));
  };

  const opKey = (op: string | number) => {
    console.log(typeof op)
    setDisplay(display + op);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (allowedKeys.includes(e.key)) {
      switch (e.key) {
        case 'Backspace':
          !focusDisplay && backspace();
          break;
        case '=':
          e.preventDefault();
          equalClick();
          break;
        case 'Enter':
          e.preventDefault();
          equalClick();
          break;
        default:
          !focusDisplay && opKey(e.key);
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    if (isNaN(Number(display)) || Number(display) < 1) {
      setisIncorrectNum(true)
    } else {
      setisIncorrectNum(false)
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  });


  return (
    <>
        <CalculatorKeyboardAndInput
          expenseData={expenseData}
          display={display}
          setDisplay={setDisplay}
          updateDisplay={updateDisplay}
          onFocusDisplay={onFocusDisplay}
          onBlurDisplay={onBlurDisplay}
          buttonClick={buttonClick}
          equalClick={equalClick}
          clearClick={clearClick}
        />
    </>
  );
};
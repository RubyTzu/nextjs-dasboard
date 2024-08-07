'use client';
//import react
import { useState, useContext, useEffect, useRef } from 'react';
//import data
import { CalcContext } from '@/app/test/(data)/(sharedFunction)/CalcProvider';
import { ExtendedExpense, Expense } from '../(data)/(sharedFunction)/types';
//import ui
import { BackspaceIcon, DollarIcon } from '@/app/test/(ui)/Icons';
//import other
import clsx from 'clsx';

export const CalculatorAndInput = ({
  expenseData,
}: {
  expenseData: ExtendedExpense | Expense;
}) => {
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    inputRef.current?.focus();
    setShowKeyboard(true);
  };

  const handleInputBlur = () => {
    inputRef.current?.blur();
  };

  const handleKeyboardFocus = () => {
    setShowKeyboard(true);
  };

  const handleKeyboardBlur = () => {
    if (inputRef.current && document.activeElement === inputRef.current) {
      return;
    }
    setShowKeyboard(false);
  };

  return (
    <div className=" flex w-fit items-end justify-between gap-6">
      <button
        type="button"
        onClick={handleInputFocus}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-highlight-60"
      >
        <DollarIcon />
      </button>
      <div className="relative">
        <Display
          amount={expenseData.amount}
          handleKeyboardFocus={handleKeyboardFocus}
          handleKeyboardBlur={handleKeyboardBlur}
          inputRef={inputRef}
        />
        <Calculator
          showKeyboard={showKeyboard}
          handleKeyboardBlur={handleKeyboardBlur}
          handleInputFocus={handleInputFocus}
          handleInputBlur={handleInputBlur}
        />
      </div>
    </div>
  );
};

function Display({
  amount,
  handleKeyboardFocus,
  handleKeyboardBlur,
  inputRef,
}: {
  amount: number | string;
  handleKeyboardFocus: () => void;
  handleKeyboardBlur: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const context = useContext(CalcContext);

  if (!context) {
    throw new Error('CalcContext must be used within a CalcProvider');
  }

  const { display, setDisplay, updateDisplay, onFocusDisplay, onBlurDisplay } = context;

  useEffect(() => {
    if (amount || amount === "") {
      setDisplay(Number(amount));
    }
  }, [amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDisplay(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      className="z-10 w-48 border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:outline-none focus:ring-0"
      onChange={handleChange}
      onFocus={() => {
        handleKeyboardFocus();
        onFocusDisplay();
      }}
      onBlur={() => {
        setTimeout(() => {
          handleKeyboardBlur();
        }, 100);
        onBlurDisplay();
      }}
      type="text"
      inputMode="none"
      id="display"
      value={display}
    />
  );
}

const Calculator = ({
  showKeyboard,
  handleKeyboardBlur,
  handleInputFocus,
  handleInputBlur,
}: {
  showKeyboard: boolean;
  handleKeyboardBlur: () => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
}) => {
  const keyboardRef = useRef<HTMLDivElement>(null);
  const context = useContext(CalcContext);

  if (!context) {
    throw new Error('CalcContext must be used within a CalcProvider');
  }

  const { buttonClick, equalClick, clearClick } = context;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent): void => {
      if (
        keyboardRef.current &&
        !keyboardRef.current.contains(e.target as Node)
      ) {
        handleKeyboardBlur();
      }
    };

    const eventType = 'ontouchstart' in window ? 'touchstart' : 'mousedown';

    document.addEventListener(eventType, handleClickOutside);

    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={keyboardRef}
      id="calculator"
      className={clsx(
        'fixed bottom-0 left-[50%] flex h-[340px] w-screen translate-x-[-50%] flex-col justify-center bg-highlight-50 transition-all duration-300',
        {
          'bottom-0 z-50 transform opacity-100': showKeyboard,
          'bottom-[-20px] -z-50 transform opacity-0': !showKeyboard,
        },
      )}
      onClick={handleInputFocus}
    >
      <div className="flex items-center justify-center">
        <CalculatorButton value={'1'} onClick={() => buttonClick('1')} />
        <CalculatorButton value={'2'} onClick={() => buttonClick('2')} />
        <CalculatorButton value={'3'} onClick={() => buttonClick('3')} />
        <CalculatorButton value={'÷'} onClick={() => buttonClick('/')} />
        <CalculatorButton value={'×'} onClick={() => buttonClick('*')} />
      </div>
      <div className="flex items-center justify-center">
        <CalculatorButton value={'4'} onClick={() => buttonClick('4')} />
        <CalculatorButton value={'5'} onClick={() => buttonClick('5')} />
        <CalculatorButton value={'6'} onClick={() => buttonClick('6')} />
        <CalculatorButton value={'-'} onClick={() => buttonClick('-')} />
        <CalculatorButton value={'+'} onClick={() => buttonClick('+')} />
      </div>
      <div className="flex items-center justify-center">
        <CalculatorButton value={'7'} onClick={() => buttonClick('7')} />
        <CalculatorButton value={'8'} onClick={() => buttonClick('8')} />
        <CalculatorButton value={'9'} onClick={() => buttonClick('9')} />
        <CalculatorButton value={'='} onClick={() => equalClick()} />
        <CalculatorButton value={'AC'} onClick={() => clearClick()} />
      </div>
      <div className="flex items-center justify-center">
        <CalculatorButton value={'.'} onClick={() => buttonClick('.')} />
        <CalculatorButton value={'0'} onClick={() => buttonClick('0')} />
        <CalculatorButton
          value={'<-'}
          onClick={() => buttonClick('Backspace')}
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            equalClick();
            handleKeyboardBlur();
            handleInputBlur();
          }}
          className="m-[5px] flex h-14 w-[122px] cursor-pointer items-center justify-center rounded-lg bg-highlight-60"
        >
          確認
        </button>
      </div>
    </div>
  );
};

const CalculatorButton = ({ value, onClick }: { value: string; onClick: () => void }) => {
  const isNum = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '.',
    'AC',
  ].includes(value);

  const isCalculator = ['÷', '×', '-', '+', '='].includes(value);
  return (
    <button
      type="button"
      className={clsx(
        'm-[5px] flex h-14 w-14 items-center justify-center rounded-lg font-medium',
        {
          'bg-highlight-40': isCalculator,
          'bg-neutrals-20': isNum || value === '<-',
        },
      )}
      onClick={onClick}
    >
      {value !== '<-' ? (
        value
      ) : (
        <div className="relative left-[-2px]">
          <BackspaceIcon />
        </div>
      )}
    </button>
  );
};

'use client';
//import react
import { useState, useEffect, useRef } from 'react';
//import data
import { ExtendedExpense, Expense } from '../(data)/(sharedFunction)/types';
//import ui
import { BackspaceIcon, DollarIcon } from '@/app/test/(ui)/Icons';
//import other
import clsx from 'clsx';

interface SharedCalculatorProps {
  handleOtherChangeFuc: any;
  handleOtherFocusFuc: any;
  handleOtherBlurFuc: any;
  display: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  updateDisplay: (updateDisplayString: string) => void;
  onFocusDisplay: () => void;
  onBlurDisplay: () => void;
}

interface ButtonClickHandlers {
  buttonClick: (num: string) => void;
  equalClick: () => void;
  clearClick: () => void;
}

interface CalculatorKeyboardAndInputProps extends SharedCalculatorProps, ButtonClickHandlers {
  expenseData: ExtendedExpense | Expense;
}

interface DisplayProps extends SharedCalculatorProps {
  amount: number | string;
  handleKeyboardFocus: () => void;
  handleKeyboardBlur: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

interface CalculatorKeyboardProps extends ButtonClickHandlers {
  showKeyboard: boolean;
  handleKeyboardBlur: () => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
}

interface CalculatorButtonProps {
  value: string;
  onClick: () => void;
}

export const CalculatorKeyboardAndInput = ({
  handleOtherChangeFuc,
  handleOtherFocusFuc,
  handleOtherBlurFuc,
  expenseData,
  display,
  setDisplay,
  updateDisplay,
  onFocusDisplay,
  onBlurDisplay,
  buttonClick,
  equalClick,
  clearClick,
}: CalculatorKeyboardAndInputProps) => {
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
    <div className="flex w-fit items-end justify-between gap-6">
      <button
        type="button"
        onClick={handleInputFocus}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-highlight-60"
      >
        <DollarIcon />
      </button>
      <div className="relative">
        <Display
          handleOtherChangeFuc={handleOtherChangeFuc}
          handleOtherFocusFuc={handleOtherFocusFuc}
          handleOtherBlurFuc={handleOtherBlurFuc}
          amount={expenseData.amount}
          handleKeyboardFocus={handleKeyboardFocus}
          handleKeyboardBlur={handleKeyboardBlur}
          inputRef={inputRef}
          display={display}
          setDisplay={setDisplay}
          updateDisplay={updateDisplay}
          onFocusDisplay={onFocusDisplay}
          onBlurDisplay={onBlurDisplay}
        />
        <CalculatorKeyboard
          showKeyboard={showKeyboard}
          handleKeyboardBlur={handleKeyboardBlur}
          handleInputFocus={handleInputFocus}
          handleInputBlur={handleInputBlur}
          buttonClick={buttonClick}
          equalClick={equalClick}
          clearClick={clearClick}
        />
      </div>
    </div>
  );
};

function Display({
  handleOtherChangeFuc,
  handleOtherFocusFuc,
  handleOtherBlurFuc,
  amount,
  handleKeyboardFocus,
  handleKeyboardBlur,
  inputRef,
  display,
  setDisplay,
  updateDisplay,
  onFocusDisplay,
  onBlurDisplay,
}: DisplayProps) {
  useEffect(() => {
    if (amount || amount === "") {
      setDisplay(String(amount));
    }
  }, [amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDisplay(e.target.value);
    handleOtherChangeFuc();
  };

  const handleFocus = () => {
    handleKeyboardFocus();
    onFocusDisplay();
    handleOtherFocusFuc();
  }

  const handleBlur = () => {
    setTimeout(() => handleKeyboardBlur(), 100);
    onBlurDisplay();
    handleOtherBlurFuc();
  }

  return (
    <input
      ref={inputRef}
      className="z-10 w-48 border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:outline-none focus:ring-0"
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      type="text"
      inputMode="none"
      id="display"
      value={display}
    />
  );
}

const CalculatorKeyboard = ({
  showKeyboard,
  handleKeyboardBlur,
  handleInputFocus,
  handleInputBlur,
  buttonClick,
  equalClick,
  clearClick,
}: CalculatorKeyboardProps) => {
  const keyboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent): void => {
      if (keyboardRef.current && !keyboardRef.current.contains(e.target as Node)) {
        handleKeyboardBlur();
      }
    };

    const eventType = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
    document.addEventListener(eventType, handleClickOutside);

    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, [handleKeyboardBlur]);

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
        {['1', '2', '3', '÷', '×'].map(value => (
          <CalculatorButton key={value} value={value} onClick={() => buttonClick(value)} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {['4', '5', '6', '-', '+'].map(value => (
          <CalculatorButton key={value} value={value} onClick={() => buttonClick(value)} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {['7', '8', '9', '=', 'AC'].map(value => (
          <CalculatorButton key={value} value={value} onClick={() => (value === '=' ? equalClick() : clearClick())} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {['.', '0', '<-'].map(value => (
          <CalculatorButton key={value} value={value} onClick={() => (value === '<-' ? buttonClick('Backspace') : buttonClick(value))} />
        ))}
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

const CalculatorButton = ({ value, onClick }: CalculatorButtonProps) => {
  const isNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'AC'].includes(value);
  const isOperator = ['÷', '×', '-', '+', '='].includes(value);

  return (
    <button
      type="button"
      className={clsx(
        'm-[5px] flex h-14 w-14 items-center justify-center rounded-lg font-medium',
        {
          'bg-highlight-40': isOperator,
          'bg-neutrals-20': isNum || value === '<-',
        },
      )}
      onClick={onClick}
    >
      {value !== '<-' ? value : <BackspaceIcon />}
    </button>
  );
};
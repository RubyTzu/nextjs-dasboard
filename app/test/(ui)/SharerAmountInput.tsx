import { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function SharerAmountInput() {
  const [barTop, setBarTop] = useState('100%');
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    const handleResize:any = () => {
      if (window.visualViewport) {
        const newTop = `${window.visualViewport.height}px`;
        console.log(newTop);
        setBarTop(newTop);
      }
    };

    if (typeof window !== 'undefined') {
      if (window.visualViewport) {
        handleResize(); // Initial setup
        window.visualViewport.addEventListener('resize', handleResize);
        return () => {
          window.visualViewport?.removeEventListener('resize', handleResize);
        };
      }
    }
  }, []); // empty dependency array ensures this effect runs only once

  return (
    <>
      <input
        className="w-20 ml-[0px] border-0 border-b-[1px] border-black focus:border-black focus:ring-0 focus:outline-none"
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
      />
      <div
        id="bar"
        className={clsx(
          'bg-grey-keyBoard absolute top-full w-full -translate-y-full transform p-6 text-center',
          { hidden: !onFocus, block: onFocus },
        )}
        style={{ top: barTop }}
      >
        <div className="text-black">小陳負擔$3,000中的$</div>
        <div className="text-sm text-neutrals-60">還剩下$3,000還沒被分帳</div>
      </div>
    </>
  );
};

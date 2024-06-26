import { useEffect, useState } from 'react';
import clsx from 'clsx';

const Example = () => {
  const [barTop, setBarTop] = useState('100%');
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    const handleResize = () => {
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
    <div className="relative">
      <input
        className="border-2"
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
      />
      <div
        id="bar"
        className={clsx(
          'absolute top-full w-full -translate-y-full transform bg-black p-4 text-center text-white',
          { 'hidden': !onFocus,
            'block': onFocus
           },
        )}
        style={{ top: barTop }}
      >
        $3,000 残っています
      </div>
    </div>
  );
};

export default Example;

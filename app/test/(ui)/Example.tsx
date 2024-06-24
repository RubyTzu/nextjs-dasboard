import { useEffect, useState } from 'react';

const Example = () => {
  const [barTop, setBarTop] = useState('100%');

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.visualViewport) {
  //       const newTop = `min(100%, ${window.visualViewport.height}px)`;
  //       setBarTop(newTop);
  //     }
  //   };

  //   if (typeof window !== 'undefined') {
  //     if (window.visualViewport) {
  //       handleResize(); // Initial setup
  //       window.visualViewport.addEventListener('resize', handleResize);
  //       return () => {
  //         window.visualViewport.removeEventListener('resize', handleResize);
  //       };
  //     }
  //   }
  // }, []); // empty dependency array ensures this effect runs only once

  return (
    <div className="relative">
      <input type="number" pattern="[0-9]*" inputMode="numeric" />
      <div
        id="bar"
        className="absolute top-full w-full p-4 bg-black text-white text-center transform -translate-y-full hidden focus:block"
        style={{ top: barTop }}
      >
        $3,000 残っています
      </div>
    </div>
  );
};

export default Example;


'use client';
// import clsx from 'clsx';
import { motion, easeIn } from 'framer-motion';
import { useState, useEffect } from 'react';
// import heart from '@/app/test/(ui)/gif/heart.svg';

export default function FullPageLoading() {
  const [flip, setFlip] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);
  const [frontImageIndex, setFrontImageIndex] = useState(0);
  const [backImageIndex, setBackImageIndex] = useState(0);
  const colors = ['#EBFF79', '#16120F', '#FF9500', '#A3EA71', '#FA64B5'];
  const images = [
    '/images/money.svg',
    '/images/tableware.svg',
    '/images/star.svg',
    '/images/plane.svg',
    '/images/heart.svg',
  ];
  const eased = easeIn(0.3);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip((prevFlip) => !prevFlip);
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);

      setTimeout(() => {
        setFrontImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setBackImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 120);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div
        className="flex min-h-screen flex-col items-center justify-center"
        style={{
          backgroundColor: colors[colorIndex],
          transition: 'background-color 0.3s',
        }}
      >
        <motion.div
          style={{ width: '5rem', height: '5rem' }}
          transition={{ duration: 0.3 }}
          animate={{ rotateX: flip ? 0 : 180 }}
          className="relative bottom-8"
        >
          <motion.div
            className="relative h-full w-full"
            transition={{ duration: 0.3 }}
            animate={{ rotateX: flip ? 0 : 180 }}
          >
            <motion.div
              className="absolute h-full w-full backface-hidden"
              style={{
                backgroundImage: `url(${images[frontImageIndex]})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
              transition={{ duration: 0.3 }}
              animate={{ rotateX: flip ? 180 : 0 }}
            ></motion.div>
            <motion.div
              className="absolute h-full w-full backface-hidden"
              style={{
                backgroundImage: `url(${images[backImageIndex]})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
              initial={{ rotateX: 180 }}
              animate={{ rotateX: flip ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
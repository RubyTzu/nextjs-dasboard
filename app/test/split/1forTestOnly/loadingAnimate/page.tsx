'use client';
import clsx from 'clsx';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// import heart from '@/app/test/(ui)/gif/heart.svg';

export default function Page() {
    const [flip, setFlip] = useState(true);
    const [colorIndex, setColorIndex] = useState(0);
    const [frontImageIndex, setFrontImageIndex] = useState(0);
    const [backImageIndex, setBackImageIndex] = useState(0);
    const colors = [
        "#EBFF79",
        "#16120F",
        "#FF9500",
        "#A3EA71",
        "#FA64B5",
    ];
    const images = [
        '/images/money.svg',
        '/images/tableware.svg',
        '/images/star.svg',
        '/images/plane.svg',
        '/images/heart.svg',
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setFlip(prevFlip => !prevFlip); // Trigger the flip animation
            setColorIndex(prevIndex => (prevIndex + 1) % colors.length);

            // Update both front and back image indices with a slight delay
            setTimeout(() => {
                setFrontImageIndex(prevIndex => (prevIndex + 1) % images.length);
                setBackImageIndex(prevIndex => (prevIndex + 1) % images.length); // Ensure it's different from front
            }, 300); // Delay to sync with the flip animation
        }, 1500); // Flip every 1.5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <motion.div className="flex min-h-screen flex-col items-center justify-center"
            style={{ 
                backgroundColor: colors[colorIndex],
                transition: 'background-color 0.7s' // Matches the flip animation duration
            }}
        >
            <motion.div
                style={{ width: "5rem", height: "5rem" }}
                transition={{ duration: 0.7 }}
                animate={{ rotateX: flip ? 0 : 180 }}
            >
                <motion.div
                    className="relative w-full h-full"
                    transition={{ duration: 0.7 }}
                    animate={{ rotateX: flip ? 0 : 180 }}
                >
                    <motion.div
                        className="absolute w-full h-full backface-hidden"
                        style={{ backgroundImage: `url(${images[frontImageIndex]})`, backgroundSize: 'contain',backgroundRepeat: 'no-repeat' }}
                        transition={{ duration: 0.7 }}
                        animate={{ rotateX: flip ? 180 : 0 }}
                    >
                    </motion.div>
                    <motion.div
                        className="absolute w-full h-full backface-hidden"
                        style={{ backgroundImage: `url(${images[backImageIndex]})`, backgroundSize: 'contain',backgroundRepeat: 'no-repeat' }}
                        initial={{ rotateX: 180 }}
                        animate={{ rotateX: flip ? 0 : 180 }}
                        transition={{ duration: 0.7 }}
                    >
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
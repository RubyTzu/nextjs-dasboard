'use client'
//import from next & react
import { useState, useRef, useEffect } from 'react';
//import ui
import { expenseIconMap } from '@/app/test/(ui)/Icons';
//import other
import clsx from 'clsx';

export default function ExpenseCategoryButton({ expenseData }: { expenseData: any }) {
    const [display, setDisplay] = useState('');
    const [showKeyboard, setShowKeyboard] = useState(false);
    const inputRef = useRef<any>(null);
    const { category }: {
        category:
        | 'food'
        | 'drink'
        | 'transport'
        | 'stay'
        | 'shopping'
        | 'entertainment'
        | 'other'
    } = expenseData;

    if (!expenseData) return;

    const handleInputFocus = () => {
        inputRef.current.focus();
        setShowKeyboard(true);
    };

    const handleInputBlur = () => {
        inputRef.current.blur();
    };

    const handleKeyboardFocus = () => {
        setShowKeyboard(true);
    };

    const handleKeyboardBlur = () => {
        //To check if the input element referenced by inputRef is currently focused
        if (inputRef.current && document.activeElement === inputRef.current) {
            return
        }
        setShowKeyboard(false);
    };


    return (
        <div>
            <Display
                display={display}
                category={category}
                setDisplay={setDisplay}
                handleKeyboardFocus={handleKeyboardFocus}
                handleKeyboardBlur={handleKeyboardBlur}
                inputRef={inputRef}
            />

            <Keyboard
                showKeyboard={showKeyboard}
                handleKeyboardBlur={handleKeyboardBlur}
                handleInputFocus={handleInputFocus}
            />
        </div>
    )
}

function Display({
    category,
    display,
    setDisplay,
    handleKeyboardFocus,
    handleKeyboardBlur,
    inputRef,
}: {
    category: string;
    display: any;
    setDisplay: any;
    handleKeyboardFocus: any;
    handleKeyboardBlur: any;
    inputRef: any;
}) {

    useEffect(() => {
        if (category) {
            setDisplay(category);
        }
    }, [category]);

    const SelectIcon = expenseIconMap[display as keyof typeof expenseIconMap];

    return (
        <button
            ref={inputRef}
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-highlight-60"
            onFocus={handleKeyboardFocus}
            onBlur={() => {
                //setTimeout to make sure handleKeyboardBlur function happened after inputRef is focus by keyboard
                setTimeout(() => {
                    handleKeyboardBlur()
                }, 100)
            }}
            inputMode="none"
            id="display"
        >
            {SelectIcon ? <SelectIcon strokeWidth={1.2} /> : null}
        </button>
    );
}

const Keyboard = ({
    showKeyboard,
    handleKeyboardBlur,
    handleInputFocus,
}: {
    showKeyboard: any;
    handleKeyboardBlur: any;
    handleInputFocus: any;
}) => {
    const keyboardRef = useRef<HTMLDivElement>(null);
    const allCategory = [{
        category: 'food',
        title: '吃的'
    },
    {
        category: 'drink',
        title: '喝的'
    },
    {
        category: 'transport',
        title: '交通'
    },
    {
        category: 'stay',
        title: '住宿'
    },
    {
        category: 'shopping',
        title: '購物'
    },
    {
        category: 'entertainment',
        title: '娛樂'
    },
    {
        category: 'other',
        title: '其他'
    }
    ]

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent): void => {
            if (keyboardRef.current && !keyboardRef.current.contains(e.target as Node)) {

                handleKeyboardBlur()
            }
        };

        const eventType = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
        // Bind the event listener
        document.addEventListener(eventType, handleClickOutside);

        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener(eventType, handleClickOutside);
        };
    }, []);

    return (
        <div
            onClick={handleInputFocus}
            className={clsx("fixed left-[50%] flex h-[340px] w-screen translate-x-[-50%] flex-col justify-start bg-highlight-50 transition-all duration-300", {
                'z-50 bottom-0 transform opacity-100': showKeyboard,
                '-z-50 bottom-[-20px] transform opacity-0': !showKeyboard,
            })}>
            <div className="mt-5 mb-8 text-white text-center">選擇類別</div>
            <div className="px-4 flex flex-wrap justify-start items-center gap-y-3">
                {allCategory.map((item: any, idx: any) => {
                    const Icon = expenseIconMap[item["category"] as keyof typeof expenseIconMap]

                    return (
                        <div key={idx} className="flex flex-col items-center gap-1 basis-1/5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-highlight-60">
                                <Icon strokeWidth={1.6} />
                            </div>
                            <div className="text-white text-sm">{item["title"]}</div>
                        </div>
                    )
                })}

            </div>

        </div>
    );
};

// const CalculatorButton = ({ value, onClick }: { value: any; onClick: any }) => {

//     return (
//         <button></button>
//     );
// };
'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
//import ui
import { NotePencilIcon } from '@/app/test/(ui)/Icons';
//import other
import clsx from 'clsx';
import SharerAmountInput from './SharerAmountInput';

export default function SharersAmountButton({
    users,
    expenseData,
    updatedSharers,
    setUpdatedSharers,
    addedAmount
}: {
    users: any;
    expenseData: any;
    updatedSharers: any;
    setUpdatedSharers: any;
    addedAmount: any;
}) {
    const [sharers, setSharers] = useState(updatedSharers);
    const [lastSavedValue, setLastSavedValue] = useState<any>(sharers);
    const [isShow, setIsShow] = useState(false);
    const [barTop, setBarTop] = useState('100%');
    const [onFocus, setOnFocus] = useState(false);
    const [currentSharer, setCurrentSharer] = useState({
        id: '', amount: 0
    });

    const router = useRouter();

    useEffect(() => {
        const handleResize: any = () => {
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
    }, [currentSharer]); // empty dependency array ensures this effect runs only once

    if (!updatedSharers) return;

    const handleSharerAmountButton = (e: any) => {
        e.preventDefault();
        setIsShow(true);
        router.refresh();
        console.log('hello');
    };

    const handleChange = (e: any) => {
        console.log(e.target.value);
        
        let newSharers = {...sharers}

        setSharers({
            ...sharers
        });
    };

    const handleClose = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsShow(false);
        router.refresh();
    };

    return (
        <>
            <div
                onClick={handleSharerAmountButton}
                className="flex w-20 cursor-pointer justify-center text-xs"
            >
                <div className="scale-75">
                    <NotePencilIcon />
                </div>
                <div>負擔金額</div>
            </div>
            <div>
                <div
                    className={clsx(
                        'fixed left-[50%] m-0 mx-auto translate-x-[-50%] rounded-lg bg-transparent transition-all duration-300',
                        {
                            'top-16 z-50 transform opacity-100': isShow,
                            'top-20 -z-50 transform opacity-0': !isShow,
                        },
                    )}
                >
                    <div className="flex items-center justify-between rounded-t-lg bg-highlight-60 px-7 py-2">
                        <div
                            className="w-9 text-sm"
                            onClick={() => {
                                setSharers(lastSavedValue);
                                setIsShow(false);
                            }}
                        >
                            取消
                        </div>
                        <div className="text-normal">編輯負擔金額</div>
                        <div className="w-9" />
                    </div>
                    <div className="flex h-36 w-[89vw] flex-col gap-4 overflow-y-scroll rounded-b-lg border-none bg-white px-7 py-5 scrollbar scrollbar-track-sky-300 scrollbar-thumb-highlight-20 hover:scrollbar-thumb-highlight-20 active:scrollbar-thumb-highlight-20">
                        {users.map((user: any) => {
                            let sharer = updatedSharers.filter(
                                (sharer: any) => {
                                    return sharer.id === user.id;
                                },
                            )[0];
                            return (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <Image
                                            className="bg-grey-200 flex h-[45px] w-[45px] items-center justify-center rounded-full"
                                            src={user.picture}
                                            width={45}
                                            height={45}
                                            alt="sharer image"
                                        />
                                        <div>{user.name}</div>
                                    </div>
                                    <div>
                                        <input
                                            className="ml-[0px] w-20 border-0 border-b-[1px] border-black focus:border-black focus:outline-none focus:ring-0"
                                            type="number"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            onFocus={() => {
                                                setOnFocus(true);


                                                if (sharer) {
                                                    setCurrentSharer(sharer);
                                                } else {
                                                    setCurrentSharer({
                                                        id: user.id,
                                                        amount: 0
                                                    });
                                                }
                                                //
                                                // console.log(currentSharer);
                                                // console.log(updatedSharers);
                                                // console.log(user.id);
                                            }}
                                            onBlur={() => {
                                                setOnFocus(false);
                                            }}
                                            onChange={() => { }}
                                            value={sharer ? sharer.amount : 0}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div
                        className="mt-5 w-full rounded-full bg-highlight-20 py-3 text-center"
                        onClick={() => {
                            setLastSavedValue(sharers);
                            setIsShow(false);
                        }}
                    >
                        儲存
                    </div>
                </div>
                <div
                    onClick={(e) => handleClose(e)}
                    className={clsx(
                        'fixed left-[0%] top-[0%] z-0 min-h-screen w-screen bg-[#000] transition-all duration-200',
                        {
                            'z-30 transform opacity-80': isShow,
                            'z-[-100] transform opacity-20': !isShow,
                        },
                    )}
                ></div>
                <div
                    className={clsx(
                        'fixed bottom-0 left-0 z-100 w-full bg-grey-keyBoard p-6 text-center',
                        { hidden: !onFocus, block: onFocus },
                    )}
                >
                    <div className="text-black">
                        {users.filter((user: any) => { return user.id === currentSharer.id })[0]?.name}負擔${expenseData.amount}中的${currentSharer.amount}</div>
                    <div className="text-sm text-neutrals-60">還剩下${Number(expenseData.amount) - Number(addedAmount)}還沒被分帳</div>
                </div>
            </div>
        </>
    );
}


// const [sharers, setSharers] = useState([
//     {
//       id: "u1",
//       amount: 105
//     },
//     {
//       id: "u2",
//       amount: 105
//     }
//   ]);

//   const updateAmount = (id, newAmount) => {
//     setSharers(prevSharers => 
//       prevSharers.map(sharer => 
//         sharer.id === id 
//           ? { ...sharer, amount: newAmount }
//           : sharer
//       )
//     );
//   };

//   return (
//     <div>
//       <button onClick={() => updateAmount('u2', 200)}>Update Amount for u2</button>
// </div>
// );
// }
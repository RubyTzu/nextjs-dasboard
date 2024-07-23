'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useId, useRef, useState } from 'react';
//import ui
import {
    CameraIcon,
    groupIconMap
} from '@/app/test/(ui)/Icons';
//import other
import clsx from 'clsx';
import { TopBar } from './TopBars';

export default function GroupPictureButton({
    groupData,
    setCurrentGroup,
}: {
    groupData: any;
    setCurrentGroup: any;
}) {
    if (!groupData) return;
    const {
        picture,
    }: {
        id: string;
        picture:
        | 'groupIcon01'
        | 'groupIcon02'
        | 'groupIcon03'
        | 'groupIcon04'
        | 'groupIcon05'
        | 'groupIcon06'
        | 'groupIcon07'
        | 'groupIcon08'
        | 'groupIcon09'
        | 'groupIcon10'
        | 'groupIcon11'
        | 'groupIcon12'
        | 'groupIcon13'
        | 'groupIcon14'
        | 'groupIcon15';
        name: string;
    } = groupData;

    const [currentPicture, setCurrentPicture] = useState(groupData.picture)
    const [lastSavedPicture, setLastSavedPicture] = useState<any>(currentPicture);
    const [isShow, setIsShow] = useState(false);
    const router = useRouter();
    const Icon = groupIconMap[picture];
    const allGroupPicture = ['groupIcon01', 'groupIcon02', 'groupIcon03', 'groupIcon04', 'groupIcon05', 'groupIcon06', 'groupIcon07', 'groupIcon08', 'groupIcon09', 'groupIcon10', 'groupIcon11', 'groupIcon12', 'groupIcon13', 'groupIcon14', 'groupIcon15'];

    const toggleDialog = () => {
        setTimeout(() => {
            setIsShow(true);
        }, 0);
        router.refresh();
    };

    const handleChange = (e: any) => {
        console.log(e.target.value);
        setCurrentPicture(e.target.value);
    };

    const handleClose = () => {
        setCurrentPicture(lastSavedPicture);
        setIsShow(false);
        router.refresh();
    }

    const handleSave = () => {
        setLastSavedPicture(currentPicture)
        setCurrentGroup({
            ...groupData,
            picture: currentPicture,
        });
        setIsShow(false);
    }

    return (
        <>
            <div onClick={toggleDialog} className="relative">
                <Image
                    src={Icon}
                    className="z-0 flex h-[72px] w-[72px] items-center justify-center rounded-lg bg-highlight-60"
                    width={200}
                    height={200}
                    alt={picture}
                />
                <div className="absolute right-0 bottom-0 translate-x-[5px] translate-y-[5px] w-7 h-7 bg-white rounded-full p-[7px] shadow"
                > <CameraIcon />
                </div>
            </div>
            <div
                className={clsx(
                    'fixed h-fit w-full m-0 rounded-lg bg-transparent transition-all duration-300',
                    {
                        'top-0 z-50 opacity-100': isShow,
                        'top-10 -z-50 opacity-0': !isShow,
                    },
                )}
            >
                    <TopBar name="群組圖片" handleClick={handleSave} rightBtnName="完成" />
                    <div className="top-14 relative flex flex-wrap w-full overflow-scroll border-2 border-red-400 h-[100%]">
                        {allGroupPicture.map((picture: any, idx: any) => {
                            const Icon = groupIconMap[picture as keyof typeof groupIconMap];

                            return (
                                //   <CategoryButton
                                //     Icon={Icon}
                                //     category={category}
                                //     setDisplay={setDisplay}
                                //     expenseData={expenseData}
                                //     setCurrentExpense={setCurrentExpense}
                                //   />
                                <Image
                                    key={idx}
                                    src={Icon}
                                    className="max-w-[33.33%] z-0 flex items-center justify-center bg-black"
                                    width={200}
                                    height={200}
                                    alt={picture}
                                />
                            );
                        })}
                </div>
            </div>
        </>
    )
}
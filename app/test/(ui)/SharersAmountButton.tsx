//import next & react
import Image from 'next/image';
import { useId, useRef, useState } from 'react';
//import ui
import {
    NotePencilIcon,
} from '@/app/test/(ui)/Icons';
//import other
import clsx from 'clsx';
import SharerAmountInput from './SharerAmountInput';

export default function SharersAmountButton({
    users,
    updatedSharers,
    setUpdatedSharers,
}: {
    users: any;
    updatedSharers: any;
    setUpdatedSharers: any;
}) {
    const [sharers, setSharers] = useState(updatedSharers)
    const [lastSavedValue, setLastSavedValue] = useState<any>(sharers);
    const [isShow, setIsShow] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const dialogId = useId();
    const headerId = useId();
    if (!updatedSharers) return

    const toggleDialog = () => {
        dialogRef.current?.showModal();
        setTimeout(() => {
            setIsShow(true);
        }, 0);
    };

    const handleChange = (e: any) => {
        console.log(e.target.value);
        setSharers(e.target.value);
    };

    return (
        <>
            <div onClick={toggleDialog} className="flex w-20 justify-center text-xs">
                <div className="scale-75">
                    <NotePencilIcon />
                </div>
                <div>負擔金額</div>
            </div>
            <dialog
                role="dialog"
                ref={dialogRef}
                id={dialogId}
                aria-modal
                className={clsx(
                    'z-20 m-0 mx-auto rounded-lg bg-transparent transition-all duration-300',
                    {
                        'top-16 z-50 transform opacity-100  backdrop:bg-black/80': isShow,
                        'top-20 -z-50 transform opacity-0 backdrop:bg-black/20': !isShow,
                    },
                )}
                aria-labelledby={headerId}
                onClick={() => {
                    setSharers(lastSavedValue);
                    setIsShow(false);
                    setTimeout(() => {
                        dialogRef.current?.close();
                    }, 100);
                }}
            >
                <div onClick={(e: any) => e.stopPropagation()}>
                    <div className="flex items-center justify-between rounded-t-lg bg-highlight-60 px-7 py-2">
                        <div
                            className="w-9 text-sm"
                            onClick={() => {
                                setSharers(lastSavedValue);
                                setIsShow(false);
                                setTimeout(() => {
                                    dialogRef.current?.close();
                                }, 100);
                            }}
                        >
                            取消
                        </div>
                        <div className="text-normal">編輯負擔金額</div>
                        <div className="w-9" />
                    </div>
                    <div className="hover:scrollbar-thumb-highlight-20 active:scrollbar-thumb-highlight-20 overflow-y-scroll scrollbar scrollbar-thumb-highlight-20 scrollbar-track-sky-300 h-36 flex flex-col gap-4 w-[89vw] rounded-b-lg bg-white border-none px-7 py-5">
                        {users.map((user: any) => {
                            return (
                                <div key={user.id} className="flex justify-between items-center">
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
                                    <div>amount
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div
                        className="mt-5 w-full rounded-full bg-highlight-20 py-3 text-center"
                        onClick={() => {
                            // setLastSavedValue(sharers)
                            // setIsShow(false);
                            // setTimeout(() => {
                            //     dialogRef.current?.close();
                            // }, 100);
                        }}
                    >
                        儲存
                    </div>
                </div>
            </dialog>
        </>
    )
}
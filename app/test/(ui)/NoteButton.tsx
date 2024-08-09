//import next & react
import { useId, useRef, useState } from 'react';
//import data
import { ExtendedExpense } from '../(data)/(sharedFunction)/types';
//import ui
import {
    NotePencilIcon,
} from '@/app/test/(ui)/Icons';
//import other
import clsx from 'clsx';

export default function NoteButton({
    expenseData,
    setCurrentExpense,
}: {
    expenseData: ExtendedExpense;
    setCurrentExpense: React.Dispatch<React.SetStateAction<ExtendedExpense>>;
}) {
    const [textareaValue, setTextareaValue] = useState(expenseData.note)
    const [lastSavedValue, setLastSavedValue] = useState<string>(textareaValue);
    const [isShow, setIsShow] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const dialogId = useId();
    const headerId = useId();
    if (!expenseData) return

    const toggleDialog = () => {
        dialogRef.current?.showModal();
        setTimeout(() => {
            setIsShow(true);
        }, 0);
    };

    const handleChange = (value: string) => {
        setTextareaValue(value);
    };

    return (
        <>
            <div onClick={toggleDialog} className="flex items-center justify-center gap-1 pb-1 pt-2 text-sm">
                <div>
                    <NotePencilIcon />
                </div>
                <div>編輯備註</div>
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
                    setTextareaValue(lastSavedValue);
                    setIsShow(false);
                    setTimeout(() => {
                        dialogRef.current?.close();
                    }, 100);
                }}
            >
                <div onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
                    <div className="flex items-center justify-between rounded-t-lg bg-highlight-60 px-7 py-2">
                        <div
                            className="w-9 text-sm"
                            onClick={() => {
                                setTextareaValue(lastSavedValue);
                                setIsShow(false);
                                setTimeout(() => {
                                    dialogRef.current?.close();
                                }, 100);
                            }}
                        >
                            取消
                        </div>
                        <div className="text-normal">編輯備註</div>
                        <div className="w-9" />
                    </div>
                    <textarea
                    onFocus={(e) => {
                        const selectionEnd = e.target.value.length;
                        e.target.setSelectionRange(selectionEnd, selectionEnd);
                    }}
                        className="px-7 py-5 h-36 w-[89vw] resize-none rounded-b-lg bg-white border-none focus:border-none focus:ring-0 focus:outline-none"
                        onChange={(e) => handleChange(e.target.value)}
                        value={textareaValue} />
                    <div
                        className="mt-5 w-full rounded-full bg-highlight-20 py-3 text-center"
                        onClick={() => {
                            setLastSavedValue(textareaValue)
                            setCurrentExpense({
                                ...expenseData,
                                note: textareaValue,
                            });
                            setIsShow(false);
                            setTimeout(() => {
                                dialogRef.current?.close();
                            }, 100);
                        }}
                    >
                        儲存
                    </div>
                </div>
            </dialog>
        </>
    )
}
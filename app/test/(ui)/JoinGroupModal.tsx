//import next & react
import { useEffect, useId, useRef, useState } from 'react';
//import other
import clsx from 'clsx';

export default function JoinGroupModal() {
    const [inputValue, setInputValue] = useState("test")
    const [lastSavedValue, setLastSavedValue] = useState<any>(inputValue);
    const [isShow, setIsShow] = useState(true);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const dialogId = useId();
    const headerId = useId();
    const groupUsers = [
        {
            id: "u1",
            name: "a",
            picture: "https://cdn2.thecatapi.com/images/a4v.jpg",
            adoptable: false
        },
        {
            id: "u11",
            name: "k",
            picture: "",
            adoptable: true
        },
        {
            id: "u12",
            name: "l",
            picture: "",
            adoptable: true
        },
        {
            id: "u13",
            name: "m",
            picture: "",
            adoptable: true
        },
        {
            id: "u14",
            name: "n",
            picture: "",
            adoptable: true
        },
    ]

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog) {
            dialog.showModal();
        }

        return () => {
            if (dialog) {
                dialog.close();
            }
        };
    }, [])


    const handleChange = (e: any) => {
        console.log(e.target.value);
        setInputValue(e.target.value);
    };

    return (
        <>
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
                    setInputValue(lastSavedValue);
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
                                // setInputValue(lastSavedValue);
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

                    {groupUsers ? groupUsers.map((user: any) => {
                        return (
                            <div key={user.id} className="">
                                <label htmlFor={user.name}>{user.name}</label>
                                
                                <input type="radio" value={user.name} />
                            </div>
                        )
                    }) : null}

                    <div
                        className="mt-5 w-full rounded-full bg-highlight-20 py-3 text-center"
                        onClick={() => {

                            setLastSavedValue(inputValue)
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
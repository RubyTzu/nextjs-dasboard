//import next & react
import { useEffect, useId, useRef, useState } from 'react';
//import other
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
    url: any;
    hintWord: string;
    buttonHintWord: string;
}

export default function AlertModal({
  url,
  hintWord,
  buttonHintWord,
}:  Props) {
  const [isShow, setIsShow] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  useEffect(() => {

    const dialog = dialogRef.current;

    document.body.style.overflow = 'hidden';

    if (dialog) {
        dialog.showModal();
    }

    return () => {
        if (dialog) {
              dialogRef.current?.close();
              document.body.style.overflow = '';
        }
    };
}, [])

  return (
    <>
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        className={clsx(
          'z-20 m-0 mx-auto w-[60%] translate-y-[-50%] rounded-lg bg-white transition-all duration-300 focus:!border-none focus:outline-none',
          {
            'top-[40%] z-50 transform opacity-100  backdrop:bg-highlight-50/80':
              isShow,
            'top-[45%] -z-50 transform opacity-0 backdrop:bg-highlight-50/20':
              !isShow,
          },
        )}
        aria-labelledby={headerId}
        onClick={()=>{}}
      >
        <div onClick={(e: any) => e.stopPropagation()}>
          <div className="flex h-20 items-center justify-center px-6 mt-3 mb-4">
            <div className="text-normal">{hintWord}</div>
          </div>
          <div className="mx-4 mb-3 flex items-center justify-between">
            <Link
              className="flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-60 text-neutrals-90"
              href={url}
              scroll={false}
            >
             {buttonHintWord}
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}

//import other
import Link from 'next/link';
//import other
import clsx from 'clsx';

interface Props {
  dialogRef: React.Ref<HTMLDialogElement>;
  dialogId: string;
  isShow: boolean;
  headerId: string;
  url: string;
  hintWord: string;
  buttonHintWord: string;
}

export default function AlertModal({
  dialogRef,
  dialogId,
  isShow,
  headerId,
  url,
  hintWord,
  buttonHintWord,
}: Props) {

  return (
    <>
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        className={clsx("m-0 mx-auto w-[60%] translate-y-[-50%] rounded-lg bg-white transition-all duration-300 focus:!border-none focus:outline-none drop-shadow-xl", {
          'top-[40%] z-50 transform opacity-100  backdrop:bg-highlight-50/80':
            isShow,
          'top-[45%] -z-50 transform opacity-0 backdrop:bg-highlight-50/20':
            !isShow,
        },)}
        aria-labelledby={headerId}
        onClick={() => { }}
      >
        <div onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
          <div className="flex h-20 items-center justify-center mx-auto w-[80%] text-center mt-3 mb-4">
            <div className="text-normal">{hintWord}</div>
          </div>
          <div className="mx-4 mb-3 flex items-center justify-center">
            <Link
              className="flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-60 text-neutrals-90 focus:outline-0 focus:border-none focus:ring-0"
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

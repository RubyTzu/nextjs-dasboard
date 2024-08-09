//import other
import clsx from 'clsx';

interface Props {
  dialogRef: React.Ref<HTMLDialogElement>;
  dialogId: string;
  isShow: boolean;
  headerId: string;
  handleClose: () => void;
  handleSave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  hintWord: string;
  idx: string;
}

export default function DeleteModal({
  dialogRef,
  dialogId,
  isShow,
  headerId,
  handleClose,
  handleSave,
  hintWord,
  idx
}: Props) {
  return (
    <>
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        className={clsx(
          'z-20 m-0 mx-auto w-[60%] translate-y-[-50%] rounded-lg bg-white transition-all duration-300 focus:!border-none focus:outline-none drop-shadow-xl',
          {
            'top-[40%] z-50 transform opacity-100  backdrop:bg-highlight-50/80':
              isShow,
            'top-[45%] -z-50 transform opacity-0 backdrop:bg-highlight-50/20':
              !isShow,
          },
        )}
        aria-labelledby={headerId}
        onClick={handleClose}
      >
        <div onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
          <div className="flex h-20 items-center justify-center px-6 mt-3 mb-4">
            <div className="text-normal">{hintWord}</div>
          </div>
          <div className="mx-4 mb-3 flex gap-3 items-center justify-between">
            <div
              className="flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-30 text-white"
              onClick={handleClose}
            >
              取消
            </div>
            <div
              id={idx}
              className="flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-60 text-neutrals-90"
              onClick={handleSave}
            >
              確定
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

//import other
import clsx from 'clsx';
import { TopBar } from './TopBars';

interface Prop {
  isShow: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  handleSave: () => void;
  TopBarName: string;
  inputRef: React.Ref<HTMLInputElement>;
  currentValue: string;
  nameExist: boolean;
}

export default function NameModal({
  isShow,
  handleChange,
  handleClose,
  handleSave,
  TopBarName,
  inputRef,
  currentValue,
  nameExist
}: Prop) {
  return (
    <>
      <div
        className={clsx(
          'fixed left-0 m-0 flex h-fit w-full flex-col items-center justify-center rounded-lg bg-transparent transition-all duration-200',
          {
            'top-0 z-50 opacity-100': isShow,
            'top-5 -z-50 opacity-0': !isShow,
          },
        )}
      >
        <TopBar
          name={TopBarName}
          leftBtnName=""
          rightBtnName="取消"
          handleLeftClick={() => { }}
          handleRightClick={handleClose}
        />
        <div className="relative mx-auto z-40 top-[92px] w-[80%] h-fit border-b border-white">
          <input
            ref={inputRef}
            className="relative w-[80%] border-0 bg-transparent px-0 text-xl text-white focus:border-0 focus:outline-none focus:ring-0"
            type="text"
            value={currentValue}
            onChange={handleChange}
            maxLength={20}
          />
          <div className="absolute top-[50%] translate-y-[-50%] right-0 text-neutrals-10 text-[10px]">&#40;{currentValue.length}/20&#41;</div>
        </div>
        <div className={clsx('relative w-[80%] mx-auto top-[105px] z-40 text-neutrals-50',{
          'block': nameExist,
          'hidden': !nameExist,
          })}>該{TopBarName}已存在，請重新輸入</div>
        <button
          type="button"
          disabled={currentValue === '' || nameExist}
          className="fixed left-[50%] top-56 z-40 mx-auto w-[80%] translate-x-[-50%] rounded-full bg-highlight-20 py-3 text-center disabled:bg-neutrals-30 disabled:text-text-onDark-secondary"
          onClick={handleSave}
        >
          儲存
        </button>
        <div
          onClick={handleClose}
          className="absolute top-0 z-20 h-screen w-full bg-highlight-50 opacity-[95%]"
        ></div>
      </div>
    </>
  );
}

'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
//import ui
import { CameraIcon, groupIconMap } from '@/app/test/(ui)/Icons';
//import other
import clsx from 'clsx';
import { TopBar } from './TopBars';

export default function GroupNameButton({
  groupData,
  setCurrentGroup,
}: {
  groupData: any;
  setCurrentGroup: any;
}) {
  const {
    name,
  }: {
    name: string;
  } = groupData;

  const [currentName, setCurrentName] = useState(name);
  const [lastSavedName, setLastSavedName] = useState<any>(currentName);
  const [isShow, setIsShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!groupData) return;

  const toggleDialog = () => {
     setIsShow(true);
     setTimeout(() => {
       if (inputRef.current) {
         inputRef.current.focus();
       }
     }, 0);
    router.refresh();
  };

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setCurrentName(e.target.value);
  };

  const handleClose = () => {
    setCurrentName(lastSavedName);
    setIsShow(false);
    router.refresh();
  };

  const handleSave = () => {
    setLastSavedName(currentName);
    setCurrentGroup({
      ...groupData,
      name: currentName,
    });
    setIsShow(false);
  };

  return (
    <div className="relative">
      <div
        onClick={toggleDialog}
        className="relative cursor-pointer text-sm text-grey-500"
      >
        編輯
      </div>
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
          name="群組名稱"
          leftBtnName="取消"
          rightBtnName=""
          handleLeftClick={handleClose}
          handleRightClick={() => {}}
        />
        <input
          ref={inputRef}
          className="relative top-[92px] z-40 mx-auto w-[80%] border-0 border-b border-b-white bg-transparent px-0 text-xl text-white focus:border-b focus:border-highlight-20 focus:outline-none focus:ring-0"
          type="text"
          value={currentName}
          onChange={handleChange}
        />
        <div
          className="fixed left-[50%] top-56 z-40 mx-auto w-[80%] translate-x-[-50%] rounded-full bg-highlight-20 py-3 text-center"
          onClick={handleSave}
        >
          儲存
        </div>
        <div
          onClick={handleClose}
          className="absolute top-0 z-20 h-screen w-full bg-highlight-50 opacity-[95%]"
        ></div>
      </div>
    </div>
  );
}

'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
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
  const router = useRouter();

  if (!groupData) return;

  const toggleDialog = () => {
    setTimeout(() => {
      setIsShow(true);
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
          'fixed left-0 m-0 flex h-fit w-full flex-col justify-center items-center rounded-lg bg-transparent transition-all duration-200',
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
          className="relative top-[92px] z-40 mx-auto w-[80%] border-0 border-b border-b-white bg-transparent px-0 text-xl text-white focus:border-b focus:border-highlight-20 focus:outline-none focus:ring-0"
          type="text"
          value={currentName}
          onChange={handleChange}
        />
        <div
          className="fixed top-56 left-[50%] z-40 mx-auto w-[80%] rounded-full bg-highlight-20 py-3 text-center translate-x-[-50%]"
          onClick={handleSave}
        >
          儲存
        </div>
        <div className="absolute top-0 z-20 h-screen w-full bg-highlight-50 opacity-[95%]"></div>
      </div>
    </div>
  );
}

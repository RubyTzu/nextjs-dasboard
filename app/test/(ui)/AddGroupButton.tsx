'use client';
//import from next or react
import { useState } from 'react';
import { useRouter } from 'next/navigation';
//import ui
import { AddGroupIcon } from '@/app/test/(ui)/Icons';
import FullPageLoading from './FullPageLoading';

export default function AddGroupButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      setIsLoading(true);
    }, 300);
    router.push(`/test/split/new/group`, {
      scroll: false,
    });
  };
  return (
    <div className="fixed top-14 z-[2] flex w-full items-start bg-highlight-50 px-6 pb-4 pt-6 text-base text-white">
      <div
        onClick={handleClick}
        className="flex items-center justify-center rounded-[10px] px-2 active:bg-white"
      >
        {isLoading && <FullPageLoading />}
        <AddGroupIcon />
        <span className="pl-2">新增群組</span>
      </div>
    </div>
  );
}

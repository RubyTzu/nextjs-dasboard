'use client';
//import from next
import { useRouter } from 'next/navigation';
//import ui
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import FullPageLoading from './FullPageLoading';

export default function AddExpenseButton({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      setIsLoading(true);
    }, 300);
    router.push(`/test/split/new/group/${groupId}/expense`, { scroll: false });
  };
  return (
    <>
      {isLoading && <FullPageLoading />}
      <div
        onClick={handleClick}
        className="fixed bottom-[45px] left-[50%] flex h-14 w-14 translate-x-[-50%] cursor-pointer items-center justify-center rounded-full bg-highlight-20 active:bg-highlight-60"
      >
        <PlusIcon className="h-7 w-7 stroke-[2px]" />
      </div>
    </>
  );
}

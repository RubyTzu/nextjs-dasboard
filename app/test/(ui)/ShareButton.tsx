'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import SuccessAlert from '@/app/test/(ui)/SuccessAlert';

export default function ShareButton({
  groupId,
  name,
}: {
  groupId: string;
  name: string;
}) {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const base = 'http://localhost:3000/test/split/group/';
  const links = base + groupId;

  const handlesShareLink = (e: any) => {
    e.preventDefault();
    setIsShow(true);
    router.refresh();
    console.log('share ' + links);

    // setTimeout(() => {
    //   setIsShow(false);
    //   router.refresh();
    // }, 900)
  };

  return (
    <>
        <div onClick={e =>handlesShareLink(e)} className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-primary-orange">
          <ArrowUpTrayIcon className="h-5 w-5 stroke-[2px] text-grey-300" />
        </div>
      <SuccessAlert
        text="分享連結視窗"
        name={name}
        isShow={isShow}
        setIsShow={setIsShow as Function}
      />
    </>
  );
}

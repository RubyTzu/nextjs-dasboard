'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LinkIcon } from '@heroicons/react/24/outline';
import SuccessAlert from '@/app/test/(ui)/SuccessAlert';

export default function CopyLinkButton({
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

  const copylink = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText(links);
    setIsShow(true);
    router.refresh();
    console.log('copy ' + links);
    
    setTimeout(() => {
      setIsShow(false);
      router.refresh();
    }, 900)
  };

  return (
    <>
        <div onClick={e => copylink(e)} className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-primary-orange">
          <LinkIcon className="h-5 w-5 cursor-pointer stroke-[2px] text-grey-300" />
        </div>
      <SuccessAlert
        text="連結已複製"
        name={name}
        isShow={isShow}
        setIsShow={setIsShow as Function}
      />
    </>
  );
}

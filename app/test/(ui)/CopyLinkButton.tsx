'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import { useState } from 'react';
//import ui
import { LinkIcon } from '@heroicons/react/24/outline';
import SuccessAlert from '@/app/test/(ui)/SuccessAlert';

export default function CopyLinkButton({
  id,
  name,
  inGroupPage
}: {
  id: string;
  name: string;
  inGroupPage: boolean;
}) {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const base = 'http://localhost:3000/test/split/group/';
  const links = base + id;

  const handleCopyLink = (e: any) => {
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
      {inGroupPage ?
        (<div onClick={e => handleCopyLink(e)} className="flex justify-center items-center bg-neutrals-20 p-2 rounded-full">
          <LinkIcon className="w-5 h-5 cursor-pointer" />
        </div>)
        :
        (<div onClick={e => handleCopyLink(e)} className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-highlight-60">
          <LinkIcon className="h-5 w-5 cursor-pointer stroke-[2px] text-grey-400" />
        </div>)
      }
      <SuccessAlert
        text="連結已複製"
        name={name}
        isShow={isShow}
        setIsShow={setIsShow as Function}
        inGroupPage={inGroupPage}
      />
    </>
  );
}


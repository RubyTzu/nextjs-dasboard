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

  const copylink = () => {
    navigator.clipboard.writeText(links);
    setIsShow(true);
    router.refresh();
    console.log('copy ' + links);
  };

  return (
    <>
      <div className="relative z-10" onClick={copylink}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-300">
          <LinkIcon className="h-5 w-5 cursor-pointer stroke-[2px] text-grey-300" />
        </div>
      </div>
      <SuccessAlert
        text="Copy Link:"
        name={name}
        isShow={isShow}
        setIsShow={setIsShow as Function}
      />
    </>
  );
}

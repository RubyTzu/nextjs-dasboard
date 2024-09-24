'use client';
//import from next
import Image from 'next/image';
import { useRouter } from 'next/navigation';
//import data
import { ExtendedGroup, Group } from '../(data)/(sharedFunction)/types';
import { useGroup } from '../(data)/(fetchData)/Providers';
//import ui
import ShareButton from '@/app/test/(ui)/ShareButton';
import { useState } from 'react';
import FullPageLoading from './FullPageLoading';

export default function GroupButton({ groupData }: { groupData: Group }) {
  const router = useRouter();
  const { id, picture, name } = groupData;

  const groupWithUsers: ExtendedGroup = useGroup(groupData?.id || '');
  const groupUsers = groupWithUsers ? groupWithUsers.users : [];
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      setIsLoading(true);
    }, 300);
    router.push(`/test/split/group/${id}`, { scroll: false });
  };

  return (
    <>
      {isLoading && <FullPageLoading />}
      <div
        onClick={handleClick}
        className="mx-6 my-4 flex justify-between rounded-[20px] bg-white px-3 py-2"
      >
        <div className="z-0 flex items-center">
          {picture ? (
            <Image
              src={picture}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-highlight-60"
              width={200}
              height={200}
              alt={picture}
              priority
            />
          ) : null}
          <div className="w-52 truncate pl-3 font-normal">{name}</div>
        </div>
        <div className="flex items-center">
          <ShareButton
            id={id || ''}
            name={name}
            inGroupPage={false}
            groupUsers={groupUsers}
          />
        </div>
      </div>
    </>
  );
}

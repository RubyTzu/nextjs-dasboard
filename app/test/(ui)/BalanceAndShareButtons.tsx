//import from next or react
import { useState } from 'react';
//import data
import { useAllContext } from '@/app/test/(data)/(fetchData)/Providers';
import { ExtendedGroup } from '../(data)/(sharedFunction)/types';
//import ui
import { DollarTwoIcon } from '@/app/test/(ui)/Icons';
import ShareButton from '@/app/test/(ui)/ShareButton';
import { useRouter } from 'next/navigation';
import FullPageLoading from './FullPageLoading';

interface Props {
  groupData: ExtendedGroup;
}

export default function BalanceAndShareButtons({ groupData }: Props) {
  const { loginUserId } = useAllContext();
  let id = groupData?.id ? groupData.id : '';
  let users = groupData?.users ? groupData.users : [];

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      setIsLoading(true);
    }, 300);
    router.push(`/test/split/group/${groupData.id}/balance`, { scroll: false });
  };

  return (
    <>
      {groupData && users?.some((user) => user.id === loginUserId) ? (
        <div className="flex items-center justify-center gap-2 pb-3 pt-6">
          <div
            onClick={handleClick}
            className="flex items-center justify-between rounded-full bg-neutrals-20 px-5 py-2 text-sm active:bg-neutrals-30"
          >
            {isLoading && <FullPageLoading />}
            <DollarTwoIcon />
            <p className="ml-1 font-medium">結餘</p>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton
              id={id || ''}
              name={groupData.name}
              inGroupPage={true}
              groupUsers={users}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

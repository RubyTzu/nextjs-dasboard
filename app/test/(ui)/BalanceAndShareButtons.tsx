//import from next
import Link from 'next/link';
//import data
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
import { ExtendedGroup } from '../(data)/(sharedFunction)/types';
//import ui
import { DollarTwoIcon } from '@/app/test/(ui)/Icons'
import ShareButton from '@/app/test/(ui)/ShareButton';
import CopyLinkButton from '@/app/test/(ui)/CopyLinkButton';

interface Props {
  groupData: ExtendedGroup;
}

export default function BalanceAndShareButtons({
  groupData,
}: Props) {
  const {
    id,
    users,
  } = groupData;

  return (
    <>
      {groupData && users?.some((user) => user.id === loginUserId) ? (
        <div className="flex items-center justify-center gap-2 pb-3 pt-6">
          <Link
            href={`/test/split/group/${groupData.id}/balance`}
            className="flex items-center justify-between rounded-full bg-neutrals-20 px-5 py-2 text-sm"
            scroll={false}
          >
            <DollarTwoIcon />
            <p className="ml-1 font-medium">結餘</p>
          </Link>
          <div className="flex items-center gap-2">
            <ShareButton id={id || ""} name={groupData.name} inGroupPage={true} />
            <CopyLinkButton id={id || ""} name={groupData.name} inGroupPage={true} />
          </div>
        </div>
      ) : null}
    </>
  );
}

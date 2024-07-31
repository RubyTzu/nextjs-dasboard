//import from next
import Link from 'next/link';
//import data
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
//import ui
import { DollarTwoIcon } from '@/app/test/(ui)/Icons'
import ShareButton from '@/app/test/(ui)/ShareButton';
import CopyLinkButton from '@/app/test/(ui)/CopyLinkButton';

export default function BalanceAndShareButtons({
  groupData,
  groupName,
}: {
  groupData: any;
  groupName: string;
}) {
  if (!groupData) return;

  const {
    id,
    users,
  }: {
    id: string;
    users: string[];
  } = groupData;

  return (
    <>
      {groupData && users.some((user: any) => user.id === loginUserId) ? (
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
            <ShareButton id={id} name={groupName} inGroupPage={true} />
            <CopyLinkButton id={id} name={groupName} inGroupPage={true} />
          </div>
        </div>
      ) : null}
    </>
  );
}

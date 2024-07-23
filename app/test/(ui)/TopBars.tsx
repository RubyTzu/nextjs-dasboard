//import from next
import Link from 'next/link';
//import data
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
//import ui
import { HomeIcon, EditIcon, EditTwoIcon } from '@/app/test/(ui)/Icons';
import clsx from 'clsx';

export function TopGroupBar({
  groupData,
  groupName,
}: {
  groupData: any;
  groupName: string;
}) {
  return (
    <div className="fixed z-10 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
      <Link href="/test/split/groups" className="h-6 w-6">
        <HomeIcon />
      </Link>
      <h1 className="text-lg">
        {groupData &&
          groupData.users.some((user: any) => user.id === loginUserId)
          ? groupName
          : 'no such Page'}
      </h1>
      <div className="h-6 w-6">
        {groupData &&
          groupData.users.some((user: any) => user.id === loginUserId) ? (
          <Link
            href={`/test/split/group/${groupData.id}/edit`}
            className="h-6 w-6"
            scroll={false}
          >
            <EditIcon />
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export function TopGroupSettingBar({ groupData }: { groupData: any }) {
  return (
    <div className="fixed z-20 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
      <div className="h-6 w-8" />
      <h1 className="text-lg">
        {groupData &&
          groupData.users.some((user: any) => user.id === loginUserId)
          ? '群組設定'
          : 'no such Page'}
      </h1>
      <div className="h-6 w-8">
        {groupData &&
          groupData.users.some((user: any) => user.id === loginUserId) ? (
          <Link href={`/test/split/group/${groupData.id}`} scroll={false}>
            <p className="">取消</p>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export function TopExpenseBar({
  expenseData,
  group,
}: {
  expenseData: any;
  group: any;
}) {
  if (!group) return;
  let groupId = group.id;

  return (
    <div className="fixed z-10 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
      <Link href={`/test/split/group/${groupId}`} className="h-6 w-6">
        <HomeIcon />
      </Link>
      <h1 className="text-lg">
        {expenseData &&
          (expenseData.payerId === loginUserId ||
            expenseData.sharers?.some((sharer: any) => sharer.id === loginUserId))
          ? '費用明細'
          : 'no such expense'}
      </h1>
      <div className="h-6 w-6">
        {expenseData &&
          (expenseData.payerId === loginUserId ||
            expenseData.sharers?.some(
              (sharer: any) => sharer.id === loginUserId,
            )) ? (
          <Link
            href={`/test/split/group/${groupId}/expense/${expenseData.id}/edit`}
            className="h-6 w-6"
            scroll={false}
          >
            <EditTwoIcon />
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export function TopExpenseSettingBar({
  group,
  expenseData,
  phase,
  setPhase,
}: {
  group: any;
  expenseData: any;
  phase: number;
  setPhase: any;
}) {
  function handleClick() {
    if (phase === 1) return;
    setPhase(phase - 1);
    console.log(phase);
  }

  return (
    <div className="fixed z-20 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
      <div className="flex h-6 w-12 items-center justify-start">
        <div
          onClick={handleClick}
          className={clsx('cursor-pointer text-sm', {
            hidden: phase === 1,
          })}
        >
          上一步
        </div>
      </div>
      <h1 className="text-lg">
        {expenseData &&
          (expenseData.payerId === loginUserId ||
            expenseData.sharers?.some((sharer: any) => sharer.id === loginUserId))
          ? '編輯費用'
          : 'no such Page'}
      </h1>
      <div className="flex h-6 w-12 items-center justify-end">
        {expenseData &&
          (expenseData.payerId === loginUserId ||
            expenseData.sharers?.some(
              (sharer: any) => sharer.id === loginUserId,
            )) ? (
          <Link
            href={`/test/split/group/${group.id}/expense/${expenseData.id}`}
            scroll={false}
          >
            <p className="text-sm">取消</p>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export function TopBar({ name, handleClick, rightBtnName }: { name: string, handleClick: ()=> void, rightBtnName:string}) {
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
      <div className="h-6 w-8" />
      <h1 className="text-lg">
        {name}
      </h1>
      <div className="h-6 w-8">

        <div onClick={handleClick}>
          <p className="">{rightBtnName}</p>
        </div>

      </div>
    </div>
  );
}

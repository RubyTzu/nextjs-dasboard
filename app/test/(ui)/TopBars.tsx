//import from next
import Link from 'next/link';
//import data
import { loginUserId } from '@/app/test/(data)/user';
//import ui
import { HomeIcon, Cog8ToothIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

export function TopGroupBar({ groupData, groupName }: { groupData: any; groupName: string }) {

  return (
    <div className="z-10 fixed w-full bg-highlight-50 flex justify-between items-center text-white px-5 py-4">
      <Link href="/test/split/groups" className="h-6 w-6">
        <HomeIcon />
      </Link>
      <h1 className="text-lg">
        {groupData && groupData.users.some((user: any) => user.id === loginUserId) ? groupName : 'no such Page'}
      </h1>
      <div className="h-6 w-6">
        {groupData && groupData.users.some((user: any) => user.id === loginUserId) ?
          (
            <Link href={`/test/split/group/${groupData.id}/edit`} className="h-6 w-6" scroll={false}>
              <Cog8ToothIcon />
            </Link>
          ) : ''}
      </div>
    </div>
  )
}

export function TopGroupSettingBar({ groupData }: { groupData: any }) {

  return (
    <div className="z-20 fixed w-full bg-highlight-50 flex justify-between items-center text-white px-5 py-4">
      <div className="h-6 w-8" />
      <h1 className="text-lg">
        {groupData && groupData.users.some((user: any) => user.id === loginUserId) ? '群組設定' : 'no such Page'}
      </h1>
      <div className="h-6 w-8">
        {groupData && groupData.users.some((user: any) => user.id === loginUserId) ?
          (
            <Link href={`/test/split/group/${groupData.id}`} scroll={false}>
              <p className="">取消</p>
            </Link>
          ) : ''}
      </div>
    </div>
  )
}

export function TopExpenseBar({ expenseData, group }: { expenseData: any, group: any }) {
  if (!group) return
  let groupId = group.id

  return (
    <div className="z-10 fixed flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
      <Link href={`/test/split/group/${groupId}`} className="h-6 w-6">
        <HomeIcon />
      </Link>
      <h1 className="text-lg">
        {expenseData && (
          expenseData.payerId === loginUserId
          ||
          expenseData.sharers?.some((sharer: any) => sharer.id === loginUserId))
          ? "費用明細" : "no such expense"}
      </h1>
      <div className="h-6 w-6">
        {expenseData && (
          expenseData.payerId === loginUserId
          ||
          expenseData.sharers?.some((sharer: any) => sharer.id === loginUserId))
          ? <Link href={`/test/split/expense/${expenseData.id}/edit`} className="h-6 w-6" scroll={false}>
            <PencilSquareIcon />
          </Link> : ""}
      </div>
    </div>
  );
}

export function TopExpenseSettingBar({ expenseData }: { expenseData: any }) {

  return (
    <div className="z-20 fixed w-full bg-highlight-50 flex justify-between items-center text-white px-5 py-4">
      <div className="h-6 w-8" />
      <h1 className="text-lg">
        {expenseData && (
          expenseData.payerId === loginUserId
          ||
          expenseData.sharers?.some((sharer: any) => sharer.id === loginUserId))
          ? '編輯費用' : 'no such Page'}
      </h1>
      <div className="h-6 w-8">
        {expenseData && (
          expenseData.payerId === loginUserId
          ||
          expenseData.sharers?.some((sharer: any) => sharer.id === loginUserId))
          ?
          (
            <Link href={`/test/split/expense/${expenseData.id}`} scroll={false}>
              <p className="">取消</p>
            </Link>
          ) : ''}
      </div>
    </div>
  )
}
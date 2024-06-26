'use client';
//import data
import { loginUserId } from '@/app/test/(data)/user';
import { useUser } from '@/app/test/(data)/Providers';
//import ui
import GroupButton from '@/app/test/(ui)/GroupButton';
import AddGroupButton from '@/app/test/(ui)/AddGroupButton';

export default function Page() {
  const data = useUser(loginUserId);

  return (
    <div className="flex min-h-screen flex-col bg-highlight-50">
      <h1 className="pt-7 z-[2] fixed left-[50%] translate-x-[-50%] w-full bg-highlight-50 text-center text-2xl font-semibold tracking-wide text-white">
        群組列表
      </h1>
      <AddGroupButton />
      <div className="mt-[6.5rem]">
        {data
          ? data.groups.map((group: any) => (
              <GroupButton key={group.id} groupData={group} />
            ))
          : null}
      </div>
      <div className="mb-16"></div>
    </div>
  );
}

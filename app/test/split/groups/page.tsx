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
      <h1 className="fixed left-[50%] z-[2] w-full translate-x-[-50%] bg-highlight-50 py-5 text-center text-2xl font-bold text-white">
        群組列表
      </h1>
      <AddGroupButton />
      <div className="mt-24">
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

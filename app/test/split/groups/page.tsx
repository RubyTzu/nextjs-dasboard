'use client';
//import from next & react
import { Suspense, useEffect } from 'react';
//import data
import {
  useAllContext,
  useUser,
} from '@/app/test/(data)/(fetchData)/Providers';
import { LoginUser } from '../../(data)/(sharedFunction)/types';
//import ui
import GroupButton from '@/app/test/(ui)/GroupButton';
import AddGroupButton from '@/app/test/(ui)/AddGroupButton';
//import ui loading fallback
import { GroupsSkeleton } from '@/app/test/(ui)/LoadingSkeletons';

export default function Page() {
  const { loginUserId, setLoginUserId } = useAllContext();

  useEffect(() => {
    localStorage.setItem('loginUserId', 'u1');

    const loginUserId = localStorage.getItem('loginUserId');
    if (loginUserId) {
      setLoginUserId(loginUserId);
    }
  }, [loginUserId]);

  const userData: LoginUser = useUser(loginUserId || '');

  return (
    <div className="flex min-h-screen flex-col bg-highlight-50">
            <Suspense fallback={<GroupsSkeleton />}>
      <h1 className="fixed left-[50%] z-[2] w-full translate-x-[-50%] bg-highlight-50 pt-7 text-center text-2xl font-semibold tracking-wide text-white">
        群組列表
      </h1>
      <AddGroupButton />
      <div className="mt-[6.5rem]">
        {userData?.groups.map((group) => (
          <GroupButton key={group.id} groupData={group} />
        ))}
      </div>
      <div className="mb-16"></div>
      </Suspense>
    </div>
  );
}

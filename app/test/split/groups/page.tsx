'use client';
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
import { FadeIn } from '../../(ui)/FadeIn';

export default function Page() {
  const { loginUserId } = useAllContext();
  let userData: LoginUser = {
    id: '',
    name: '',
    picture: '',
    lineId: '',
    groups: [],
  };

  userData = useUser(loginUserId || '');

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col bg-highlight-50">
      {userData ? (
        <>
          <h1 className="fixed left-[50%] z-[2] w-full translate-x-[-50%] bg-highlight-50 pt-7 text-center text-2xl font-semibold tracking-wide text-white">
            群組列表
          </h1>
          <AddGroupButton />
          <div className="mt-[6.5rem]">
            <FadeIn direction="right">
              {userData?.groups.map((group) => (
                <GroupButton key={group.id} groupData={group} />
              ))}
            </FadeIn>
          </div>
          <div className="mb-16"></div>
        </>
      ) : (
        <GroupsSkeleton />
      )}
    </div>
  );
}
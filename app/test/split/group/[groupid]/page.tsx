'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
//import data
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
import { useGroup } from '@/app/test/(data)/(fetchData)/Providers';
import { ExtendedGroup } from '@/app/test/(data)/(sharedFunction)/types';
//import ui
import { TopGroupBar } from '@/app/test/(ui)/TopBars';
import UsersBar from '@/app/test/(ui)/UsersBar';
import BalanceAndShareButtons from '@/app/test/(ui)/BalanceAndShareButtons';
import ExpensesList from '@/app/test/(ui)/ExpensesList';
import AddExpenseButton from '@/app/test/(ui)/AddExpenseButton';
import JoinGroupModal from '@/app/test/(ui)/JoinGroupModal';
import AlertModal from '@/app/test/(ui)/AlertModal';
//import ui loading fallback
import { UsersBarSkeleton } from '@/app/test/(ui)/LoadingSkeletons';

export default function Page() {
  const { groupid } = useParams<{ groupid: string }>();
  const group: ExtendedGroup = useGroup(groupid);
  const [currentGroup, setCurrentGroup] = useState<ExtendedGroup>(group);

  useEffect(() => {
    if (group) {
      setCurrentGroup(group);
    }
  }, [group]);

  const isGroupFull = group?.users?.every((user) => !user.adoptable);
  const isUserInGroup = group?.users?.some((user) => user.id === loginUserId);
  const isUserAdoptable = group?.users?.some((user) => user.adoptable === true);

  return (
    <div className="flex flex-col">
      <Suspense fallback={<UsersBarSkeleton />}>
        <TopGroupBar
          isBalancePage={false}
          groupData={group}
        />
        {isUserInGroup && (
          <>
            <UsersBar groupData={group} />
            <BalanceAndShareButtons groupData={group} />
            <ExpensesList groupData={group} />
            <AddExpenseButton groupId={groupid} />
          </>
        )}
        {isUserAdoptable && !isUserInGroup && (
          <JoinGroupModal
            groupData={currentGroup}
            setCurrentGroup={setCurrentGroup}
          />
        )}
        {isGroupFull && !isUserInGroup && (
          <AlertModal
            url={`/test/split/groups`}
            hintWord="目前群組中無成員空位，請聯絡群組成員新增空位"
            buttonHintWord="確定"
          />
        )}
      </Suspense>
    </div>
  );
}

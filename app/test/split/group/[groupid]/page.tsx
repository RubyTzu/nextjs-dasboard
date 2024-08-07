'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
//import data
import { useGroup } from '@/app/test/(data)/(fetchData)/Providers';
//import ui
import { TopGroupBar } from '@/app/test/(ui)/TopBars';
import UsersBar from '@/app/test/(ui)/UsersBar';
import BalanceAndShareButtons from '@/app/test/(ui)/BalanceAndShareButtons';
import ExpensesList from '@/app/test/(ui)/ExpensesList';
import AddExpenseButton from '@/app/test/(ui)/AddExpenseButton';
//import ui loading fallback
import { UsersBarSkeleton } from '@/app/test/(ui)/LoadingSkeletons';
import JoinGroupModal from '@/app/test/(ui)/JoinGroupModal';
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
import AlertModal from '@/app/test/(ui)/AlertModal';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const group = useGroup(params.groupid);
  const [currentGroup, setCurrentGroup] = useState(group);

  useEffect(() => {
    if (group) {
      setCurrentGroup(group);
    }
  }, [group]);


  return (
    <div className="flex flex-col">
      <Suspense fallback={<UsersBarSkeleton />}>
        <TopGroupBar
          groupData={group}
          isBalancePage={false}
        />
        <UsersBar groupData={group} />
        <BalanceAndShareButtons groupData={group} />
        <ExpensesList groupData={group} />
        <AddExpenseButton groupId={params.groupid} />
        {group?.users.some((user: any) => user.adoptable === true) 
        && !group?.users.some((user: any) => user.id === loginUserId) 
        && <JoinGroupModal
            groupData={currentGroup}
            setCurrentGroup={setCurrentGroup}
          />
        }
        {group?.users.every((user: any) => user.adoptable === false )
        && !group?.users.some((user: any) => user.id === loginUserId)
         && <AlertModal
          url={`/test/split/groups`}
          hintWord="目前群組中無成員空位，請聯絡群組成員新增空位"
          buttonHintWord="確定"
        />
        }
      </Suspense>
    </div>
  );
}

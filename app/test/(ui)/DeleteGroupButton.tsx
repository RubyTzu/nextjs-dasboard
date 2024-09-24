//import from next & react
import { useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
//import data
import { useAllContext } from '@/app/test/(data)/(fetchData)/Providers';
import { ExtendedExpense, ExtendedGroup, GroupUser, LoginUser } from '../(data)/(sharedFunction)/types';
import { changeExpense, changeUserGroup, changeGroup, deleteGroup, getExpensesforAdoptUser } from '../(data)/(fetchData)/API';
//import ui
import { TrashcanIcon, LeaveIcon } from '@/app/test/(ui)/Icons';
import DeleteModal from './DeleteModal';
//import other
import { v4 as uuidv4 } from 'uuid';

interface Props {
  groupData: ExtendedGroup;
  loginUserData: LoginUser;
}

export default function DeleteGroupButton({
  groupData,
  loginUserData
}: Props) {
  const { loginUserId } = useAllContext();
  const router = useRouter();
  const isAdmin = groupData.creatorId === loginUserId;
  const isOnlyOneAdopted = groupData.users?.filter(user => user.adoptable === false).length === 1;
  const [isShow, setIsShow] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();
  const users = groupData.users
    ? groupData.users
    : [{ id: '', name: '', picture: '', adoptable: false }];

  const handleToggle = () => {
    dialogRef.current?.showModal();
    setTimeout(() => {
      setIsShow(true);
    }, 0);
  };

  const handleClose = () => {
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  async function handleDeleteGroup(id: string) {
    let newUserGroups = loginUserData.groups
    let deleteIndex = newUserGroups.findIndex(group => group.id === id)

    if (deleteIndex !== -1) {
      newUserGroups.splice(deleteIndex, 1)
    }

    let newUserData = {
      ...loginUserData,
      groups: newUserGroups
    }

    try {
      await deleteGroup(id);
      await changeUserGroup(newUserData);
      router.push(`/test/split/groups`);
    } catch (error) {
      console.error('API 呼叫失敗:', error);
    }
  }

  const handleLeaveGroup = async (loginUserId: string, groupId: string) => {
    const AllExpenses = await getExpensesforAdoptUser();
    let idx = uuidv4();
    let currentGroupUsers = [...users];
    let currentCreatorId = groupData.creatorId;
    const userIndex = currentGroupUsers.findIndex(
      (user: GroupUser) => user.id === loginUserId,
    );
    if (currentCreatorId === loginUserId) {
      currentCreatorId = idx
    }
    if (userIndex !== -1) {
      currentGroupUsers.splice(userIndex, 1, {
        "id": idx,
        "name": `原 ${loginUserData.name}`,
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      });
    }

    let updatedGroupExpenses = groupData.expenses ? groupData.expenses.map((expense: ExtendedExpense) => ({
      ...expense,
      payerId: expense.payerId === loginUserId ? idx : expense.payerId,
      sharers: expense.sharers.map(sharer => sharer.id === loginUserId ? { id: idx, amount: sharer.amount } : sharer)
    })) : []

    let newGroupData = {
      ...groupData,
      creatorId: currentCreatorId,
      expenses: updatedGroupExpenses,
      users: currentGroupUsers,
    }

    let newUserGroups = loginUserData.groups
    let deleteIndex = newUserGroups.findIndex(group => group.id === groupId)

    if (deleteIndex !== -1) {
      newUserGroups.splice(deleteIndex, 1)
    }

    let newUserData = {
      ...loginUserData,
      groups: newUserGroups
    }

    let updateExpenses = AllExpenses.map((expense: ExtendedExpense) => {
      if (expense.groupId === groupId) {
        return ({
          ...expense,
          payerId: expense.payerId === loginUserId ? idx : expense.payerId,
          sharers: expense.sharers.map(sharer => sharer.id === loginUserId ? { id: idx, amount: sharer.amount } : sharer)
        })
      } else {
        return expense
      }
    })

    try {
      await changeGroup(newGroupData);
      await changeUserGroup(newUserData);
      for (const expense of updateExpenses) {
        await changeExpense(expense);
      }
      router.push(`/test/split/groups`);
    } catch (error) {
      console.error('API 呼叫失敗:', error);
    }
  };

  return (
    <>
      <div className="mb-4 mt-4 flex items-center justify-between">
        <div
          onClick={handleToggle}
          className="flex cursor-pointer items-center gap-4"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-neutrals-30">
            <div className="absolute left-[13px]">
              <LeaveIcon />
            </div>
          </div>
          <p className="">離開群組</p>
        </div>
      </div>
      {isOnlyOneAdopted ? (
        <DeleteModal
          dialogRef={dialogRef}
          dialogId={dialogId}
          isShow={isShow}
          headerId={headerId}
          handleClose={handleClose}
          handleSave={() => handleDeleteGroup(groupData.id || '')}
          hintWord="若離開群組，所有的紀錄和成員名單將會被刪除。"
          idx={`deleteGroup${loginUserId}`}
        />
      ) : (
        <DeleteModal
          dialogRef={dialogRef}
          dialogId={dialogId}
          isShow={isShow}
          headerId={headerId}
          handleClose={handleClose}
          handleSave={() => handleLeaveGroup(loginUserId || '', groupData.id || '')}
          hintWord="確定要離開群組嗎？"
          idx={`leaveGroup${loginUserId}`}
        />
      )}
    </>
  );
}
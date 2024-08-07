//import from next & react
import { useId, useRef, useState } from 'react';
//import data
import { loginUserId } from '../(data)/(fetchData)/user';
import { ExtendedGroup, GroupUser } from '../(data)/(sharedFunction)/types';
//import ui
import { TrashcanIcon, LeaveIcon } from '@/app/test/(ui)/Icons';
import DeleteModal from './DeleteModal';

interface Props {
  groupData: ExtendedGroup;
  setCurrentGroup: React.Dispatch<React.SetStateAction<ExtendedGroup>>;
}

export default function DeleteGroupButton({
  groupData,
  setCurrentGroup,
}: Props) {
  const isAdmin = groupData.creatorId === loginUserId;
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

  const handleDeleteGroup = () => {
    console.log('delete Group!');

    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  const handleLeaveGroup = (id: string) => {
    let currentGroupUsers = [...users];

    const userIndex = currentGroupUsers.findIndex(
      (user: GroupUser) => user.id === id,
    );

    if (userIndex !== -1) {
      currentGroupUsers.splice(userIndex, 1);
    }
    setCurrentGroup({
      ...groupData,
      users: currentGroupUsers,
    });
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
    console.log('leave Group!');
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
              {isAdmin ? <TrashcanIcon /> : <LeaveIcon />}
            </div>
          </div>
          <p className="">{isAdmin ? '刪除群組' : '離開群組'}</p>
        </div>
      </div>
      {isAdmin ? (
        <DeleteModal
          dialogRef={dialogRef}
          dialogId={dialogId}
          isShow={isShow}
          headerId={headerId}
          handleClose={handleClose}
          handleSave={handleDeleteGroup}
          hintWord="若刪除群組，所有的紀錄和成員名單將會被刪除。"
          idx={`deleteGroup${loginUserId}`}
        />
      ) : (
        <DeleteModal
          dialogRef={dialogRef}
          dialogId={dialogId}
          isShow={isShow}
          headerId={headerId}
          handleClose={handleClose}
          handleSave={() => handleLeaveGroup(loginUserId)}
          hintWord="確定要離開群組嗎？"
          idx={`leaveGroup${loginUserId}`}
        />
      )}
    </>
  );
}

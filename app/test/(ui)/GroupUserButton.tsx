//import from next & react
import Image from 'next/image';
import { useId, useRef, useState } from 'react';
//import data
import { loginUserId } from '../(data)/(fetchData)/user';
//import ui
import { TrashcanIcon } from '@/app/test/(ui)/Icons';
import DeleteModal from './DeleteModal';

export function GroupUser({
  userData,
  groupData,
  setCurrentGroup,
}: {
  userData: any;
  groupData: any;
  setCurrentGroup: any;
}) {
  const [GroupUsers, setGroupUsers] = useState(groupData.users);
  const [lastSavedGroupUsers, setLastSavedGroupUsers] =
    useState<any>(GroupUsers);
  const [isShow, setIsShow] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  const handleToggle = () => {
    dialogRef.current?.showModal();
    setTimeout(() => {
      setIsShow(true);
    }, 0);
  };

  const handleClose = () => {
    setGroupUsers(lastSavedGroupUsers);
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  const handleSave = (e: any) => {
    let currentGroupUsers = [...GroupUsers];

    const userIndex = currentGroupUsers.findIndex(
      (user: any) => user.id === userData.id,
    );

    if (userIndex !== -1) {
      currentGroupUsers.splice(userIndex, 1);
    }

    setGroupUsers(currentGroupUsers);
    setLastSavedGroupUsers(currentGroupUsers);
    setCurrentGroup({
      ...groupData,
      users: currentGroupUsers,
    });
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  const isAdmin = groupData.creatorId === loginUserId;

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {userData.picture !== '' ? (
          <Image
            className="h-11 w-11 rounded-full bg-neutrals-20"
            src={userData.picture}
            width={32}
            height={32}
            alt="user's image"
          />
        ) : (
          <div className="h-11 w-11 rounded-full bg-neutrals-20"></div>
        )}
        <p>
          {userData.name}
          {groupData.creatorId === userData.id ? (
            <span>&emsp;(管理員)</span>
          ) : (
            ''
          )}
        </p>
      </div>
      {isAdmin && groupData.creatorId === userData.id ? (
        <div></div>
      ) : (
        <>
          {isAdmin && (
            <>
              <div
                onClick={handleToggle}
                className="flex h-8 w-8 items-center justify-center"
              >
                <TrashcanIcon />
              </div>
              <DeleteModal
                dialogRef={dialogRef}
                dialogId={dialogId}
                isShow={isShow}
                headerId={headerId}
                handleClose={handleClose}
                handleSave={(e: any) => handleSave(e)}
                hintWord="確定要刪除成員嗎？"
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

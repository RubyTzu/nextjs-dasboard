import Image from 'next/image';
import { useId, useRef, useState } from 'react';
import { loginUserId } from '../(data)/(fetchData)/user';
import { TrashcanIcon } from '@/app/test/(ui)/Icons';
import DeleteModal from './DeleteModal';

export function GroupUser({
  idx,
  userData,
  groupData,
  setCurrentGroup,
  isAddPage,
  loginUserData
}: {
  idx: any;
  userData: any;
  groupData: any;
  setCurrentGroup: any;
  isAddPage: boolean;
  loginUserData: any;
}) {
  const [lastSavedGroup, setLastSavedGroup] =
    useState<any>(groupData);
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
    setCurrentGroup(lastSavedGroup);
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  const handleSave = (e: any) => {
    let currentGroupUsers = [...groupData.users];
    const userIndex = currentGroupUsers.findIndex(
      (user: any) => user.name === userData.name && e.target.id === idx,
    );

    if (userIndex !== -1) {
      currentGroupUsers.splice(userIndex, 1);
    }

    setLastSavedGroup({
      ...groupData,
      users: currentGroupUsers
    });
    setCurrentGroup({
      ...groupData,
      users: currentGroupUsers
    });
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  const isAdmin = groupData.creatorId === loginUserId;
  const isMemberAdmin = (groupData.creatorId === userData.id) && groupData.creatorId !== undefined;
  const showAdminLabel = isAddPage && loginUserData.id === idx || isMemberAdmin;
  const showDeleteButton = (isAddPage && loginUserData.id !== idx) || (isAdmin && !isMemberAdmin);

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {userData.adoptable === false ? (
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
        <p className="truncate w-56">{userData.name}</p>
      </div>
      {showAdminLabel ? (
        <div className="relative left-[0.3rem] text-sm text-neutrals-70">管理員</div>
      ) : null}
      {showDeleteButton ? (
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
            idx={idx}
          />
        </>
      ) : null}
    </div>
  );
}

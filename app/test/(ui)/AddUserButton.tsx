'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
//import ui
import { AddUserIcon } from '@/app/test/(ui)/Icons';
import NameModal from './NameModal';

export default function AddUserButton({
  groupData,
  setCurrentGroup,
}: {
  groupData: any;
  setCurrentGroup: any;
}) {
  const {
    users,
  }: {
    users: any;
  } = groupData;

  const [currentGroupUserName, setCurrentGroupUserName] = useState('');
  const [lastSavedGroup, setLastSavedGroup] =
    useState<any>(groupData);
  const [isShow, setIsShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!groupData) return;

  const toggleDialog = () => {
    setIsShow(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    router.refresh();
  };

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setCurrentGroupUserName(e.target.value);
  };

  const handleClose = () => {
    setCurrentGroup(lastSavedGroup);
    setIsShow(false);
    router.refresh();
  };

  const handleSave = () => {
    let newGroup = {
      ...groupData,
      users:[
      ...users,
      {
        name: currentGroupUserName,
        picture: '',
      },
    ]};
    setCurrentGroup(newGroup);
    setLastSavedGroup(newGroup);
    setIsShow(false);
    setCurrentGroupUserName('');
  };

  return (
    <>
      <div
        onClick={toggleDialog}
        className="flex cursor-pointer items-center gap-4"
      >
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full">
          <div className="absolute left-[13px]">
            <AddUserIcon />
          </div>
        </div>
        <p className="">新增成員</p>
      </div>
      <NameModal
        isShow={isShow}
        handleChange={handleChange}
        handleClose={handleClose}
        handleSave={handleSave}
        TopBarName="成員名稱"
        inputRef={inputRef}
        currentValue={currentGroupUserName}
      />
    </>
  );
}

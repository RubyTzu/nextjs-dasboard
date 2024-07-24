//import from next & react
import Image from 'next/image';
import { Fragment, useState } from 'react';
//import ui
import { AddUserIcon, groupIconMap } from '@/app/test/(ui)/Icons';
import DeleteGroupButton from './DeleteGroupButton';
import { GroupUser } from './GroupUserButton';
// import { CameraIcon } from '@heroicons/react/24/outline';
import { CameraIcon, NotePencilIcon } from '@/app/test/(ui)/Icons';
import GroupPictureButton from './GroupPictureButton';
import GroupNameButton from './GroupNameButton';

export function GroupNameSetting({
  groupData,
  setCurrentGroup,
}: {
  groupData: any;
  setCurrentGroup: unknown;
}) {
  if (!groupData) return;
  const {
    id,
    picture,
    name,
  }: {
    id: string;
    picture:
      | 'groupIcon01'
      | 'groupIcon02'
      | 'groupIcon03'
      | 'groupIcon04'
      | 'groupIcon05'
      | 'groupIcon06'
      | 'groupIcon07'
      | 'groupIcon08'
      | 'groupIcon09'
      | 'groupIcon10'
      | 'groupIcon11'
      | 'groupIcon12'
      | 'groupIcon13'
      | 'groupIcon14'
      | 'groupIcon15';
    name: string;
  } = groupData;

  const Icon = groupIconMap[picture];

  function handleClick(id: any) {
    console.log(`edit group ${id}'s name`);
  }

  // const handleGroupPicture = () => {

  // }

  return (
    <>
      <div className="m-6 mt-16 flex items-center justify-between pt-6">
        <div className="flex items-center gap-4">
          {Icon ? (
            <GroupPictureButton
              groupData={groupData}
              setCurrentGroup={setCurrentGroup}
            />
          ) : null}
          <p className="text-xl">{name}</p>
        </div>
        {/* <div
          onClick={() => handleClick(id)}
          className="cursor-pointer text-sm text-grey-500"
        >
          編輯
        </div> */}
        <GroupNameButton
          groupData={groupData}
          setCurrentGroup={setCurrentGroup}
        />
      </div>
    </>
  );
}

export function GroupUsersSetting({ groupData }: { groupData: any }) {
  if (!groupData) return;

  function handladdUser() {
    console.log('user add!');
  }

  return (
    <>
      <div className="mx-6 flex flex-col">
        <p className="text-sm text-grey-500">群組成員</p>
        <div className="mb-4 mt-4 flex items-center justify-between">
          <div
            onClick={() => handladdUser()}
            className="flex cursor-pointer items-center gap-4"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full">
              <div className="absolute left-[13px]">
                <AddUserIcon />
              </div>
            </div>
            <p className="">新增成員</p>
          </div>
        </div>
        <div>
          {groupData.users.map((user: any) => {
            return (
              <Fragment key={user.id}>
                <GroupUser userData={user} />
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

export function GroupOtherSetting({ groupData }: { groupData: any }) {
  if (!groupData) return;

  return (
    <>
      <div className="mx-6 mt-4 flex flex-col">
        <p className="text-sm text-grey-500">其他設定</p>
        <DeleteGroupButton groupData={groupData} />
      </div>
    </>
  );
}

export function GroupSave({ groupData }: { groupData: any }) {
  function handleClick(id: string) {
    console.log(`group ${id} has changed and saved`);
  }

  return (
    <div className="flex w-full items-center justify-center">
      <button
        type="submit"
        onClick={() => handleClick(groupData.id)}
        className="mb-6 mt-3 w-[80%] rounded-full bg-highlight-20 py-3 text-center"
      >
        儲存
      </button>
    </div>
  );
}

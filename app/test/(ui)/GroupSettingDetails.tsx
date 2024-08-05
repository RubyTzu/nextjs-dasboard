//import from next & react
import { Fragment, useEffect } from 'react';
//import ui
import { groupIconMap } from '@/app/test/(ui)/Icons';
import DeleteGroupButton from './DeleteGroupButton';
import { GroupUser } from './GroupUserButton';
import GroupPictureButton from './GroupPictureButton';
import EditGroupNameButton from './EditGroupNameButton';
import AddUserButton from './AddUserButton';
//import other
import { v4 as uuidv4 } from 'uuid';
import AddGroupNameButton from './AddGroupNameButton';
import clsx from "clsx";

export function GroupNameSetting({
  groupData,
  setCurrentGroup,
  isAddPage
}: {
  groupData: any;
  setCurrentGroup: unknown;
  isAddPage: boolean;
}) {
  if (!groupData) return;
  const {
    picture,
    name,
  }: {
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

  return (
    <>
      <div className="m-6 mt-16 flex items-center justify-between pt-6">
        <div className={clsx("flex items-center gap-4",{
          "w-full": isAddPage,
        })}>
          {Icon ? (
            <GroupPictureButton
              groupData={groupData}
              setCurrentGroup={setCurrentGroup}
            />
          ) : null}
          {isAddPage ?
            <AddGroupNameButton
              groupData={groupData}
              setCurrentGroup={setCurrentGroup}
            />
            :
            <p className="text-xl">{name}</p>
          }

        </div>
        {isAddPage ?
          null :
          <EditGroupNameButton
            groupData={groupData}
            setCurrentGroup={setCurrentGroup}
          />}
      </div>
    </>
  );
}

export function GroupUsersSetting({
  groupData,
  setCurrentGroup,
  isAddPage,
  loginUserData
}: {
  groupData: any;
  setCurrentGroup: any;
  isAddPage: any;
  loginUserData: any;
}) {
  useEffect(() => {
    console.log('group Data change!');
    console.log(groupData)
  }, [groupData]);

  if (!groupData) return;

  return (
    <>
      <div className="mx-6 flex flex-col">
        <p className="text-sm text-grey-500">群組成員</p>
        <div className="mb-4 mt-4 flex items-center justify-between">
          <AddUserButton
            groupData={groupData}
            setCurrentGroup={setCurrentGroup}
          />
        </div>
        <div>
          {isAddPage ? <>
            <GroupUser
              idx={loginUserData.id}
              userData={loginUserData}
              groupData={groupData}
              setCurrentGroup={setCurrentGroup}
              isAddPage={isAddPage}
              loginUserData={loginUserData}
            />
            {
              groupData.users.map((user: any) => {
                let idx = uuidv4();

                return (
                  <Fragment key={idx}>
                    <GroupUser
                      idx={idx}
                      userData={user}
                      groupData={groupData}
                      setCurrentGroup={setCurrentGroup}
                      isAddPage={isAddPage}
                      loginUserData={loginUserData}
                    />
                  </Fragment>
                );
              })
            }</> :
            <>{
              groupData.users.map((user: any) => {
                let idx = uuidv4();

                return (
                  <Fragment key={idx}>
                    <GroupUser
                      idx={idx}
                      userData={user}
                      groupData={groupData}
                      setCurrentGroup={setCurrentGroup}
                      isAddPage={isAddPage}
                      loginUserData={loginUserData}
                    />
                  </Fragment>
                );
              })
            }</>
          }

        </div>
      </div>
    </>
  );
}

export function GroupOtherSetting({
  groupData,
  setCurrentGroup,
}: {
  groupData: any;
  setCurrentGroup: any;
}) {
  if (!groupData) return;

  return (
    <>
      <div className="mx-6 mt-4 flex flex-col">
        <p className="text-sm text-grey-500">其他設定</p>
        <DeleteGroupButton
          groupData={groupData}
          setCurrentGroup={setCurrentGroup}
        />
      </div>
    </>
  );
}

export function GroupSave({ groupData }: { groupData: any }) {
  function handleClick() {
    console.log(`group ${groupData.id} has changed and saved`);
    console.log(groupData);
  }

  return (
    <div className="flex w-full items-center justify-center">
      <button
        type="submit"
        onClick={handleClick}
        className="mb-6 mt-3 w-[80%] rounded-full bg-highlight-20 py-3 text-center"
      >
        儲存
      </button>
    </div>
  );
}

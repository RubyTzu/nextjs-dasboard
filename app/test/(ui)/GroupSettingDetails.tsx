//import from next & react
import { Fragment, useEffect } from 'react';
//import data
import { Group, GroupUser, LoginUser } from '../(data)/(sharedFunction)/types';
import { addGroup } from '../(data)/(fetchData)/API';
//import ui
import DeleteGroupButton from './DeleteGroupButton';
import { GroupUserButton } from './GroupUserButton';
import GroupPictureButton from './GroupPictureButton';
import EditGroupNameButton from './EditGroupNameButton';
import AddUserButton from './AddUserButton';
import AddGroupNameButton from './AddGroupNameButton';
//import other
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

interface GroupNameSettingProps {
  loginUserData: LoginUser;
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
  isAddPage: boolean;
  nameExist: boolean;
  setNameExist: React.Dispatch<React.SetStateAction<boolean>>;
  hasNameLength: boolean;
  setHasNameLength: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GroupUsersSettingProps {
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
  isAddPage: boolean;
  loginUserData: LoginUser | null;
}

interface GroupOtherSettingProps {
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
}

export function GroupNameSetting({
  loginUserData,
  groupData,
  setCurrentGroup,
  isAddPage,
  nameExist,
  setNameExist,
  hasNameLength,
  setHasNameLength
}: GroupNameSettingProps) {
  const { picture, name } = groupData;

  return (
    <>
      <div className="m-6 mt-16 flex items-center justify-between pt-6">
        <div
          className={clsx('flex items-center gap-4', {
            'w-full': isAddPage,
          })}
        >
          {picture ? (
            <GroupPictureButton
              groupData={groupData}
              setCurrentGroup={setCurrentGroup}
            />
          ) : null}
          {isAddPage ? (
            <AddGroupNameButton
              loginUserData={loginUserData}
              groupData={groupData}
              setCurrentGroup={setCurrentGroup}
              nameExist={nameExist}
              setNameExist={setNameExist}
              hasNameLength={hasNameLength}
              setHasNameLength={setHasNameLength}
            />
          ) : (
            <p className="w-52 truncate text-xl">{name}</p>
          )}
        </div>
        {isAddPage ? null : (
          <EditGroupNameButton
            loginUserData={loginUserData}
            groupData={groupData}
            setCurrentGroup={setCurrentGroup}
            nameExist={nameExist}
            setNameExist={setNameExist}
          />
        )}
      </div>
    </>
  );
}

export function GroupUsersSetting({
  groupData,
  setCurrentGroup,
  isAddPage,
  loginUserData,
}: GroupUsersSettingProps) {
  useEffect(() => {
    console.log('group Data change!');
    console.log(groupData);
  }, [groupData]);

  return (
    <>
      <div className="mx-6 flex flex-col">
        <p className="text-sm text-grey-500">群組成員</p>
        <div className="mb-4 mt-4 flex items-center justify-between">
          <AddUserButton
            groupData={groupData}
            setCurrentGroup={setCurrentGroup}
            loginUserData={loginUserData || null}
          />
        </div>
        <div>
          {isAddPage ? (
            <>
              <GroupUserButton
                idx={loginUserData?.id || ''}
                userData={loginUserData || null}
                groupData={groupData}
                setCurrentGroup={setCurrentGroup}
                isAddPage={isAddPage}
                loginUserData={loginUserData || null}
              />
              {groupData.users &&
                groupData.users.map((user: GroupUser) => {
                  let idx = uuidv4();

                  return (
                    <Fragment key={idx}>
                      <GroupUserButton
                        idx={idx}
                        userData={user}
                        groupData={groupData}
                        setCurrentGroup={setCurrentGroup}
                        isAddPage={isAddPage}
                        loginUserData={loginUserData || null}
                      />
                    </Fragment>
                  );
                })}
            </>
          ) : (
            <>
              {groupData.users &&
                groupData.users.map((user: GroupUser) => {
                  let idx = uuidv4();

                  return (
                    <Fragment key={idx}>
                      <GroupUserButton
                        idx={idx}
                        userData={user}
                        groupData={groupData}
                        setCurrentGroup={setCurrentGroup}
                        isAddPage={isAddPage}
                        loginUserData={loginUserData || null}
                      />
                    </Fragment>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export function GroupOtherSetting({
  groupData,
  setCurrentGroup,
}: GroupOtherSettingProps) {
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

export function GroupSave({
  groupData,
  formRef,
  nameExist,
  hasNameLength
}: {
  groupData: Group;
  formRef: React.RefObject<HTMLFormElement>;
  nameExist: boolean;
  hasNameLength: boolean;
}) {
  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (nameExist) return;
    if(!hasNameLength) return

    try {
      // await addGroup({
      //   id: 'gNew',
      //   name: 'group Games New',
      //   picture: '/images/icons/groupIcon08.svg',
      //   creatorId: 'u1',
      //   expenses: [],
      //   users: [
      //     {
      //       id: 'u1',
      //       name: 'a',
      //       picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
      //       adoptable: false,
      //     },
      //   ],
      // });

      console.log(groupData);

      if (formRef.current) {
        formRef.current.submit();
      }
    } catch (error) {
      console.error('API 呼叫失敗:', error);
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <button
        disabled={nameExist || !hasNameLength}
        type="submit"
        onClick={handleClick}
        className="mb-6 mt-3 w-[80%] rounded-full bg-highlight-20 py-3 text-center disabled:bg-neutrals-30 disabled:text-text-onDark-secondary"
      >
        儲存
      </button>
    </div>
  );
}

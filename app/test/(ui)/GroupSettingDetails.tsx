//import from next & react
import { useState, useEffect, useId, useRef, Fragment } from 'react';
//import data
import {
  Group,
  ExtendedGroup,
  GroupUser,
  LoginUser,
} from '../(data)/(sharedFunction)/types';
import { addGroup, changeUserGroup } from '../(data)/(fetchData)/API';
//import ui
import DeleteGroupButton from './DeleteGroupButton';
import { GroupUserButton } from './GroupUserButton';
import GroupPictureButton from './GroupPictureButton';
import EditGroupNameButton from './EditGroupNameButton';
import AddUserButton from './AddUserButton';
import AddGroupNameButton from './AddGroupNameButton';
import AlertModal from './AlertModal';
import { FullPageLoading } from './FullPageLoading';
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
  groupData: ExtendedGroup;
  setCurrentGroup: React.Dispatch<React.SetStateAction<ExtendedGroup>>;
  isAddPage: boolean;
  loginUserData: LoginUser | null;
}

interface GroupOtherSettingProps {
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
  loginUserData: LoginUser;
}

export function GroupNameSetting({
  loginUserData,
  groupData,
  setCurrentGroup,
  isAddPage,
  nameExist,
  setNameExist,
  hasNameLength,
  setHasNameLength,
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
              loginUserData={loginUserData}
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
  useEffect(() => {}, [groupData]);

  const creatorId = groupData.creatorId || '';
  const sortedUsers = groupData.users?.slice() || [];
  const creatorUserIndex = sortedUsers.findIndex(
    (user) => user.id === creatorId,
  );

  if (creatorUserIndex !== -1) {
    const [creatorUser] = sortedUsers.splice(creatorUserIndex, 1);

    sortedUsers.unshift(creatorUser);
  }

  return (
    <>
      <div className="mx-6 flex flex-col">
        <p className="text-sm text-grey-500">群組成員</p>
        <div className="mb-4 mt-4 flex items-center justify-between">
          <AddUserButton
            isAddPage={isAddPage}
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
                sortedUsers.map((user: GroupUser) => {
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
  loginUserData,
}: GroupOtherSettingProps) {
  return (
    <>
      <div className="mx-6 mt-4 flex flex-col">
        <p className="text-sm text-grey-500">其他設定</p>
        <DeleteGroupButton
          groupData={groupData}
          loginUserData={loginUserData}
        />
      </div>
    </>
  );
}

export function GroupSave({
  loginUserData,
  groupData,
  formRef,
  nameExist,
  hasNameLength,
}: {
  loginUserData: LoginUser;
  groupData: Group;
  formRef: React.RefObject<HTMLFormElement>;
  nameExist: boolean;
  hasNameLength: boolean;
}) {
  let groupUsers = groupData.users ? groupData.users : [];
  let groupId = groupData.id ? groupData.id : '';

  const [isShow, setIsShow] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSave(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);

    if (nameExist) return;
    if (!hasNameLength) return;

    let idx = uuidv4();
    let GroupBody = {
      id: idx,
      name: groupData.name,
      picture: groupData.picture,
      creatorId: loginUserData.id,
      expenses: [],
      users: [
        ...groupUsers,
        {
          id: loginUserData.id,
          name: loginUserData.name,
          picture: loginUserData.picture,
          adoptable: false,
        },
      ],
    };

    let UserBody = {
      ...loginUserData,
      groups: [
        ...loginUserData.groups,
        {
          id: idx,
          name: groupData.name,
          picture: groupData.picture,
        },
      ],
    };

    try {
      setIsLoading(true);

      await addGroup(GroupBody);
      await changeUserGroup(UserBody);

      if (formRef.current) {
        formRef.current.submit();
      }
    } catch (error) {
      console.error('API 呼叫失敗:', error);
    }
  }

  const handleToggle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dialogRef.current?.showModal();
    setTimeout(() => {
      setIsShow(true);
    }, 0);
  };

  const handleClose = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  const HintWord: React.FC = () => {
    return (
      <>
        <div>- 提醒 - </div>
        <div>目前群組中無成員空位， 將無法邀請成員加入</div>
      </>
    );
  };

  return (
    <>
      {isLoading && <FullPageLoading />}
      <div className="flex w-full items-center justify-center">
        {groupUsers.length === 0 ? (
          <>
            <button
              disabled={nameExist || !hasNameLength}
              type="submit"
              onClick={(e) => handleToggle(e)}
              className="mb-6 mt-3 w-[80%] rounded-full bg-highlight-20 py-3 text-center disabled:bg-neutrals-30 disabled:text-text-onDark-secondary"
            >
              儲存
            </button>
            <AlertModal
              hasTwoButton={true}
              isChangePage={false}
              dialogRef={dialogRef}
              dialogId={dialogId}
              isShow={isShow}
              headerId={headerId}
              url={`/test/split/group/${groupId}/edit`}
              handleClose={handleClose}
              handleSave={handleSave}
              hintWord={<HintWord />}
              buttonHintWord="仍要建立群組"
              SecondbuttonHintWord="新增成員空位"
            />
          </>
        ) : (
          <button
            disabled={nameExist || !hasNameLength}
            type="submit"
            onClick={handleSave}
            className="mb-6 mt-3 w-[80%] rounded-full bg-highlight-20 py-3 text-center disabled:bg-neutrals-30 disabled:text-text-onDark-secondary"
          >
            儲存
          </button>
        )}
      </div>
    </>
  );
}

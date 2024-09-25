'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
//import data
import { useGroup, useAllContext, useUser } from '@/app/test/(data)/(fetchData)/Providers';
import { ExtendedGroup } from '@/app/test/(data)/(sharedFunction)/types';
//import ui
import { TopGroupSettingBar } from '@/app/test/(ui)/TopBars';
import {
  GroupNameSetting,
  GroupOtherSetting,
  GroupUsersSetting,
} from '@/app/test/(ui)/GroupSettingDetails';
import { BackArrowIcon } from '@/app/test/(ui)/Icons';
import { FadeIn } from '@/app/test/(ui)/FadeIn';

export default function Page() {
  const { loginUserId } = useAllContext();
  const { groupid } = useParams<{ groupid: string }>();
  const loginUserData = useUser(loginUserId || '');
  const group = useGroup(groupid);
  const [currentGroup, setCurrentGroup] = useState<ExtendedGroup>(group);
  const [groupNameExist, setGroupNameExist] = useState(false);
  const [hasNameLength, setHasNameLength] = useState<boolean>(true);

  useEffect(() => {
    if (group) {
      setCurrentGroup(group);
    }
  }, [group]);

  const hasGroupData = Boolean(currentGroup);
  const isUserInGroup =
    hasGroupData &&
    currentGroup.users?.some((user) => user.id === loginUserId);

  return (
    <form method="post" action={`/test/split/group/${groupid}`}>
      <div className="relative flex flex-col">
        <TopGroupSettingBar
          isAddPage={false}
          groupData={currentGroup}
          middleHintword="群組設定"
          leftHintWord={<BackArrowIcon />}
          rightHintWord=""
          leftCancelLink={`/test/split/group/${groupid}`}
          rightCancelLink=""
        />
        {isUserInGroup && (
          <FadeIn direction='left'>
            <GroupNameSetting
              loginUserData={loginUserData}
              groupData={currentGroup}
              setCurrentGroup={setCurrentGroup}
              isAddPage={false}
              nameExist={groupNameExist}
              setNameExist={setGroupNameExist}
              hasNameLength={hasNameLength}
              setHasNameLength={setHasNameLength}
            />
            <GroupUsersSetting
              groupData={currentGroup}
              setCurrentGroup={setCurrentGroup}
              isAddPage={false}
              loginUserData={null}
            />
            <GroupOtherSetting
              groupData={currentGroup}
              setCurrentGroup={setCurrentGroup}
              loginUserData={loginUserData}
            />
          </FadeIn>
        )}
      </div>
    </form>
  );
}

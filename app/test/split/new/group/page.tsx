'use client';
//import from next & react
import { useState } from 'react';
//import data
import {
  useUser,
  useAllContext,
} from '@/app/test/(data)/(fetchData)/Providers';
import { Group } from '@/app/test/(data)/(sharedFunction)/types';
//import ui
import { TopGroupSettingBar } from '@/app/test/(ui)/TopBars';
import {
  GroupNameSetting,
  GroupSave,
  GroupUsersSetting,
} from '@/app/test/(ui)/GroupSettingDetails';
import { FadeIn } from '@/app/test/(ui)/FadeIn';

export default function Page() {
  const { loginUserId } = useAllContext();
  const data = useUser(loginUserId || '');
  const [currentGroup, setCurrentGroup] = useState<Group>({
    name: '未命名群組',
    picture: '/images/icons/groupIcon01.svg',
    users: [],
  });
  const [nameExist, setNameExist] = useState(false);
  const [hasNameLength, setHasNameLength] = useState<boolean>(true);

  return (
    <div>
      <div className="relative flex flex-col">
        <TopGroupSettingBar
          isAddPage={true}
          groupData={currentGroup}
          middleHintword="建立群組"
          leftHintWord=""
          rightHintWord="取消"
          leftCancelLink=""
          rightCancelLink={`/test/split/groups`}
        />
        <FadeIn direction="left">
          <div className="mx-auto min-w-[320px] max-w-[800px]">
            <GroupNameSetting
              loginUserData={data}
              groupData={currentGroup}
              setCurrentGroup={setCurrentGroup}
              isAddPage={true}
              nameExist={nameExist}
              setNameExist={setNameExist}
              hasNameLength={hasNameLength}
              setHasNameLength={setHasNameLength}
            />
            <GroupUsersSetting
              groupData={currentGroup}
              setCurrentGroup={setCurrentGroup}
              isAddPage={true}
              loginUserData={data}
            />
            <GroupSave
              loginUserData={data} // json-server 適用
              groupData={currentGroup}
              nameExist={nameExist}
              hasNameLength={hasNameLength}
              url={`/test/split/groups`}
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

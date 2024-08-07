'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
//import data
import { useGroup } from '@/app/test/(data)/(fetchData)/Providers';
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
//import ui
import { TopGroupSettingBar } from '@/app/test/(ui)/TopBars';
import {
  GroupNameSetting,
  GroupOtherSetting,
  GroupSave,
  GroupUsersSetting,
} from '@/app/test/(ui)/GroupSettingDetails';
import { BackArrowIcon } from '@/app/test/(ui)/Icons';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const group = useGroup(params.groupid);
  const [currentGroup, setCurrentGroup] = useState(group);

  useEffect(() => {
    if (group) {
      setCurrentGroup(group);
    }
  }, [group]);

  const hasGroupData = Boolean(currentGroup);
  const isUserInGroup = hasGroupData && currentGroup.users.some((user: any) => user.id === loginUserId);

  return (
    <form method="post" action={`/test/split/group/${params.groupid}`}>
      <div className="relative flex flex-col">
        <TopGroupSettingBar
          groupData={currentGroup}
          isAddPage={false}
          middleHintword="群組設定"
          leftHintWord={<BackArrowIcon />}
          rightHintWord=""
          leftCancelLink={`/test/split/group/${params.groupid}`}
          rightCancelLink=""
        />
        {isUserInGroup &&
          <>
            <GroupNameSetting
              groupData={currentGroup}
              setCurrentGroup={setCurrentGroup}
              isAddPage={false}
            />
            <GroupUsersSetting
              groupData={currentGroup}
              setCurrentGroup={setCurrentGroup}
              isAddPage={false}
              loginUserData={""}
            />
            <GroupOtherSetting
              groupData={currentGroup}
              setCurrentGroup={setCurrentGroup}
            />
          </>
        }
        {/* <GroupSave groupData={currentGroup} /> */}
      </div>
    </form>
  );
}

'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState,useEffect } from 'react';
//import data
import { useGroup } from '@/app/test/(data)/(fetchData)/Providers';
//import ui
import { TopGroupSettingBar } from '@/app/test/(ui)/TopBars';
import {
  GroupNameSetting,
  GroupOtherSetting,
  GroupSave,
  GroupUsersSetting,
} from '@/app/test/(ui)/GroupSettingDetails';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const group = useGroup(params.groupid);
  const [currentGroup, setCurrentGroup] = useState(group);
 
  useEffect(() => {
    if (group) {
      setCurrentGroup(group);
    }
  }, [group]);
 
  return (
    <form method="post" action={`/test/split/group/${params.groupid}`}>
      <div className="relative flex flex-col">
        <TopGroupSettingBar groupData={group} />
        <GroupNameSetting
          groupData={currentGroup}
          setCurrentGroup={setCurrentGroup}
        />
        <GroupUsersSetting
          groupData={currentGroup}
          setCurrentGroup={setCurrentGroup}
        />
        <GroupOtherSetting
          groupData={currentGroup}
          setCurrentGroup={setCurrentGroup}
        />
        {/* <GroupSave groupData={currentGroup} /> */}
      </div>
    </form>
  );
}

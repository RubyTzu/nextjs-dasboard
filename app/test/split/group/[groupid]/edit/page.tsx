"use client"
//import from next & react
import { useParams } from 'next/navigation';
//import data
import { useUser, useGroup } from "@/app/test/(data)/Providers";
import { loginUserId } from "@/app/test/(data)/user";
import { TopGroupSettingBar } from '@/app/test/(ui)/TopBars';
import { GroupNameSetting, GroupOtherSetting, GroupUsersSetting } from '@/app/test/(ui)/GroupSettingDetails';

export default function Page() {
  const params = useParams<{ groupid: string }>()
  const user = useUser(loginUserId)
  const group = useGroup(params.groupid)

  let groupNameAndImage = null
  if (!user) return
  for (let group of user.groups) {
    if (group.id === params.groupid) {
      groupNameAndImage = group
    }
  }

  return (
    <div className="flex flex-col">
      <TopGroupSettingBar groupData={group} />
      <GroupNameSetting groupData={groupNameAndImage} />
      <GroupUsersSetting groupData={group} />
      <GroupOtherSetting groupData={group} />
     

      
      {/* <div>儲存</div> */}
    </div>
  );
}
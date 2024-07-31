'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState } from 'react';
//import data
import { useUser } from '@/app/test/(data)/(fetchData)/Providers';
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
//import ui
import { TopGroupSettingBar } from '@/app/test/(ui)/TopBars';
import {
    GroupNameSetting,
    GroupSave,
    GroupUsersSetting,
} from '@/app/test/(ui)/GroupSettingDetails';

export default function Page() {
    const params = useParams<{ groupid: string }>();
    const data = useUser(loginUserId);
    const [currentGroup, setCurrentGroup] = useState({
        name: "未命名群組",
        picture: "groupIcon01",
        users: []
    });


    return (
        <form method="post" action={`/test/split/groups`}>
            <div className="relative flex flex-col">
                <TopGroupSettingBar
                    groupData={currentGroup}
                    isAddPage={true}
                    middleHintword="建立群組"
                    leftHintWord=""
                    rightHintWord="取消"
                    leftCancelLink=""
                    rightCancelLink={`/test/split/groups`}
                />
                <GroupNameSetting
                    groupData={currentGroup}
                    setCurrentGroup={setCurrentGroup}
                    isAddPage={true}
                />
                <GroupUsersSetting
                    groupData={currentGroup}
                    setCurrentGroup={setCurrentGroup}
                    isAddPage={true}
                    loginUserData={data}
                />
                <GroupSave groupData={currentGroup} />
            </div>
        </form>
    );
}
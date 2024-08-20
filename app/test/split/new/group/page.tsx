'use client';
//import from next & react
import { useState } from 'react';
//import data
import { useUser, useAllContext } from '@/app/test/(data)/(fetchData)/Providers';
import { Group } from '@/app/test/(data)/(sharedFunction)/types';
//import ui
import { TopGroupSettingBar } from '@/app/test/(ui)/TopBars';
import {
    GroupNameSetting,
    GroupSave,
    GroupUsersSetting,
} from '@/app/test/(ui)/GroupSettingDetails';

export default function Page() {
    const { loginUserId } = useAllContext();
    const data = useUser(loginUserId || '');
    const [currentGroup, setCurrentGroup] = useState<Group>({
        name: "未命名群組",
        picture: "/images/icons/groupIcon01.svg",
        users: []
    });

    return (
        <form method="post" action={`/test/split/groups`}>
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
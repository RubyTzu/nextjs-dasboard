'use client'
import { useState } from "react";


export default function AddGroupButton({ data, setData }: { data: any; setData: any }) {
const [fakeId, setFakeId] = useState(1);

    const handleAddGroup = async () => {
        let fakeGroupId = fakeId;
        setFakeId(fakeGroupId + 1)
        const newGroup = {
            groupId: `try${fakeGroupId}`,
            groupType: "travel",
            name: `trytrytry ${fakeGroupId}`,
            membersIds: [],
            url: `https://shareGrouptry${fakeGroupId}`,
        }

        setData([
            ...data,
            newGroup
        ])
        data.push(newGroup)
        console.log(data)
    }


    return (
        <div onClick={handleAddGroup} className="z-[2] fixed top-16 flex items-start bg-primary-blue text-grey-100 w-full px-6 pt-2 pb-3 text-base">
            <button className="active:bg-grey-100 rounded-[10px] px-2">+ 新增群組</button>
        </div>
    )
}
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
            membersIds: ["u1", "u2", "u3", "u4"],
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
        <div onClick={handleAddGroup} className="z-[2] fixed left-[50%] translate-x-[-50%] bottom-0 flex justify-center items-center bg-primary-100 w-full h-24">
            <button className="bg-primary-200 active:bg-grey-200 p-[13px] w-[92%] rounded-[10px]">Add Group</button>
        </div>
    )
}
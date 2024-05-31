"use client"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
import { addGroup, deleteGroup, changeGroup, } from "@/app/test/(renderTest)/fetchTest/(api)/API";

export function TestAddButton() {
    const router = useRouter()
    async function handleAddGroup() {
        let body = {
            id: uuidv4(),
            groupType: "health",
            name: "hi group try",
            membersIds: ["u1", "u2"]
        }

        await addGroup(body as any)
        console.log('add success')
        router.refresh()
    }

    return (
        <button className="bg-primary-300 rounded-full py-2 px-5 pointer-cursor" onClick={handleAddGroup}>+ group</button>
    )
}

export function TestDeleteButton({ groupId }: { groupId: any }) {
    const router = useRouter()
    async function handleDeleteGroup() {
        // console.log(groupId)
        await deleteGroup(groupId)
        console.log('delete success')
        router.refresh()
    }

    return (
        <button className="bg-primary-lightPink rounded-full py-1 px-3 pointer-cursor" onClick={handleDeleteGroup}>刪除</button>
    )
}

export function TestChangeButton({ groupData }: { groupData: any }) {
    const router = useRouter()
    async function handleChangeGroup() {
        let body = {
           ...groupData,
            name: "changeName",
        }

        await changeGroup(body as any)
        console.log('change success')
        router.refresh()
    }

    return (
        <button className="bg-primary-200 rounded-full py-1 px-3 pointer-cursor" onClick={handleChangeGroup}>更名</button>
    )
}


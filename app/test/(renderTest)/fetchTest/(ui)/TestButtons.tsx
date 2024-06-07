"use client"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
import { addGroup, deleteGroup, changeGroup } from "@/app/test/(renderTest)/fetchTest/(api)/API";

export function TestAddButton() {
    const router = useRouter()

    async function handleAddGroup() {

        let groupBody = {
            id: uuidv4(),
            users: [
                {
                    "id": "u11",
                    "name": "atest",
                    "picture": "https://cdn2.thecatapi.com/images/a4v.jpg"
                }
            ],
            expense: []
        }
 
        await addGroup(groupBody as any)

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
        <button className="bg-primary-lightPink rounded-full py-1 px-3 pointer-cursor" onClick={handleDeleteGroup}>刪除群組</button>
    )
}

export function TestChangeButton({ groupData }: { groupData: any }) {
    const router = useRouter()

    async function handleChangeGroup() {
        let groupBody = {
            ...groupData,
            users: [
                {
                    "id": "u12",
                    "name": "btest",
                    "picture": "https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg"
                }
            ]
        }

        await changeGroup(groupBody as any)

        console.log('change success')
        router.refresh()
    }

    return (
        <button className="bg-primary-200 rounded-full py-1 px-3 pointer-cursor" onClick={handleChangeGroup}>更名</button>
    )
}


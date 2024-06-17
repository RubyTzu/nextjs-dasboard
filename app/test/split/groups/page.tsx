'use client'
//import data
import { loginUserId } from "@/app/test/(data)/user";
import { useUser } from "@/app/test/(data)/Providers";
//import ui
import GroupButton from '@/app/test/(ui)/GroupButton';
import AddGroupButton from "@/app/test/(ui)/AddGroupButton";

export default function Page() {
    const data = useUser(loginUserId)

    return (
        <div className="flex flex-col bg-highlight-50 min-h-screen">
            <h1 className="z-[2] fixed left-[50%] translate-x-[-50%] text-center text-2xl font-bold bg-highlight-50 text-grey-100 w-full py-5">群組列表</h1>
            <AddGroupButton />
            <div className="mt-24">
                {data ? data.groups.map((group: any) =>
                    <GroupButton key={group.id} groupData={group} />)
                    : null}
            </div>
            <div className="mb-16"></div>
        </div>
    )
}
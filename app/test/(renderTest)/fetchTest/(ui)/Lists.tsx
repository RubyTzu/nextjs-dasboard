import Image from "next/image";
import { TestChangeButton, TestDeleteButton } from "@/app/test/(renderTest)/fetchTest/(ui)/TestButtons";
import { getGroups } from "@/app/test/(renderTest)/fetchTest/(api)/API";


async function GroupsList() {
    const dataGroup = await getGroups();
    if (!dataGroup) return

    return (
        <>
            <div className="text-lg font-bold">All Groups</div>
            {dataGroup.map((group: any) =>
                <div key={group.id}>
                    <div className="border-y-2 py-5">group id: <br/>{group.id}</div>
                    <div>users in group:</div>
                    {
                        group.users.map((user: any) => {
                            return (
                                <div key={user.id} className="flex justify-between items-center m-5">
                                    <div>{user.name}</div>
                                    <Image className="rounded-full w-10 h-10" src={user.picture} width={200} height={200} alt=""/>
                                    <div className="flex gap-3">
                                        <TestDeleteButton groupId={group.id} />
                                        <TestChangeButton groupData={group} />
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            )}
            <br />
        </>
    )
}




export { GroupsList }
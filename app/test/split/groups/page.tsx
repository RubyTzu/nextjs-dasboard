import GroupButton from '../../(ui)/GroupButton';
import AddGroupButton from "../../(ui)/AddGroupButton";
import { loginUserId } from "../../(data)/user";
import { getGroups } from "@/app/test/(data)/API";


export default async function Page() {
    const data = await getGroups();

    return (
        <div className="flex flex-col bg-primary-blue min-h-screen">
            <h1 className="z-[2] fixed left-[50%] translate-x-[-50%] text-center text-2xl font-bold bg-primary-blue text-grey-100 w-full py-5">群組列表</h1>
            <AddGroupButton />
            <div className="mt-24">
                {data ? data.map((group: any) =>
                    <div key={group.id} >
                        {group.membersIds.includes(loginUserId) ?
                            <GroupButton groupData={group} />
                            : null
                        }
                    </div >)
                    : null}

            </div>
            <div className="mb-16"></div>
        </div>
    )
}
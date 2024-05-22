import GroupButton from "../../(ui)/GroupButton";
import { groups } from "@/app/test/(data)/data";

export default function Page() {
    const data = groups

    return (
        <div className="flex flex-col">
            <h1 className="text-center text-3xl pt-6 pb-3 mt-16">Tool Name</h1>
            <div>
                {data ? data.map((group) => {
                    type groupType = 'travel' | 'health' | 'games' | 'other';

                    return (
                        <GroupButton key={group.groupId} groupId={group.groupId} groupType={group.groupType as groupType
                        } name={group.name}/>
                    )
                }) : null}
            </div>
            <button className="bg-primary-200 active:bg-grey-200 m-4 p-3 rounded-lg width-full">Add Group</button>
        </div>
    )
}
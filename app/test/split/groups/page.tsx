import GroupButton from "../../(ui)/GroupButton";
import { groups } from "@/app/test/(data)/data";

export default function Page() {
    const data = groups

    return (
        <div className="flex flex-col">
            <h1 className="z-[2] fixed left-[50%] translate-x-[-50%] text-center text-3xl py-7 mt-0 bg-primary-100 w-full">Tool Name</h1>
            <div className="mt-20">
                {data ? data.map((group) => <GroupButton key={group.groupId} group={group} />) : null}
            </div>
            <div className="z-[2] fixed left-[50%] translate-x-[-50%] bottom-0 flex justify-center items-center bg-primary-100 w-full h-24">
                <button className="bg-primary-200 active:bg-grey-200 p-[13px] w-[92%] rounded-[10px]">Add Group</button>
            </div>
        </div>
    )
}
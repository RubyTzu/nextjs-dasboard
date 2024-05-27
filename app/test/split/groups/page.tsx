"use client"
import { useState } from "react";
import AddGroupButton from "../../(ui)/AddGroupButton";
import GroupButton from "../../(ui)/GroupButton";
import { groups } from "@/app/test/(data)/data";

export default function Page() {
 const [data, setData] = useState(groups);

    return (
        <div className="flex flex-col bg-primary-blue">
            <h1 className="z-[2] fixed left-[50%] translate-x-[-50%] text-center text-2xl font-bold bg-primary-blue text-grey-100 w-full py-5">群組列表</h1>
            <AddGroupButton data={data} setData={setData}/>
            <div className="mt-24">
                {data ? data.map((group,idx) => <GroupButton key={idx} group={group} />) : null}
            </div>
            <div className="mb-16"></div>
        </div>
    )
}
"use client"
import { useState } from "react";
import AddGroupButton from "../../(ui)/AddGroupButton";
import GroupButton from "../../(ui)/GroupButton";
import { groups } from "@/app/test/(data)/data";

export default function Page() {
 const [data, setData] = useState(groups);

    return (
        <div className="flex flex-col">
            <h1 className="z-[2] fixed left-[50%] translate-x-[-50%] text-center text-3xl py-7 mt-0 bg-primary-100 w-full">Tool Name</h1>
            <div className="mt-20">
                {data ? data.map((group,idx) => <GroupButton key={idx} group={group} />) : null}
            
            </div>
            <div className="mb-24"></div>
            <AddGroupButton data={data} setData={setData}/>
        </div>
    )
}
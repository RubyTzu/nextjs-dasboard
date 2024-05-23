"use client"
import { groups } from "@/app/test/(data)/data";
import { useParams } from 'next/navigation'

export default function Page() {
    const data = groups
    const params = useParams<{ groupid: string }>()

    const gropData = data.filter((group) => group.groupId === params.groupid )[0]

    return (
        <>
            <div className="flex flex-col">
                <h1 className="text-center text-3xl pt-6 pb-3 mt-16"> { gropData ? gropData.name : "no such group Page" }</h1>


            </div >
        </>
    )
}
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
          <h1 className="fixed left-[50%] z-[2] mt-16 w-full translate-x-[-50%] bg-primary-100 py-7 text-center text-3xl">
            {gropData ? gropData.name : 'no such group Page'}
          </h1>
        </div>
      </>
    );
}
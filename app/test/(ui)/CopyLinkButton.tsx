"use client"
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { LinkIcon } from '@heroicons/react/24/outline';
import SuccessAlert from "@/app/test/(ui)/SuccessAlert";

export default function CopyLinkButton({ groupId, name }: { groupId: string; name: string }) {
    const [isShow, setIsShow] = useState(false);
    const router = useRouter();
    const base = "http://localhost:3000/test/split/group/";
    const links = base + groupId;

    const copylink = () => {
        navigator.clipboard.writeText(links)
        setIsShow(true)
        router.refresh()
        console.log("copy " + links)
    }

    return (
        <>
            <div onClick={copylink}>
                <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary-300">
                    <LinkIcon className="h-5 w-5 text-grey-300 stroke-[2px] cursor-pointer" />
                </div>
            </div>
            { isShow ? <SuccessAlert text="Copy Link:" name={name} isShow={isShow} setIsShow={setIsShow as Function} /> : null }
        </>
    )
}
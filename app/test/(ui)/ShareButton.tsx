"use client"
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import SuccessAlert from "@/app/test/(ui)/SuccessAlert";

export default function ShareButton({ groupId, name }: { groupId: string; name: string }) {
    const [isShow, setIsShow] = useState(false);
    const router = useRouter();
    const base = "http://localhost:3000/test/split/group/";
    const links = base + groupId;

    const sharelink = () => {
        setIsShow(true)
        router.refresh()
        console.log("share " + links)
    }

    return (
        <>
            <div onClick={sharelink}>
                <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary-300">
                    <ArrowUpTrayIcon className="h-5 w-5 text-grey-300 stroke-[2px]" />
                </div>
            </div>
            { isShow ? <SuccessAlert text="Share Link:" name={name} isShow={isShow} setIsShow={setIsShow as Function} /> : null }
        </>
    )
}
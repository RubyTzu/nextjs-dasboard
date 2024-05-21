"use client"
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';


export default function BackButton() {
    const router = useRouter()

    return (
        <>
        <ArrowLeftIcon className="h-8 w-8 text-[#CFCFCF] stroke-[3px] cursor-pointer" onClick={() => router.back()}/>
        </>

    )
}
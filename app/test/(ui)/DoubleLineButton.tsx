"use client"
//import from next
import { useRouter } from 'next/navigation';
//import ui
import { Bars2Icon } from '@heroicons/react/24/outline';


export default function DoubleLineButton() {
    const router = useRouter()

    return (
        <>
        <Bars2Icon className="h-8 w-8 text-[#CFCFCF] stroke-[2px] cursor-pointer"/>
        </>

    )
}
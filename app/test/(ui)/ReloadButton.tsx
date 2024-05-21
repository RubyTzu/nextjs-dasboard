"use client"
import { useRouter } from 'next/navigation';

export default function ReloadButton() {
    const router = useRouter()

    return (
        <button onClick={() => router.refresh()} className="bg-[#ffbdbd] hover:bg-[#f29b9b] active:bg-[#d16969] transition-colors text-[#fff] w-[85%] py-3 mt-16 rounded-full">Next Random Dog & Cat</button>
    )
}
'use client';
//import from next
import { useRouter } from 'next/navigation';
//import ui
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton() {
  const router = useRouter();

  return (
    <>
      <ChevronLeftIcon
        className="h-8 w-8 cursor-pointer stroke-[2px] text-[#CFCFCF]"
        onClick={() => router.back()}
      />
    </>
  );
}

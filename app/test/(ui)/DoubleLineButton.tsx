'use client';
//import from next
import { useRouter } from 'next/navigation';
//import ui
import { Bars2Icon } from '@heroicons/react/24/outline';

export default function DoubleLineButton() {
  const router = useRouter();

  return (
    <>
      <Bars2Icon className="h-8 w-8 cursor-pointer stroke-[2px] text-[#CFCFCF]" />
    </>
  );
}

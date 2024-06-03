'use client'
import { AddGroupIcon } from '@/app/test/(ui)/Icons';


export default function AddGroupButton() {

    const handleAddGroup = async () => {

        console.log("add group")
    }


    return (
      <div
        onClick={handleAddGroup}
        className="fixed top-16 z-[2] flex w-full items-start bg-primary-blue px-6 pb-3 pt-2 text-base text-grey-100"
      >
        <button className="flex items-center justify-center rounded-[10px] px-2 active:bg-grey-100">
          <AddGroupIcon />
          <span className="pl-2">新增群組</span>
        </button>
      </div>
    );
}
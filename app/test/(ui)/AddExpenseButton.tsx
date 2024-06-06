'use client';
//import data
import { loginUserId } from "../(data)/user";
//import ui
import { PlusIcon } from '@heroicons/react/24/outline';

export default function AddExpenseButton() {
  
    const handleAddExpense = () => {
        console.log("expense added")
    }


    return (
        <>
                <div onClick={handleAddExpense} className="fixed left-[50%] bottom-[45px] translate-x-[-50%] flex justify-center items-center bg-primary-green w-14 h-14 rounded-full cursor-pointer">
                    <PlusIcon className="w-7 h-7 stroke-[2px]" />
                </div>
        </>
    )
}
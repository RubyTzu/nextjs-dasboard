//import from next & react
import Image from 'next/image';
import { Fragment } from 'react';
//impoart data
import { useUser, useGroup } from '../(data)/Providers';
import { loginUserId } from '../(data)/user';
//import ui
import { groupIconMap, expenseIconMap, DollarIcon, NotePencilIcon } from '@/app/test/(ui)/Icons';

export function GroupInfoBar({ expenseData, group }: { expenseData: any; group: any }) {
    if (!expenseData) return
    if (!group) return

    let groupData = group
console.log(group)
    const { picture, name }: {
        picture: 'travel' | 'health' | 'games' | 'other';
        name: string;
    } = groupData

    const Icon = groupIconMap[picture];

    return (
        <>
            <div className="mt-16 pl-6 py-4 flex items-center gap-4 border-b-2">
                <p>你和</p>
                <div className="pl-3 pr-4 py-1 flex justify-center items-center gap-2 rounded-full bg-neutrals-30">
                    {Icon ? <Image src={Icon} className="z-0 flex h-7 w-7 items-center justify-center rounded-full bg-highlight-60" width={200} height={200} alt={picture} /> : null}
                    <div>{name}</div>
                </div>
            </div>
        </>
    )
}

export function ExpenseSettingStepOne({ expenseData }: { expenseData: any }) {
    if (!expenseData) return

    const {
        date,
        category,
        amount,
        name,
    }: {
        date: string;
        category:
        | 'food'
        | 'drink'
        | 'transport'
        | 'stay'
        | 'shopping'
        | 'entertainment'
        | 'other';
        amount: any;
        name: string;
    } = expenseData;

    const Icon = expenseIconMap[category];

    return (
        <div className="my-6 w-fit mx-auto">
            <div className="mb-4 py-[1px] px-2 rounded-full w-fit bg-neutrals-20 text-sm">{date}</div>
            <div className="my-3 flex gap-6 justify-between items-end">
                <div className="w-8 h-8 flex justify-center items-center rounded-md bg-highlight-60">{Icon ? <Icon /> : null}</div>
                <input className="pl-0 pb-1 bg-transparent border-0 border-b border-grey-500 w-48 focus:border-b focus:ring-0 focus:border-highlight-40" onChange={() => { }} type="text" value={name} />
            </div>
            <div className="my-3 flex gap-6 justify-between items-end">
                <div className="w-8 h-8 flex justify-center items-center rounded-md bg-highlight-60"><DollarIcon /></div>
                <input className="pl-0 pb-1 bg-transparent border-0 border-b border-grey-500 w-48 focus:border-b focus:ring-0 focus:border-highlight-40" onChange={() => { }} type="text" value={amount} />
            </div>
            <div className="pt-3 pb-6 flex gap-1 justify-center items-center text-sm">
                <div><NotePencilIcon /></div>
                <div>編輯備註</div>
            </div>
        </div>
    )
}
export function ExpenseSettingStepTwo({ expenseData }: { expenseData: any }) {
    if (!expenseData) return null;

    // const {
    //     payerId,
    //     groupId
    // }: {
    //     payerId: string;
    //     groupId: string;
    // } = expenseData;

    // let groupUsers = useGroup(groupId)
    // if (!groupUsers) return
    // groupUsers = groupUsers.users
    // console.log(groupUsers)

    // return (
    //     <div className="my-6 w-fit mx-auto">

    //         <div>1</div>
    //     </div>
    // )
}
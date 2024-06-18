//import from next & react
import Image from 'next/image';
import { Fragment } from 'react';
//import data
import { loginUserId } from '@/app/test/(data)/user';
//import ui
import { AddUserIcon, TrashcanIcon, groupIconMap } from '@/app/test/(ui)/Icons';


export function GroupNameSetting({ groupData }: { groupData: any; }) {
    if (!groupData) return
    const { picture, name }: {
        picture: 'travel' | 'health' | 'games' | 'other';
        name: string;
    } = groupData

    const Icon = groupIconMap[picture];
    return (
        <>
            <div className="m-6 mt-16 pt-6 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    {Icon ? <Image src={Icon} className="z-0 flex h-[72px] w-[72px] items-center justify-center rounded-lg bg-highlight-60" width={200} height={200} alt={picture} /> : null}
                    <p className="text-xl">{name}</p>
                </div>
                <p className="text-sm text-grey-500 cursor-pointer">編輯</p>
            </div>
        </>
    );
}
export function GroupUsersSetting({ groupData }: { groupData: any; }) {
    if (!groupData) return

    return (
        <>
            <div className="mx-6 flex flex-col">
                <p className="text-sm text-grey-500">群組成員</p>
                <div className="mt-4 mb-4 flex justify-between items-center">
                    <div className="flex items-center gap-4 cursor-pointer">
                        <div className="relative flex justify-center items-center w-11 h-11 rounded-full">
                            <div className="absolute left-[13px]"><AddUserIcon /></div>
                        </div>
                        <p className="">新增成員</p>
                    </div>
                </div>
                <div>
                    {groupData.users.map((user: any) => {
                        return (
                            <Fragment key={user.id}>
                                <GroupUser userData={user} />
                            </Fragment>)
                    })}
                </div>
            </div>
        </>
    );
}

function GroupUser({ userData }: { userData: any }) {
    return (
        <div className="mb-4 flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <Image
                    className="w-11 h-11 rounded-full bg-highlight-60"
                    src={userData.picture}
                    width={32}
                    height={32}
                    alt="user's image"
                />
                <p>{userData.name}</p>
            </div>
            <div className="flex justify-center items-center w-8 h-8">
                <TrashcanIcon />
            </div>
        </div>
    )
}

export function GroupOtherSetting({ groupData }: { groupData: any; }) {
    if (!groupData) return

    return (
        <>
            <div className="mt-4 mx-6 flex flex-col">
                <p className="text-sm text-grey-500">其他設定</p>
                <div className="mt-4 mb-4 flex justify-between items-center">
                    <div className="flex items-center gap-4 cursor-pointer">
                        <div className="relative flex justify-center items-center w-11 h-11 rounded-full bg-neutrals-30">
                            <div className="absolute left-[13px]"><TrashcanIcon /></div>
                        </div>
                        <p className="">刪除群組</p>
                    </div>
                </div>
            </div>
        </>
    );
}
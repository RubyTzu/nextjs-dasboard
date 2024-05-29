import Image from "next/image";
import { usersInfo } from "@/app/test/(data)/data";
import { Fragment } from "react";

export default function UsersBar({ groupData }: { groupData: any }) {
    const usersFilterData = usersInfo.filter((user) => {
        let newMembersIds = []

        if (!groupData) return
        if (groupData.membersIds.length > 5) {
            newMembersIds = groupData.membersIds.slice(0, 5)
        } else {
            newMembersIds = groupData.membersIds
        }

        return newMembersIds.includes(user.userId)
    })

    return (<>
        {groupData ?
            <>
                {groupData.membersIds.length ?
                    (<div className="mt-16 flex items-center justify-center gap-4 pt-8 pb-5 border-b-[2px]">
                        <ul className="flex items-center justify-center gap-2">
                            {groupData.membersIds.map((memberId: any, idx: any) => {
                                let user = usersFilterData.filter(user => memberId === user.userId)[0]

                                return (
                                    <Fragment key={idx}>
                                        {user ?
                                            <li>
                                                <Image
                                                    src={user.pictureUrl}
                                                    width={200}
                                                    height={200}
                                                    alt={user.displayName}
                                                    className="shadow rounded-full max-w-full align-middle border-none object-cover h-11 w-11" />
                                            </li> : null
                                        }
                                    </Fragment>
                                )
                            })}
                        </ul>
                        <div className="flex bg-grey-100 gap-[2px] py-1 pl-3 pr-2 rounded-full text-sm text-grey-300">
                            <p className="">{groupData.membersIds.length}</p>
                            <span className="relative bottom-[1px]">&gt;</span>
                        </div>
                    </div>) :
                    <NoneUsersBar text="$0"/>
                }
            </>
            :  <NoneUsersBar text="no such group"/>}

    </>)
}

function NoneUsersBar({text}: {text:string}) {
    return (
        <div className="mt-16 flex items-center justify-center gap-4 pt-8 pb-5 border-b-[2px]">
            {text}
        </div>
    )
}
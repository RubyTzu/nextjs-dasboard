//import from next & react
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
//import data
// import { usersInfo } from "@/app/test/(data)/data";
import { getUserInfo } from "@/app/test/(data)/API";
import { loginUserId } from "@/app/test/(data)/user";

export default function UsersBar({ groupData }: { groupData: any }) {

    if (!groupData) return
    let frontMembersIds = []
    
    if (groupData.membersIds.length > 5) {
     frontMembersIds = groupData.membersIds.slice(0, 5)
    } else {
     frontMembersIds = groupData.membersIds
    }

    return (<>
        {groupData && groupData.membersIds.includes(loginUserId) ?
            <>
                {groupData.membersIds.length ?
                    (<div className="mt-16 flex items-center justify-center gap-4 pt-8 pb-5 border-b-[2px]">
                        <ul className="flex items-center justify-center gap-2">
                             {frontMembersIds.map((memberId: any) => <UserBarImage id={memberId} key={memberId} />)}
                        </ul>
                        <div className="flex bg-grey-100 gap-[2px] py-1 pl-3 pr-2 rounded-full text-sm text-grey-400">
                            <p className="">{groupData.membersIds.length}</p>
                            <span className="relative bottom-[1px]">&gt;</span>
                        </div>
                    </div>) :
                    <NoneUsersBar text="$0" />
                }
            </>
            : <NoneUsersBar text="no such group" />}

    </>)
}

function NoneUsersBar({ text }: { text: string }) {
    return (
        <div className="mt-16 flex items-center justify-center gap-4 pt-8 pb-5 border-b-[2px]">
            {text}
        </div>
    )
}

function UserBarImage({ id }: { id: any }) {
    const [user, setUser] = useState<any>(null)
    const fetchData = async () => {
        setUser(await getUserInfo(id))
    }

    useEffect(() => { fetchData() }, [])

    return (
        <>
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
        </>
    )
}
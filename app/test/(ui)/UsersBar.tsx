//import from next
import Image from "next/image";
//import data
import { loginUserId } from "@/app/test/(data)/user";

export default function UsersBar({ groupData }: { groupData: any }) {

    if (!groupData) return
    let frontUsers = []
    
    if (groupData.users.length > 5) {
     frontUsers = groupData.users.slice(0, 5)
    } else {
     frontUsers = groupData.users
    }

    return (<>
        {groupData && groupData.users.some((user:any)=> user.id === loginUserId) ?
            <>
                {groupData.users.length ?
                    (<div className="mt-16 flex items-center justify-center gap-4 pt-8 pb-5 border-b-[2px]">
                        <ul className="flex items-center justify-center gap-2">
                             {frontUsers.map((user: any) => <UserBarImage user={user} key={user.id} />)}
                        </ul>
                        <div className="flex bg-neutrals-30 gap-[2px] py-1 px-3 rounded-full text-sm text-grey-500">
                            <p className="">{groupData.users.length}</p>
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

function UserBarImage({ user }: { user: any }) {

    return (
        <>
            {user ?
                <li>
                    <Image
                        src={user.picture}
                        width={200}
                        height={200}
                        alt={user.name}
                        className="shadow rounded-full max-w-full align-middle border-none object-cover h-11 w-11" />
                </li> : null
            }
        </>
    )
}
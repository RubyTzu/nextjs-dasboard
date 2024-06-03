import Image from "next/image";
import { TestChangeButton, TestDeleteButton } from "@/app/test/(renderTest)/fetchTest/(ui)/TestButtons";
import { getGroups,getExpenses,getUserInfos } from "@/app/test/(renderTest)/fetchTest/(api)/API";


async function GroupsList() {
    const dataGroups = await getGroups();
    return (
        <>
            <div className="text-lg font-bold">All Groups</div>
            {dataGroups.map((group: any) => {
                return (
                    <div key={group.id} className="flex justify-between m-5">
                        <div>{group.name}</div>
                        <div className="flex gap-3">
                            <TestDeleteButton groupId={group.id} />
                            <TestChangeButton groupData={group} />
                        </div>

                    </div>
                )
            })}
            <br />
        </>
    )
}

async function ExpensesList() {
    const dataExpenses = await getExpenses();
    return (
        <>
            <div className="text-lg font-bold">All Expenses</div>
            {dataExpenses.map((expense: any) => {
                return (
                    <div key={expense.id} className="flex justify-between m-5">
                        <div>{expense.name}</div>
                        <div>$ {expense.amount}</div>
                    </div>
                )
            })}
            <br />
        </>
    )
}

async function UsresList() {
    const dataUserInfos = await getUserInfos();
    return (
        <>
            <div className="text-lg font-bold">All Users</div>
            {dataUserInfos.map((user: any) => {
                return (
                    <div key={user.id} className="flex justify-between items-center m-5">
                        <div className="flex justify-between items-center gap-4">
                            <Image className="w-10 h-10 rounded-full object-cover" src={user.pictureUrl} alt="" width={600} height={600} />
                            <div>{user.displayName}</div>
                        </div>
                        <div>{user.id}</div>
                    </div>
                )
            })}
            <br />
        </>
    )
}

export { GroupsList, UsresList, ExpensesList }
import { loginUserId, user } from "@/app/test/(data)/user";
import Image from "next/image";

export default function SharerExpenseDetail({ expenseData, sharerId }: { expenseData: any, sharerId: any }) {
    const {
        cost,
        payerId,
        sharersIds
    }: {
        cost: any;
        payerId: string;
        sharersIds: string[];
    } = expenseData;
    let nf = new Intl.NumberFormat('en-US');
    let shareCost: any = (cost / sharersIds.length).toFixed(2)

    return (
        <div className="flex justify-between items-center w-full mb-5">
            <div className="relative ml-6 border border-black w-[62px]">
                <span className="after:absolute after:left-[-1px] after:bottom-0 after:content-[''] after:h-[52px] after:border after:border-black block">
                </span>
            </div>
            <div className="flex grow justify-between items-center">
                <div className="flex items-center">
                    <Image className="flex justify-center items-center h-[32px] w-[32px] bg-grey-200 rounded-full"
                        src={user(sharerId)?.pictureUrl}
                        width={32}
                        height={32}
                        alt="sharer image" />
                    <div className="ml-3">
                        {sharerId === loginUserId ? "你" : user(sharerId)?.displayName}&nbsp;要給&nbsp;{user(payerId)?.displayName}
                    </div>
                </div>
                <div>${nf.format(shareCost)}</div>
            </div>
        </div>
    )
}
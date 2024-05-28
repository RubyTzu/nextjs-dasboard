import Image from "next/image";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { debts, totalDebts } from "@/app/test/(data)/totalDebts";
import { expenseIconMap } from "@/app/test/(ui)/Icons";


export default function ExpensesList() {
    let userDebts: any = debts["u1"]
    let expenses: any = [{
        groupId: "g1",
        expenseId: "e1",
        expenseType: "food",
        cost: 210,
        date: "2024/5/28",
        event: "燒鳥肌肉串",
        payerId: "u1",
        sharersIds: ["u1", "u2",],
    }]
    // userDebts = {
    //     "燒鳥肌肉串": 105,
    //     "手工醃蘿波": 50,
    //     "豆腐沙拉": 150,
    //     "炭烤玉米筍": 180,
    //     "節瓜": 120,
    //     "山藥": 120,
    //     "杏苞菇": 120,
    //     "娃娃菜": 140,
    //     "茄子": 140,
    //     "炸豆腐": 150,
    //     "青蔥豚煎餃": 0,
    //     "韭菜豚煎餃": 100,
    //     "綜合煎餃": 120,
    //     "葡萄沙瓦": 340,
    //     "荔枝沙瓦": 180,
    //     "可爾必思": 0,
    //     "totalDebt": 2015
    // }

    // for (let expense in expenses) {
    //     if(expense === "event") {
    //         expenses[expense]["expenseDebt"] = userDebts[String(expense.event)];
            
    //     }
    //     console.log(expense)
    // }

    return (
        <div>
            {/* {console.log(userDebts)}
            {console.log(expenses)} */}
            <ExpenseButton expense={expenses[0]} />
        </div>
    )
}

function ExpenseButton({ expense }: { expense: any }) {
    const {
        expenseType,
        cost,
        event,
        payerId,
    }: {
        expenseType: 'food' | 'drink' | 'transport' | 'stay' | 'shopping' | 'entertainment' | 'other';
        cost: string;
        event: string;
        payerId: string;
    } = expense

    const Icon = expenseIconMap[expenseType];


    return (
        <div className="flex justify-between bg-grey-100 rounded-lg m-4 p-4">
            <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-primary-orange rounded-full h-11 w-11">
                    {Icon ? <Icon /> : null}
                </div>
                <div className="leading-4">
                    <p>{event}</p>
                    <p className="text-grey-300 text-sm">
                        <span>{payerId}</span>
                        &nbsp;paid&nbsp;
                        <span>{cost}$</span>
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <p>-$1000</p>
                <ChevronRightIcon className="w-3 h-3" />
            </div>
        </div>
    )
}
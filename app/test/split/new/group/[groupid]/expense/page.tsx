'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
//import data
import { useGroup } from '@/app/test/(data)/(fetchData)/Providers';
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
//import ui
import { TopExpenseSettingBar } from '@/app/test/(ui)/TopBars';
import {
    GroupInfoBar,
    NextStepButton,
} from '@/app/test/(ui)/ExpenseSettingDetails';
import { ExpenseSettingStepOne } from '@/app/test/(ui)/ExpenseSettingStepOne';
import { ExpenseSettingStepTwo } from '@/app/test/(ui)/ExpenseSettingStepTwo';
import { ExpenseSettingStepThree } from '@/app/test/(ui)/ExpenseSettingStepThree';

interface SettingExpense {
    id: string;
    name: undefined;
    category: undefined;
    amount: number | string;
    date: undefined;
    note: undefined;
    payerId: string;
    sharers: {
        id: string;
        amount: number;
    }[];
};

interface AddingExpense {
    name: string;
    category: string;
    amount: number | string;
    date: string;
    note: string;
    payerId: string;
    sharers: {
        id: string;
        amount: number;
    }[];
};

export default function Page() {
    const params = useParams<{ groupid: string; }>();
    const [phase, setPhase] = useState(1);
    const [isNotEqual, setIsNotEqual] = useState(false);
    const [isNotZero, setIsNotZero] = useState(false);
    const group = useGroup(params.groupid);
    const [currentExpense, setCurrentExpense] = useState<SettingExpense | AddingExpense>({
        name: "未命名費用",
        category: "food",
        amount: "",
        date: new Date().toISOString(),
        note: "",
        payerId: loginUserId,
        sharers: []
    });

    useEffect(() => {
        if (currentExpense.amount !== 0) {
            setIsNotZero(true)
        }
    }, [currentExpense?.amount, isNotZero])

    return (
        <form
            method="post"
            action={`/test/split/group/${params.groupid}`}
        >
            <div className="relative flex flex-col">
                <TopExpenseSettingBar
                    isAddPage={true}
                    group={group}
                    expenseData={currentExpense}
                    phase={phase}
                    setPhase={setPhase}
                    hintword='新增費用'
                    cancelLink={`/test/split/group/${params.groupid}`}
                />
                <GroupInfoBar expenseData={currentExpense} group={group} />
                <section>
                    <ExpenseSettingStepOne
                        group={group}
                        expenseData={currentExpense}
                        setCurrentExpense={setCurrentExpense}
                        phase={phase}
                    />
                    <ExpenseSettingStepTwo
                        expenseData={currentExpense}
                        setCurrentExpense={setCurrentExpense}
                        group={group}
                        phase={phase}
                    />
                    <ExpenseSettingStepThree
                        expenseData={currentExpense}
                        setCurrentExpense={setCurrentExpense}
                        group={group}
                        phase={phase}
                        setIsNotEqual={setIsNotEqual}
                    />
                </section>
                <section>
                    <NextStepButton
                        expenseData={currentExpense}
                        setCurrentExpense={setCurrentExpense}
                        phase={phase}
                        setPhase={setPhase}
                        isNotEqual={isNotEqual}
                        setIsNotEqual={setIsNotEqual}
                        isNotZero={isNotZero}
                    />
                </section>
            </div>
        </form>
    );
}

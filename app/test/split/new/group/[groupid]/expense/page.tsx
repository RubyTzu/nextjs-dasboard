'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
//import data
import { useGroup, useAllContext } from '@/app/test/(data)/(fetchData)/Providers';
import { ExtendedExpense } from '@/app/test/(data)/(sharedFunction)/types';
//import ui
import { TopExpenseSettingBar } from '@/app/test/(ui)/TopBars';
import {
  GroupInfoBar,
  NextStepButton,
} from '@/app/test/(ui)/ExpenseSettingDetails';
import { ExpenseSettingStepOne } from '@/app/test/(ui)/ExpenseSettingStepOne';
import { ExpenseSettingStepTwo } from '@/app/test/(ui)/ExpenseSettingStepTwo';
import { ExpenseSettingStepThree } from '@/app/test/(ui)/ExpenseSettingStepThree';

export default function Page() {
  const { loginUserId } = useAllContext();
  const { groupid } = useParams<{ groupid: string }>();
  const [phase, setPhase] = useState(1);
  const [isNotEqual, setIsNotEqual] = useState(false);
  const [isNotZero, setIsNotZero] = useState(false);
  const [isIncorrectTotalNum, setisIncorrectTotalNum] =
    useState<boolean>(false);
  const [nameExist, setNameExist] = useState<boolean>(false);
  const [hasNameLength, setHasNameLength] = useState<boolean>(true);


  const group = useGroup(groupid);
  const [currentExpense, setCurrentExpense] = useState<ExtendedExpense>({
    name: '未命名費用',
    category: 'food',
    amount: 0,
    date: new Date().toISOString(),
    note: '',
    payerId: loginUserId || '',
    sharers: [],
    creatorId: loginUserId || '',
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
    historys: [
      {
        editedAt: new Date().toISOString(),
        editorId: loginUserId || ''
      }
    ]
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (currentExpense.amount !== 0) {
      setIsNotZero(true);
    }
  }, [currentExpense?.amount, isNotZero]);

  return (
    <form ref={formRef} method="post" action={`/test/split/group/${groupid}`}>
      <div className="relative flex flex-col">
        <TopExpenseSettingBar
          isAddPage={true}
          group={group}
          expenseData={currentExpense}
          phase={phase}
          setPhase={setPhase}
          hintword="新增費用"
          cancelLink={`/test/split/group/${groupid}`}
        />
        <GroupInfoBar expenseData={currentExpense} group={group} />
        <section>
          <ExpenseSettingStepOne
            group={group}
            oldExpenseData={currentExpense}
            expenseData={currentExpense}
            setCurrentExpense={setCurrentExpense}
            phase={phase}
            setisIncorrectTotalNum={setisIncorrectTotalNum}
            nameExist={nameExist}
            setNameExist={setNameExist}
            hasNameLength={hasNameLength}
            setHasNameLength={setHasNameLength}
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
            isAddExpensePage={true}
            formRef={formRef}
            groupid={groupid}
            expenseData={currentExpense}
            phase={phase}
            setPhase={setPhase}
            isNotEqual={isNotEqual}
            setIsNotEqual={setIsNotEqual}
            isNotZero={true}
            isIncorrectTotalNum={isIncorrectTotalNum}
            nameExist={nameExist}
            hasNameLength={hasNameLength}
            group={group}
          />
        </section>
      </div>
    </form>
  );
}
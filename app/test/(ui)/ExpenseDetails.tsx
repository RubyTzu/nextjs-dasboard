//import from next & react
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
//import data
import { loginUserId } from '@/app/test/(data)/user';
import { getUserInfo } from "@/app/test/(data)/API";
//import ui
import { expenseIconMap } from '@/app/test/(ui)/Icons';
import SharerExpenseDetail from '@/app/test/(ui)/SharerExpenseDetail';


export function ExpenseDetailOne({ expenseData }: { expenseData: any }) {
  const {
    category,
    amount,
    name,
    createBy,
    createAt,
    updateBy,
    updateAt,
  }: {
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
    createBy: string;
    createAt: string;
    updateBy: string;
    updateAt: string;
  } = expenseData;
  const [createByUser, setCreateByUser] = useState<any>(null)
  const [updateByUser, setUpdateByUser] = useState<any>(null)
  const fetchData = async () => {
    setCreateByUser(await getUserInfo(createBy))
    setUpdateByUser(await getUserInfo(updateBy))
  }
  useEffect(() => {fetchData()}, [])

  const Icon = expenseIconMap[category];
  let nf = new Intl.NumberFormat('en-US');

  return (
    <div className="flex w-full justify-between pl-2 pr-3">
      {expenseData ? (
        <>
          <div className="flex gap-5">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border-[5px] border-white bg-primary-orange">
              <div className="scale-125">{Icon ? <Icon /> : null}</div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="text-xl leading-8">{name}</div>
              <div className="text-xs text-grey-300">
                <div className="leading-3">{createAt} {createByUser?.displayName}新增</div>
                <div className="leading-6">{updateAt} {updateByUser?.displayName}最後更新</div>
              </div>
            </div>
          </div>
          <div className="text-xl leading-8">${nf.format(amount)}</div>
        </>
      ) : null}
    </div>
  );
}

export function ExpenseDetailTwo({ expenseData }: { expenseData: any }) {
  const {
    amount,
    payerId,
    sharers,
  }: {
    amount: any;
    payerId: string;
    sharers: string[];
  } = expenseData;
  const [payerData, setPayerData] = useState<any>(null)
  const fetchData = async () => {
    setPayerData(await getUserInfo(payerId))
  }
  useEffect(() => {fetchData()}, [])

  let nf = new Intl.NumberFormat('en-US');

  return (
    <>
      {expenseData ? (
        <div className="mt-7 w-full px-3">
          <div className="flex gap-4">
            {payerData ?
              <Image
                className="z-10 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-grey-200"
                src={payerData.pictureUrl}
                width={64}
                height={64}
                alt="sharer image"
              /> : null}
            <div className="flex grow items-center justify-between">
              <div className="text-base">
                {loginUserId === payerId ? '你' : payerData?.displayName}
                先付了
              </div>
              <div>${nf.format(amount)}</div>
            </div>
          </div>

          {sharers.map((sharer: any, idx: any) => {
            return (
              <Fragment key={idx}>
                {sharer.id !== payerId ? (
                  <>
                    <SharerExpenseDetail
                      expenseData={expenseData}
                      sharer={sharer}
                    />
                  </>
                ) : null}
              </Fragment>
            );
          })}

          {sharers.length === 1 && sharers.some((sharer: any) => sharer.id === payerId) ? (
            <div className="my-5 flex w-full items-center justify-end">
              已結清無欠款
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export function ExpenseDetailThree({ expenseData }: { expenseData: any }) {
  return (
    <div className="mx-1 w-full">
      <div className="text-sm">備註</div>
      <div className="mt-2 min-h-[101px] rounded-lg bg-white p-3 text-base">
        {expenseData.note}
      </div>
    </div>
  );
}

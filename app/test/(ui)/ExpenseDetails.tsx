import { loginUserId, user } from '@/app/test/(data)/user';
import { expenseIconMap } from '@/app/test/(ui)/Icons';
import { Fragment } from 'react';
import SharerExpenseDetail from './SharerExpenseDetail';
import Image from 'next/image';

export function ExpenseDetailOne({ expenseData }: { expenseData: any }) {
    const {
        expenseType,
        cost,
        event,
        date
      }: {
        expenseType:
        | 'food'
        | 'drink'
        | 'transport'
        | 'stay'
        | 'shopping'
        | 'entertainment'
        | 'other';
        cost: any;
        event: string;
        date: string;
      } = expenseData;
      const Icon = expenseIconMap[expenseType];
      let nf = new Intl.NumberFormat('en-US');

    return (
        <div className='flex justify-between w-full pl-2 pr-3'>
            {expenseData ? 
            <>
                <div className="flex gap-5">
                    <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg bg-primary-orange border-[5px] border-white">
                        <div className="scale-125">
                            {Icon ? <Icon /> : null}
                     </div>      
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="text-xl leading-8">{event}</div>
                        <div className="text-xs text-grey-300">
                            <div className="leading-3">{date} 新增</div>
                            <div className="leading-6">{date} 最後更新</div>
                        </div>
                    </div>
                </div>
                <div className="text-xl leading-8">
                    ${nf.format(cost)}
                </div>
            </> : null}
        </div>
    )
}

export function ExpenseDetailTwo({ expenseData }: { expenseData: any }) {
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

    return (
        <>
            {expenseData ?
                <div className="mt-7 px-3 w-full">
                    <div className="flex gap-4">
                        <Image className="z-10 flex justify-center items-center h-[64px] w-[64px] bg-grey-200 rounded-full"
                        src={user(payerId)?.pictureUrl}
                        width={64}
                        height={64}
                        alt="sharer image" />
                        <div className="flex grow justify-between items-center">
                            <div className="text-base">
                                {user(payerId)?.displayName}先付了
                            </div>
                            <div>
                        ${nf.format(cost)}
                        </div> 
                        </div>
                    </div>
                   
                        {
                            sharersIds.map((id: any, idx: any) => {
                                return (
                                    <Fragment key={idx}>
                                        {id !== payerId ?
                                            <>
                                               <SharerExpenseDetail expenseData={expenseData} sharerId={id}/>
                                            </>
                                            : null
                                        }
                                    </Fragment >
                                )
                            })
                        }
                    
                </div>
                : null}
        </>
    )
}

export function ExpenseDetailThree({ expenseData }:{expenseData: any}) {
  return (
    <div className="mx-1 w-full">
      <div className="text-sm">備註</div>
      <div className="mt-2 min-h-[101px] rounded-lg bg-white p-3 text-base">
        {expenseData.note}
      </div>
    </div>
  );
}

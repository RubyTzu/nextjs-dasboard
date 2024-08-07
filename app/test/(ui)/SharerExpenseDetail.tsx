//import from next
import Image from 'next/image';
//import data
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
import { ExtendedExpense, GroupUser, Sharer } from '../(data)/(sharedFunction)/types';

interface Props {
  expenseData: ExtendedExpense;
  sharer: Sharer;
  users: GroupUser[];
}

export default function SharerExpenseDetail({
  expenseData,
  sharer,
  users,
}: Props) {
  const { payerId } = expenseData;
  const { id, amount } = sharer;

  let payerData = users.filter((user) => user.id === payerId)[0];
  let sharerData = users.filter((user) => user.id === id)[0];

  let nf = new Intl.NumberFormat('en-US');
  let shareAmount: any = Number(amount).toFixed(2);

  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <div className="relative ml-6 w-[62px] border border-black">
        <span className="block after:absolute after:bottom-0 after:left-[-1px] after:h-[52px] after:border after:border-black after:content-['']"></span>
      </div>
      <div className="flex grow items-center justify-between">
        <div className="flex items-center">
          {sharerData ? (
            <Image
              className="bg-grey-200 flex h-[32px] w-[32px] items-center justify-center rounded-full"
              src={sharerData.picture}
              width={32}
              height={32}
              alt="sharer image"
            />
          ) : null}
          <div className="ml-3">
            {id === loginUserId ? '你' : sharerData?.name}
            &nbsp;要給&nbsp;
            {payerId === loginUserId ? '你' : payerData?.name}
          </div>
        </div>
        <div>${nf.format(shareAmount)}</div>
      </div>
    </div>
  );
}

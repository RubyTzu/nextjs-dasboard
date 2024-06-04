//import data
import { loginUserId } from '@/app/test/(data)/user';

export default function DeleteExpenseButton({
  expenseData,
}: {
  expenseData: any;
}) {
  const {
    payerId,
    sharers,
  }: {
    payerId: string;
    sharers: string[];
  } = expenseData;

  return (
    <>
      {expenseData &&
      (payerId === loginUserId ||
        sharers?.some((sharer: any) => sharer.id === loginUserId)) ? (
        <div className="mt-8 flex h-9 w-44 items-center justify-center rounded-full bg-grey-100">
          刪除費用
        </div>
      ) : null}
    </>
  );
}

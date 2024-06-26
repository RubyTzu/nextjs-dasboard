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

  const handleDelete = () => {
    console.log('expense deleted');
  };

  return (
    <>
      {expenseData &&
      (payerId === loginUserId ||
        sharers?.some((sharer: any) => sharer.id === loginUserId)) ? (
        <div
          onClick={handleDelete}
          className="mt-8 flex h-9 w-44 cursor-pointer items-center justify-center rounded-full bg-neutrals-30 text-neutrals-60"
        >
          刪除費用
        </div>
      ) : null}
    </>
  );
}

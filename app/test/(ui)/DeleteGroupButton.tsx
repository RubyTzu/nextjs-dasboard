//import data
import { loginUserId } from '@/app/test/(data)/user';

export default function DeleteGroupButton({
  groupData,
}: {
  groupData: any;
}) {
  const {
    payerId,
    sharers,
  }: {
    payerId: string;
    sharers: string[];
  } = groupData;

  const handleDelete = () => {
    console.log("expense deleted")
  }

  return (
    <>
        <div onClick={handleDelete} className="mt-8 flex h-9 w-44 items-center justify-center rounded-full bg-neutrals-30 text-neutrals-60 cursor-pointer">
          刪除群組
        </div>
    </>
  );
}

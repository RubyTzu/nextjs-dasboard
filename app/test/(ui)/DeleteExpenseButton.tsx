//import from next & react
import { useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
//import data
import { ExtendedExpense, ExtendedGroup } from '../(data)/(sharedFunction)/types';
import { changeGroup, deleteExpense } from '../(data)/(fetchData)/API';
//import ui
import DeleteModal from './DeleteModal';

interface Props {
  expenseData: ExtendedExpense;
  group: ExtendedGroup;
}

export default function DeleteExpenseButton({ expenseData, group }: Props) {
  const router = useRouter();
  const { id, groupId } = expenseData;

  const [isShow, setIsShow] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  const handleToggle = () => {
    dialogRef.current?.showModal();
    setTimeout(() => {
      setIsShow(true);
    }, 0);
  };

  const handleClose = () => {
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  async function handleDeleteExpense(groupId: string, expenseId: string) {
    
    let newExpenses = group.expenses ? [...group.expenses] : []
    let deleteIndex = newExpenses.findIndex((expense) => expense.id === expenseId)

    if(deleteIndex !== -1){
      newExpenses.splice(deleteIndex, 1)
    }

    let newGroupData = {
      ...group,
      expenses: newExpenses
   } 

    try {
      await deleteExpense(expenseId);
      await changeGroup(newGroupData)
      router.push(`/test/split/group/${groupId}`);
    } catch (error) {
      console.error('API 呼叫失敗:', error);
    }
  }

  return (
    <>
      {expenseData ? (
        <>
          <div
            onClick={handleToggle}
            className="mt-8 flex h-9 w-44 cursor-pointer items-center justify-center rounded-full bg-neutrals-30 text-neutrals-60 text-sm"
          >
            刪除費用
          </div>
          <DeleteModal
            dialogRef={dialogRef}
            dialogId={dialogId}
            isShow={isShow}
            headerId={headerId}
            handleClose={handleClose}
            handleSave={() => handleDeleteExpense(group.id || '', id || '')}
            hintWord="確定要放棄這筆費用嗎？"
            idx={`deleteExpense${id}`}
          />
        </>
      ) : null}
    </>
  );
}
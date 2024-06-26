//import from next & react
import Image from 'next/image';
//import ui
import { groupIconMap, NextstepIcon } from '@/app/test/(ui)/Icons';
import clsx from 'clsx';

export function GroupInfoBar({
  expenseData,
  group,
}: {
  expenseData: any;
  group: any;
}) {
  if (!expenseData) return;
  if (!group) return;

  let groupData = group;
  //   console.log(group);
  const {
    picture,
    name,
  }: {
    picture: 'travel' | 'health' | 'games' | 'other';
    name: string;
  } = groupData;

  const Icon = groupIconMap[picture];

  return (
    <>
      <div className="mt-16 flex items-center gap-4 border-b-2 py-4 pl-6">
        <p>你和</p>
        <div className="flex items-center justify-center gap-2 rounded-full bg-neutrals-30 py-1 pl-3 pr-4">
          {Icon ? (
            <Image
              src={Icon}
              className="z-0 flex h-7 w-7 items-center justify-center rounded-full bg-highlight-60"
              width={200}
              height={200}
              alt={picture}
            />
          ) : null}
          <div>{name}</div>
        </div>
      </div>
    </>
  );
}

export function NextStepButton({ phase, setPhase, expenseData, isNotEqual }: { phase: number, setPhase: any, expenseData: any, isNotEqual: any; }) {

  function handleClick(expenseId: any) {
    setPhase(phase + 1)
    console.log(`phase ${phase} of expense ${expenseId}`)
  }

  function handleSubmit(expense: any) {
    console.log(expenseData)
  }

  return (
    <div className="mb-8 flex flex-col items-center">
      {phase !== 3 ?
        <div onClick={() => handleClick(expenseData.id)} className="py-2 px-4 flex justify-between items-center w-[180px] rounded-full bg-highlight-20 cursor-pointer">
          <div className="text-[10px]">{phase}/3</div>
          <div className="text-sm">下一步</div>
          <div><NextstepIcon /></div>
        </div> :
        <button disabled={isNotEqual} type="submit" onClick={() => handleSubmit(expenseData)} className="relative py-2 px-4 flex justify-between items-center w-[180px] rounded-full bg-highlight-20 disabled:bg-neutrals-30 disabled:text-text-onDark-secondary cursor-pointer">
          <div className={clsx("absolute left-[50%] bottom-12 translate-x-[-50%] w-screen text-xs text-text-onDark-secondary",{"hidden": !isNotEqual,"block": isNotEqual })}>目前分帳總額 不等於 {expenseData.amount} 元</div>
          <div className="text-[10px]">3/3</div>
          <div className="text-sm">確認</div>
          <div></div>
        </button>
      }
    </div>
  )
}
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

export function NextStepButton({
  phase,
  setPhase,
  expenseData,
  isNotEqual,
  showKeyboard,
}: {
  phase: number;
  setPhase: any;
  expenseData: any;
  isNotEqual: any;
  showKeyboard: any;
}) {
  function handleClick(e: any, expenseId: any) {
    e.preventDefault();
    setPhase(phase + 1);
    console.log(`phase ${phase} of expense ${expenseId}`);
    console.log(expenseData);
  }

  function handleSubmit(expense: any) {
    console.log(expenseData);
  }

  return (
    <div className="mb-8 flex flex-col items-center">
      {phase !== 3 ? (
        <button
          type="button"
          disabled={showKeyboard}
          onClick={(e: any) => handleClick(e, expenseData.id)}
          className="flex w-[180px] items-center justify-between rounded-full bg-highlight-20 px-4 py-2 disabled:bg-neutrals-30 disabled:text-text-onDark-secondary"
        >
          <div className="text-[10px]">{phase}/3</div>
          <div className="text-sm">下一步</div>
          <div>
            <NextstepIcon currentColor={showKeyboard ? '#9E9E9E' : '#000'} />
          </div>
        </button>
      ) : (
        <button
          disabled={isNotEqual}
          type="submit"
          onClick={()=>{console.log('click submit')}}
          onSubmit={() => handleSubmit(expenseData)}
          className="relative flex w-[180px] items-center justify-between rounded-full bg-highlight-20 px-4 py-2 disabled:bg-neutrals-30 disabled:text-text-onDark-secondary"
        >
          <div
            className={clsx(
              'absolute bottom-12 left-[50%] w-screen translate-x-[-50%] text-xs text-text-onDark-secondary',
              { hidden: !isNotEqual, block: isNotEqual },
            )}
          >
            目前分帳總額 不等於 {expenseData.amount} 元
          </div>
          <div className="text-[10px]">3/3</div>
          <div className="text-sm">確認</div>
          <div></div>
        </button>
      )}
    </div>
  );
}

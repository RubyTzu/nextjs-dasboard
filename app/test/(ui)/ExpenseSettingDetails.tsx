//import from next & react
import Image from 'next/image';
//impoart data
import { useUser, useGroup } from '../(data)/Providers';
import { loginUserId } from '../(data)/user';
//import ui
import {
  groupIconMap,
  expenseIconMap,
  DollarIcon,
  NotePencilIcon,
  NextstepIcon
} from '@/app/test/(ui)/Icons';
//other
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

export function ExpenseSettingStepOne({
  expenseData,
  phase,
}: {
  expenseData: any;
  phase: number;
}) {
  if (!expenseData) return;

  const {
    date,
    category,
    amount,
    name,
  }: {
    date: string;
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
  } = expenseData;

  const Icon = expenseIconMap[category];

  return (
    <div
      className={clsx('mx-auto my-6 w-fit', {
        hidden: phase !== 1,
      })}
    >
      <div className="mb-4 w-fit rounded-full bg-neutrals-20 px-2 py-[1px] text-sm">
        {date}
      </div>
      <div className="my-3 flex items-end justify-between gap-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-highlight-60">
          {Icon ? <Icon /> : null}
        </div>
        <input
          className="w-48 border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:outline-none focus:ring-0 "
          onChange={() => { }}
          type="text"
          value={name}
        />
      </div>
      <div className="my-3 flex items-end justify-between gap-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-highlight-60">
          <DollarIcon />
        </div>
        <input
          className="w-48 border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:outline-none focus:ring-0 "
          onChange={() => { }}
          type="text"
          value={amount}
        />
      </div>
      <div className="flex items-center justify-center gap-1 pb-0 pt-3 text-sm">
        <div>
          <NotePencilIcon />
        </div>
        <div>編輯備註</div>
      </div>
    </div>
  );
}
export function ExpenseSettingStepTwo({
  expenseData,
  setCurrentExpense,
  group,
  phase
}: {
  expenseData: any;
  setCurrentExpense: any;
  group: any;
  phase: number;
}) {
  if (!expenseData) return null;
  const users = group.users;

  return (
    <div
      className={clsx('my-6 flex w-full flex-col items-center', {
        hidden: phase !== 2,
      })}
    >
      <p className="mb-5 text-xl">選擇付款人</p>
      {users.map((user: any) => {
        return (
          <div
            className="my-3 flex w-full items-center justify-between px-7"
            key={user.id}
          >
            <div className="flex items-center gap-4">
              <Image
                className="h-12 w-12 rounded-full"
                src={user.picture}
                width={50}
                height={50}
                alt="user's picture"
              />
              <div>{user.name}</div>
            </div>
            <input
              className="relative h-5 w-5 rounded-full border-[1.5px] border-black checked:border-black checked:bg-highlight-60 checked:text-highlight-60 checked:before:absolute checked:before:left-[50%] checked:before:top-[50%] checked:before:block checked:before:h-4 checked:before:w-4 checked:before:translate-x-[-50%] checked:before:translate-y-[-50%] checked:before:rounded-full checked:before:bg-highlight-60 hover:checked:border-black focus:ring-highlight-60 checked:focus:border-black active:bg-highlight-60"
              type="radio"
              id={user.name}
              name="payer"
              value={user.name}
              onChange={() => {
                setCurrentExpense({
                  ...expenseData,
                  payerId: user.id
                })
              }}
              defaultChecked={user.id === expenseData.payerId}
            />
          </div>
        );
      })}
    </div>
  );
}
export function ExpenseSettingStepThree({
  expenseData,
  setCurrentExpense,
  group,
  phase,
}: {
  expenseData: any;
  setCurrentExpense: any;
  group: any;
  phase: number;
}) {
  if (!expenseData) return null;

  const users = group.users;

  // Function to handle the change in sharer selection
  const handleSharerToggle = (userId: string) => {
    const updatedSharers = [...expenseData.sharers]; // Create a copy of sharers array

    // Check if the user is already a sharer
    const existingIndex = updatedSharers.findIndex(sharer => sharer.id === userId);

    if (existingIndex !== -1) {
      // If user is already a sharer, remove them
      updatedSharers.splice(existingIndex, 1);
    } else {
      // If user is not a sharer, add them with initial amount (e.g., 1000)
      updatedSharers.push({
        id: userId,
        amount: 1000, // You can set the initial amount here
      });
    }

    // Update the expenseData state with the updated sharers
    setCurrentExpense({
      ...expenseData,
      sharers: updatedSharers,
    });
  };

  console.log(expenseData)

  return (
    <div
      className={clsx('my-6 flex w-full flex-col items-center', {
        hidden: phase !== 3,
      })}
    >
      <div className="mx-auto mb-5 px-3 text-xl">
        選擇分帳成員
      </div>
      <div className="mt-1 mb-3 flex w-full items-center justify-end px-[14px]">
        <div className="flex gap-3">
          <div className="flex w-20 justify-center text-xs">
            <div className="scale-75"><NotePencilIcon /></div>
            負擔金額
          </div>
          {expenseData.sharers.length === users.length ?
            <div className="flex justify-center w-12 text-xs">取消全選</div> :
            <div className="flex justify-center w-12 text-xs">全選</div>
          }
        </div>
      </div>
      {users.map((user: any) => {
        const isChecked = expenseData.sharers.some(
          (sharer: any) => sharer.id === user.id,
        );
        const amountValue = isChecked
          ? expenseData.sharers.filter(
            (sharer: any) => sharer.id === user.id,
          )[0].amount
          : '0';


        return (
          <div
            className="my-2 flex w-full items-center justify-between px-7"
            key={user.id}
          >
            <div className="flex items-center gap-4">
              <Image
                className="h-12 w-12 rounded-full"
                src={user.picture}
                width={50}
                height={50}
                alt="user's picture"
              />
              <div>{user.name}</div>
            </div>
            <div className="flex justify-between gap-10">
              <p className="text-neutrals-70 text-sm">${amountValue}</p>
              <input
                className="relative h-5 w-5 rounded-full border-[1.5px] border-black ring-transparent checked:border-black checked:bg-highlight-60 checked:text-highlight-60 checked:before:absolute checked:before:left-[50%] checked:before:top-[50%] checked:before:block checked:before:h-4 checked:before:w-4 checked:before:translate-x-[-50%] checked:before:translate-y-[-50%] checked:before:rounded-full checked:before:bg-highlight-60 hover:checked:border-black focus:ring-highlight-60 checked:focus:border-black"
                type="radio"
                id={user.name}
                name={user.name}
                value={user.name}
                onClick={() => handleSharerToggle(user.id)} // Call handleSharerToggle on change
                defaultChecked={isChecked}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function NextStepButton({ phase, setPhase, expenseData }: { phase: number, setPhase: any, expenseData: any }) {

  function handleClick(expenseId: any) {
    setPhase(phase + 1)
    console.log(`phase ${phase} of expense ${expenseId}`)
  }

  function handleSubmit(expense: any) {
    console.log(expenseData)
  }

  return (
    <>{phase !== 3 ?
      <div onClick={() => handleClick(expenseData.id)} className="mx-auto py-2 px-4 flex justify-between items-center w-[180px] rounded-full bg-highlight-20">
        <div className="text-[10px]">{phase}/3</div>
        <div className="text-sm">下一步</div>
        <div><NextstepIcon /></div>
      </div> :
      <button type="submit" onClick={() => handleSubmit(expenseData)} className="mx-auto py-2 px-4 flex justify-between items-center w-[180px] rounded-full bg-highlight-20">
        <div className="text-[10px]">3/3</div>
        <div className="text-sm">確認</div>
        <div></div>
      </button>
    }
    </>
  )
}
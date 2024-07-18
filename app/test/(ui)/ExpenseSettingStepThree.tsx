//import from next & react
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
//import ui
import { NotePencilIcon } from '@/app/test/(ui)/Icons';
import SharersAmountButton from './SharersAmountButton';
//other
import clsx from 'clsx';

interface User {
  id: string;
  name: string;
  picture: string;
}

interface Sharer {
  id: string;
  amount: number;
}

interface ExpenseData {
  amount: number;
  sharers: Sharer[];
}

interface ExpenseSettingStepThreeProps {
  expenseData: ExpenseData;
  group: { users: User[] };
  phase: number;
  setIsNotEqual: (isNotEqual: boolean) => void;
  updatedSharers: Sharer[];
  setUpdatedSharers: any;
}

// export function ExpenseSettingStepThree({
//   expenseData,
//   group,
//   phase,
//   setIsNotEqual,
//   updatedSharers,
//   setUpdatedSharers,
// }: ExpenseSettingStepThreeProps) {
//   const users = group.users;
//   const [sharers, setSharers] = useState<any>(updatedSharers);

//   const addedAmount = updatedSharers.reduce(
//     (total, sharer) =>  {return Number(total) + Number(sharer.amount)},
//     0,
//   );

//   useEffect(() => {

//     setIsNotEqual(Number(expenseData.amount) !== Number(addedAmount));
//   }, [updatedSharers, expenseData.amount, setIsNotEqual]);

//   if (!expenseData || !updatedSharers) return null;

//   const handleAllSelect = () => {
//     console.log('users are')
//     console.log(users)
//     console.log(updatedSharers)
//     const updatedSharersCopy = users.map((user) => ({
//       id: user.id,
//       amount: expenseData.amount / users.length,
//       // amount: 0,
//     }));
//     setUpdatedSharers(updatedSharersCopy);
//     setSharers(updatedSharersCopy);
//   };

//   const handleAllNoSelect = () => {
//     setUpdatedSharers([]);
//     setSharers([])
//   };

//   const handleSharerToggle = (userId: string) => {
//     const existingIndex = updatedSharers.findIndex(
//       (sharer) => sharer.id === userId,
//     );
//     const updatedSharersCopy = [...updatedSharers];

//     if (existingIndex !== -1) {
//       updatedSharersCopy.splice(existingIndex, 1);
//     } else {
//       updatedSharersCopy.push({
//         id: userId,
//         amount: expenseData.amount / users.length,
//       });
//     }

//     setUpdatedSharers(updatedSharersCopy);
//     setSharers(updatedSharersCopy);
//   };

//   return (
//     <div
//       className={clsx('my-6 flex w-full flex-col items-center', {
//         hidden: phase !== 3,
//       })}
//     >
//       <div className="mx-auto mb-5 px-3 text-xl">選擇分帳成員</div>
//       <div className="mb-3 mt-1 flex w-full items-center justify-end px-[14px]">
//         <div className="flex gap-3">
//           <SharersAmountButton
//             users={users}
//             expenseData={expenseData}
//             updatedSharers={updatedSharers}
//             setUpdatedSharers={setUpdatedSharers}
//             sharers={sharers}
//             setSharers={setSharers}
//           />
//           {updatedSharers.length === users.length ? (
//             <div
//               onClick={handleAllNoSelect}
//               className="flex w-12 cursor-pointer justify-center text-xs"
//             >
//               取消全選
//             </div>
//           ) : (
//             <div
//               onClick={handleAllSelect}
//               className="flex w-12 cursor-pointer justify-center text-xs"
//             >
//               全選
//             </div>
//           )}
//         </div>
//       </div>
//       {users.map((user) => {
//         const isChecked = updatedSharers.some(
//           (sharer) => sharer.id === user.id,
//         );
//         const amountValue = isChecked
//           ? updatedSharers.find((sharer) => sharer.id === user.id)?.amount
//           : '0';

//         return (
//           <div
//             className="my-2 flex w-full items-center justify-between px-7"
//             key={user.id}
//           >
//             <div className="flex items-center gap-4">
//               <Image
//                 className="h-12 w-12 rounded-full"
//                 src={user.picture}
//                 width={50}
//                 height={50}
//                 alt="user's picture"
//               />
//               <div>{user.name}</div>
//             </div>
//             <div className="flex justify-between gap-10">
//               <p className="text-sm text-neutrals-70">${amountValue}</p>
//               <input
//                 className="relative h-5 w-5 rounded-full border-[1.5px] border-black ring-transparent checked:border-black checked:bg-highlight-60 checked:text-highlight-60 checked:before:absolute checked:before:left-[50%] checked:before:top-[50%] checked:before:block checked:before:h-4 checked:before:w-4 checked:before:translate-x-[-50%] checked:before:translate-y-[-50%] checked:before:rounded-full checked:before:bg-highlight-60 hover:checked:border-black focus:ring-transparent checked:focus:border-black"
//                 type="radio"
//                 id={user.name}
//                 name={user.name}
//                 value={user.name}
//                 onChange={() => {}}
//                 onClick={() => handleSharerToggle(user.id)} // Call handleSharerToggle on change
//                 checked={isChecked}
//               />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

export function ExpenseSettingStepThree({
  expenseData,
  group,
  phase,
  setIsNotEqual,
  updatedSharers,
  setUpdatedSharers,
}: ExpenseSettingStepThreeProps) {
  const users = group.users;
  const [sharers, setSharers] = useState<any>(updatedSharers);
  const [isShow, setIsShow] = useState(false);
  // const [barTop, setBarTop] = useState('100%');
  const [barBottom, setBarBottom] = useState('0');
  const [onFocus, setOnFocus] = useState(false);
  const [currentSharer, setCurrentSharer] = useState<any>({
    id: '',
    amount: '',
  });
  const router = useRouter();
  const addedAmount = updatedSharers.reduce(
    (total, sharer) => { return Number(total) + Number(sharer.amount) },
    0,
  );

  useEffect(() => {

    setIsNotEqual(Number(expenseData.amount) !== Number(addedAmount));


    const handleResize: any = () => {
      // if (window.visualViewport) {
      //   const newTop = `${window.visualViewport.height-93}px`;
      //   setBarTop(newTop);
      // }
      if (window.visualViewport) {
        const newBottom = `${window.innerHeight - window.visualViewport.offsetTop - window.visualViewport.height}px`;
        setBarBottom(newBottom);
      }
    };

    if (typeof window !== 'undefined') {
      if (window.visualViewport) {
        handleResize(); // Initial setup
        window.visualViewport.addEventListener('resize', handleResize);
        return () => {
          window.visualViewport?.removeEventListener('resize', handleResize);
        };
      }
    }
  }, [updatedSharers, expenseData.amount, setIsNotEqual ]);

  if (!expenseData || !updatedSharers) return null;

  const handleAllSelect = () => {
    console.log('users are')
    console.log(users)
    console.log(updatedSharers)
    const updatedSharersCopy = users.map((user) => ({
      id: user.id,
      amount: expenseData.amount / users.length,
      // amount: 0,
    }));
    setUpdatedSharers(updatedSharersCopy);
    setSharers(updatedSharersCopy);
  };

  const handleAllNoSelect = () => {
    setUpdatedSharers([]);
    setSharers([])
  };

  const handleSharerToggle = (userId: string) => {
    const existingIndex = updatedSharers.findIndex(
      (sharer) => sharer.id === userId,
    );
    const updatedSharersCopy = [...updatedSharers];

    if (existingIndex !== -1) {
      updatedSharersCopy.splice(existingIndex, 1);
    } else {
      updatedSharersCopy.push({
        id: userId,
        amount: expenseData.amount / users.length,
      });
    }

    setUpdatedSharers(updatedSharersCopy);
    setSharers(updatedSharersCopy);
  };

  const updateAmount = (id: any, newAmount: any) => {
    setUpdatedSharers((prevSharers: any) => {
      // Check if the sharer already exists
      const updatedSharersCopy = prevSharers.map((sharer: any) =>
        sharer.id === id ? { ...sharer, amount: Number(newAmount) } : sharer
      );
  
      // Add the new sharer if not exists
      if (!prevSharers.some((sharer: any) => sharer.id === id)) {
        updatedSharersCopy.push({ id, amount: Number(newAmount) });
      }
  
      // Filter out sharers with amount 0
      return updatedSharersCopy.filter(
        (sharer: any) => sharer.amount !== 0 && sharer.amount !== '' && sharer.amount !== '0'
      );
    });
  };

  return (
    <div
      className={clsx('my-6 flex w-full flex-col items-center', {
        hidden: phase !== 3,
      })}
    >
      <div className="mx-auto mb-5 px-3 text-xl">選擇分帳成員</div>
      <div className="mb-3 mt-1 flex w-full items-center justify-end px-[14px]">
        <div className="flex gap-3">
          <div
            className="flex w-20 cursor-pointer justify-center text-xs"
          >
            <div className="scale-75">
              <NotePencilIcon />
            </div>
            <div>負擔金額</div>
          </div>
          {updatedSharers.length === users.length ? (
            <div
              onClick={handleAllNoSelect}
              className="flex w-12 cursor-pointer justify-center text-xs"
            >
              取消全選
            </div>
          ) : (
            <div
              onClick={handleAllSelect}
              className="flex w-12 cursor-pointer justify-center text-xs"
            >
              全選
            </div>
          )}
        </div>
      </div>
      {users.map((user) => {
        const isChecked = updatedSharers.some(
          (sharer) => sharer.id === user.id,
        );
        const amountValue = isChecked
          ? updatedSharers.find((sharer) => sharer.id === user.id)?.amount
          : '0';

        let sharer = updatedSharers.filter((sharer: any) => {
          return sharer.id === user.id;
        })[0];

        sharer = sharer
          ? sharer
          : {
            id: user.id,
            amount: 0,
          };

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
            <div className="flex justify-between items-center gap-7">
              {/* <p className="text-sm text-neutrals-70">${amountValue}</p> */}

              <input
                className=" text-neutrals-70 bg-transparent w-20 border-0 border-b-[1px] border-black focus:border-black focus:outline-none focus:ring-0 focus:border-highlight-40"
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                onFocus={() => {
                  setOnFocus(true);
                  setCurrentSharer(sharer);
                  if (sharer) {
                    setCurrentSharer(sharer);
                  } else {
                    setCurrentSharer({
                      id: user.id,
                      amount: '0',
                    });
                  }
                }}
                onBlur={() => {
                  setOnFocus(false);
                }}
                onChange={(e: any) => {
                  let value = e.target.value.replace(/^0+/, ''); // Remove leading zeros
                  if (value === '' || Number(value) < 0) {
                    value = '0';
                  }
                  updateAmount(user.id, value);
                  setCurrentSharer({
                    ...sharer,
                    amount: Number(value),
                  });
                }}
                value={sharer.amount === 0 ? '' : sharer.amount} // Prevent display of 0
              />
              <input
                className="relative h-5 w-5 rounded-full border-[1.5px] border-black ring-transparent checked:border-black checked:bg-highlight-60 checked:text-highlight-60 checked:before:absolute checked:before:left-[50%] checked:before:top-[50%] checked:before:block checked:before:h-4 checked:before:w-4 checked:before:translate-x-[-50%] checked:before:translate-y-[-50%] checked:before:rounded-full checked:before:bg-highlight-60 hover:checked:border-black focus:ring-transparent checked:focus:border-black"
                type="radio"
                id={user.name}
                name={user.name}
                value={user.name}
                onChange={() => { }}
                onClick={() => handleSharerToggle(user.id)} // Call handleSharerToggle on change
                checked={isChecked}
              />
            </div>
          </div>
        );
      })}
        <div
          className={clsx(
            'fixed left-0 z-100 h-fit w-full bg-grey-keyBoard p-6 text-center',
            { hidden: !onFocus, block: onFocus },
          )}
          style={{ bottom: barBottom }}
        >
          <div className="text-black">
            {
              users.filter((user: any) => {
                return user.id === currentSharer.id;
              })[0]?.name
            }
            負擔${expenseData.amount}中的$
            {currentSharer.amount === '' ? 0 : currentSharer.amount}
          </div>
          <div className="text-sm text-neutrals-60">
            {Number(expenseData.amount) - Number(addedAmount) > 0 ||
            Number(expenseData.amount) - Number(addedAmount) === 0
              ? `還剩下$${
                  Number(expenseData.amount) - Number(addedAmount)
                }還沒被分帳`
              : `目前分帳金額多出$${Math.abs(
                  Number(expenseData.amount) - Number(addedAmount),
                )}`}
          </div>
        </div>
    </div>
  );
}
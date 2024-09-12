'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
//import data
import {
  ExtendedExpense,
  ExtendedGroup,
  Expense,
} from '@/app/test/(data)/(sharedFunction)/types';
//import ui
import {
  GroupInfoBar,
  NextStepButton,
} from '@/app/test/(ui)/ExpenseSettingDetails';
import { ExpenseSettingStepOne } from '@/app/test/(ui)/ExpenseSettingStepOne';
import { ExpenseSettingStepTwo } from '@/app/test/(ui)/ExpenseSettingStepTwo';
import { ExpenseSettingStepThree } from '@/app/test/(ui)/ExpenseSettingStepThree';
//import other
import clsx from 'clsx';
import ShareButton from '../../(ui)/ShareButton';

//Expense Edit Page
// export default function Page() {
//   const [phase, setPhase] = useState<number>(1);
//   const [isNotEqual, setIsNotEqual] = useState<boolean>(false);
//   const [isIncorrectTotalNum, setisIncorrectTotalNum] =
//     useState<boolean>(false);
//   const [nameExist, setNameExist] = useState<boolean>(false);
//   const [hasNameLength, setHasNameLength] = useState<boolean>(true);

//   const group: ExtendedGroup =  {
//     "id": "g1",
//     "name": "5月聚餐abcabcabcabc",
//     "picture": "/images/icons/groupIcon01.svg",
//     "creatorId": "u1",
//     "expenses": [
//       {
//         "id": "e1",
//         "name": "燒鳥肌肉串",
//         "amount": 210,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u1",
//             "amount": 105
//           },
//           {
//             "id": "u2",
//             "amount": 105
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e2",
//         "name": "手工醃蘿波",
//         "amount": 50,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u2",
//             "amount": 16.666666666666668
//           },
//           {
//             "id": "u3",
//             "amount": 16.666666666666668
//           },
//           {
//             "id": "u4",
//             "amount": 16.666666666666668
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e3",
//         "name": "豆腐沙拉",
//         "amount": 150,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u2",
//             "amount": 50
//           },
//           {
//             "id": "u3",
//             "amount": 50
//           },
//           {
//             "id": "u4",
//             "amount": 50
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e4",
//         "name": "炭烤玉米筍",
//         "amount": 180,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u2",
//             "amount": 60
//           },
//           {
//             "id": "u3",
//             "amount": 60
//           },
//           {
//             "id": "u4",
//             "amount": 60
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e5",
//         "name": "節瓜",
//         "amount": 120,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u2",
//             "amount": 40
//           },
//           {
//             "id": "u3",
//             "amount": 40
//           },
//           {
//             "id": "u4",
//             "amount": 40
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e6",
//         "name": "山藥",
//         "amount": 180,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u1",
//             "amount": 60
//           },
//           {
//             "id": "u2",
//             "amount": 60
//           },
//           {
//             "id": "u3",
//             "amount": 60
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e7",
//         "name": "杏苞菇",
//         "amount": 120,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u2",
//             "amount": 40
//           },
//           {
//             "id": "u3",
//             "amount": 40
//           },
//           {
//             "id": "u4",
//             "amount": 40
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e8",
//         "name": "娃娃菜",
//         "amount": 140,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u2",
//             "amount": 46.666666666666664
//           },
//           {
//             "id": "u3",
//             "amount": 46.666666666666664
//           },
//           {
//             "id": "u4",
//             "amount": 46.666666666666664
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e9",
//         "name": "茄子",
//         "amount": 140,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u2",
//             "amount": 46.666666666666664
//           },
//           {
//             "id": "u3",
//             "amount": 46.666666666666664
//           },
//           {
//             "id": "u4",
//             "amount": 46.666666666666664
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e10",
//         "name": "炸豆腐",
//         "amount": 150,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u2",
//             "amount": 50
//           },
//           {
//             "id": "u3",
//             "amount": 50
//           },
//           {
//             "id": "u4",
//             "amount": 50
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e11",
//         "name": "青蔥豚煎餃",
//         "amount": 100,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u1",
//             "amount": 100
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e12",
//         "name": "韭菜豚煎餃",
//         "amount": 100,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u2",
//             "amount": 100
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e13",
//         "name": "綜合煎餃",
//         "amount": 120,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "food",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u4",
//             "amount": 120
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e14",
//         "name": "葡萄沙瓦",
//         "amount": 340,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "drink",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u2",
//             "amount": 170
//           },
//           {
//             "id": "u3",
//             "amount": 170
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e15",
//         "name": "荔枝沙瓦",
//         "amount": 180,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "drink",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u4",
//             "amount": 180
//           }
//         ],
//         "note": ""
//       },
//       {
//         "id": "e16",
//         "name": "可爾必思",
//         "amount": 80,
//         "date": "2024-05-28T00:00:00.000Z",
//         "category": "drink",
//         "payerId": "u1",
//         "sharers": [
//           {
//             "id": "u1",
//             "amount": 80
//           }
//         ],
//         "note": ""
//       }
//     ],
//     "users": [
//       {
//         "id": "u1",
//         "name": "小陳aaaaaaaaaaaa",
//         "picture": "https://cdn2.thecatapi.com/images/a4v.jpg",
//         "adoptable": false
//       },
//       {
//         "id": "u2",
//         "name": "小明bbbbb",
//         "picture": "https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg",
//         "adoptable": false
//       },
//       {
//         "id": "u3",
//         "name": "小美的名字c",
//         "picture": "https://cdn2.thecatapi.com/images/O7FnoegHR.jpg",
//         "adoptable": false
//       },
//       {
//         "id": "u4",
//         "name": "d",
//         "picture": "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg",
//         "adoptable": false
//       },
//       {
//         "id": "u11",
//         "name": "小阿玲四五六七八九十一二三四五六七八九零",
//         "picture": "/images/icons/newUserBG.svg",
//         "adoptable": true
//       },
//       {
//         "id": "u12",
//         "name": "小明1234567890",
//         "picture": "/images/icons/newUserBG.svg",
//         "adoptable": true
//       },
//       {
//         "id": "u13",
//         "name": "小阿依",
//         "picture": "/images/icons/newUserBG.svg",
//         "adoptable": true
//       },
//       {
//         "id": "u14",
//         "name": "小阿二",
//         "picture": "/images/icons/newUserBG.svg",
//         "adoptable": true
//       },
//       {
//         "id": "u15",
//         "name": "小阿三(RRRR CCCC)",
//         "picture": "/images/icons/newUserBG.svg",
//         "adoptable": true
//       },
//       {
//         "id": "u16",
//         "name": "小阿四",
//         "picture": "/images/icons/newUserBG.svg",
//         "adoptable": true
//       },
//       {
//         "id": "u17",
//         "name": "小阿五",
//         "picture": "/images/icons/newUserBG.svg",
//         "adoptable": true
//       },
//       {
//         "id": "u18",
//         "name": "小阿六",
//         "picture": "/images/icons/newUserBG.svg",
//         "adoptable": true
//       },
//       {
//         "id": "u19",
//         "name": "小阿七",
//         "picture": "/images/icons/newUserBG.svg",
//         "adoptable": true
//       },
//       {
//         "id": "u20",
//         "name": "小阿八",
//         "picture": "/images/icons/newUserBG.svg",
//         "adoptable": true
//       },
//       {
//         "id": "u21",
//         "name": "小阿九",
//         "picture": "/images/icons/newUserBG.svg",
//         "adoptable": true
//       },
//       {
//         "id": "u22",
//         "name": "小阿十",
//         "picture": "/images/icons/newUserBG.svg",
//         "adoptable": true
//       }
//     ]
//   }
//   const expense: any = {
//     "id": "e1",
//     "groupId": "g1",
//     "name": "燒鳥肌肉串",
//     "amount": 210,
//     "date": "2024-05-28T08:18:15.063Z",
//     "category": "food",
//     "creatorId": "u1",
//     "payerId": "u1",
//     "sharers": [
//       {
//         "id": "u1",
//         "amount": 105
//       },
//       {
//         "id": "u2",
//         "amount": 105
//       }
//     ],
//     "note": "",
//     "createAt": "2024-05-28T08:18:15.063Z",
//     "updateAt": "2024-05-28T08:18:15.063Z",
//     "historys": [
//       {
//         "editedAt": "2024-05-28T08:18:15.063Z",
//         "editorId": "u1"
//       }
//     ]
//   }
//   const [currentExpense, setCurrentExpense] = useState<
//     ExtendedExpense | Expense
//   >(expense);
//   const formRef = useRef<HTMLFormElement>(null);
//   function handleClick() {
//     if (phase === 1) return;
//     setPhase(phase - 1);
//   }

//   return (
//     <form
//       ref={formRef}
//       method="post"
//       action={`/test/split/1forTestOnly`}
//     >
//       <div className="relative flex flex-col">
//       <div className="fixed z-20 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
//       <div className="flex h-6 w-12 items-center justify-start">
//         <button
//           type="button"
//           onClick={handleClick}
//           className={clsx('cursor-pointer text-sm', {
//             hidden: phase === 1,
//           })}
//         >
//           上一步
//         </button>
//       </div>
//       <h1 className="text-lg">編輯費用</h1>
//       <div className="flex h-6 w-12 items-center justify-end">
//         <>
//         </>
//       </div>
//     </div>
//         {expense ? (
//           <>
//             <GroupInfoBar expenseData={currentExpense} group={group} />
//             <section>
//               <ExpenseSettingStepOne
//                 group={group}
//                 expenseData={currentExpense}
//                 setCurrentExpense={setCurrentExpense}
//                 phase={phase}
//                 setisIncorrectTotalNum={setisIncorrectTotalNum}
//                 nameExist={nameExist}
//                 setNameExist={setNameExist}
//                 hasNameLength={hasNameLength}
//                 setHasNameLength={setHasNameLength}
//               />
//               <ExpenseSettingStepTwo
//                 expenseData={currentExpense}
//                 setCurrentExpense={setCurrentExpense}
//                 group={group}
//                 phase={phase}
//               />
//               <ExpenseSettingStepThree
//                 expenseData={currentExpense}
//                 setCurrentExpense={setCurrentExpense}
//                 group={group}
//                 phase={phase}
//                 setIsNotEqual={setIsNotEqual}
//               />
//             </section>
//             <section>
//               <NextStepButton
//                 isAddExpensePage={false}
//                 formRef={formRef}
//                 phase={phase}
//                 setPhase={setPhase}
//                 groupid={group.id || ''}
//                 expenseData={currentExpense}
//                 isNotEqual={isNotEqual}
//                 setIsNotEqual={setIsNotEqual}
//                 isNotZero={true}
//                 isIncorrectTotalNum={isIncorrectTotalNum}
//                 nameExist={nameExist}
//                 hasNameLength={hasNameLength}
//               />
//             </section>
//           </>
//         ) : (
//           <></>
//         )}
//       </div>
//     </form>
//   );
// }

export default function Page() {
  const userData = {
    id: 'u8',
    lineId: 'linIdu8',
    name: 'h',
    picture:
      'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
    groups: [
      {
        id: 'g5',
        name: '新年新希望123',
        picture: '/images/icons/groupIcon05.svg',
        users: [
          {
            id: 'u1',
            name: '小陳aaaaaaaaaaaa',
            picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
            adoptable: false,
          },
          {
            id: 'u2',
            name: '小明bbbbb',
            picture:
              'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
            adoptable: false,
          },
          {
            id: 'u3',
            name: '小美的名字c',
            picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
            adoptable: false,
          },
          {
            id: 'u4',
            name: 'd',
            picture:
              'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
            adoptable: false,
          },
          {
            id: 'u5',
            name: 'e',
            picture: 'https://cdn2.thecatapi.com/images/cib.jpg',
            adoptable: false,
          },
          {
            id: 'u6',
            name: 'f',
            picture:
              'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
            adoptable: false,
          },
          {
            id: 'u7',
            name: 'g',
            picture: 'https://cdn2.thecatapi.com/images/edb.jpg',
            adoptable: false,
          },
          {
            id: 'u8',
            name: 'h',
            picture:
              'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
            adoptable: false,
          },
          {
            id: 'u9',
            name: 'i',
            picture: 'https://cdn2.thecatapi.com/images/bo5.jpg',
            adoptable: false,
          },
          {
            id: 'u10',
            name: 'j',
            picture:
              'https://images.dog.ceo/breeds/hound-english/n02089973_1303.jpg',
            adoptable: false,
          },
        ],
      },
      {
        id: 'g8',
        name: 'group Games 2',
        picture: '/images/icons/groupIcon08.svg',
        users: [
          {
            id: 'u3',
            name: '小美的名字c',
            picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
            adoptable: false,
          },
          {
            id: 'u4',
            name: 'd',
            picture:
              'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
            adoptable: false,
          },
          {
            id: 'u6',
            name: 'f',
            picture:
              'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
            adoptable: false,
          },
          {
            id: 'u8',
            name: 'h',
            picture:
              'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
            adoptable: false,
          },
          {
            id: 'utest',
            name: 'test',
            picture:
              'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
            adoptable: true,
          },
        ],
      },
      {
        id: 'g11',
        name: 'group Other 3',
        picture: '/images/icons/groupIcon11.svg',
        users: [
          {
            id: 'u1',
            name: '小陳aaaaaaaaaaaa',
            picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
            adoptable: false,
          },
          {
            id: 'u3',
            name: '小美的名字c',
            picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
            adoptable: false,
          },
          {
            id: 'u5',
            name: 'e',
            picture: 'https://cdn2.thecatapi.com/images/cib.jpg',
            adoptable: false,
          },
          {
            id: 'u7',
            name: 'g',
            picture: 'https://cdn2.thecatapi.com/images/edb.jpg',
            adoptable: false,
          },
          {
            id: 'u8',
            name: 'h',
            picture:
              'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
            adoptable: false,
          },
          {
            id: 'u9',
            name: 'i',
            picture: 'https://cdn2.thecatapi.com/images/bo5.jpg',
            adoptable: false,
          },
          {
            id: 'u10',
            name: 'j',
            picture:
              'https://images.dog.ceo/breeds/hound-english/n02089973_1303.jpg',
            adoptable: false,
          },
          {
            id: 'utest',
            name: 'test',
            picture:
              'https://images.dog.ceo/breeds/hound-english/n02089973_1303.jpg',
            adoptable: true,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-highlight-50">
      <h1 className="fixed left-[50%] z-[2] w-full translate-x-[-50%] bg-highlight-50 pt-7 text-center text-2xl font-semibold tracking-wide text-white">
        群組列表
      </h1>
      <div className="mt-[6.5rem]">
        {userData.groups.map((group) => (
          <div
            key={group.id}
            className="mx-6 my-4 flex justify-between rounded-[20px] bg-white px-3 py-2"
          >
            <div className="z-0 flex items-center">
              <Image
                src={group.picture}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-highlight-60"
                width={200}
                height={200}
                alt={group.picture}
                priority
              />
              <div className="w-52 truncate pl-3 font-normal">{group.name}</div>
            </div>
            <div className="flex items-center">
              <ShareButton
                id={group.id || ''}
                name={group.name}
                inGroupPage={false}
                groupUsers={group.users}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mb-16"></div>
    </div>
  );
}
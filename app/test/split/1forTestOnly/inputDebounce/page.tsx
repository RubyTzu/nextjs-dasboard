'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
//import data
import {
  ExtendedExpense,
  ExtendedGroup,
  Expense,
  Group,
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

export default function Page() {
  const phase = 1;
  const [isIncorrectTotalNum, setisIncorrectTotalNum] =
    useState<boolean>(false);
  const [nameExist, setNameExist] = useState<boolean>(false);
  const [hasNameLength, setHasNameLength] = useState<boolean>(true);

  const group: ExtendedGroup = {
    "id": "g1",
    "name": "5月聚餐",
    "picture": "/images/icons/groupIcon01.svg",
    "creatorId": "u1",
    "expenses": [
      {
        "id": "e1",
        "name": "燒鳥肌肉串",
        "amount": 210,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u1",
            "amount": 105
          },
          {
            "id": "u2",
            "amount": 105
          }
        ],
        "note": ""
      },
      {
        "id": "e2",
        "name": "手工醃蘿波",
        "amount": 50,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u2",
            "amount": 16.666666666666668
          },
          {
            "id": "u3",
            "amount": 16.666666666666668
          },
          {
            "id": "u4",
            "amount": 16.666666666666668
          }
        ],
        "note": ""
      },
      {
        "id": "e3",
        "name": "豆腐沙拉",
        "amount": 150,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u2",
            "amount": 50
          },
          {
            "id": "u3",
            "amount": 50
          },
          {
            "id": "u4",
            "amount": 50
          }
        ],
        "note": ""
      },
      {
        "id": "e4",
        "name": "炭烤玉米筍",
        "amount": 180,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u2",
            "amount": 60
          },
          {
            "id": "u3",
            "amount": 60
          },
          {
            "id": "u4",
            "amount": 60
          }
        ],
        "note": ""
      },
      {
        "id": "e5",
        "name": "節瓜",
        "amount": 120,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u2",
            "amount": 40
          },
          {
            "id": "u3",
            "amount": 40
          },
          {
            "id": "u4",
            "amount": 40
          }
        ],
        "note": ""
      },
      {
        "id": "e6",
        "name": "山藥",
        "amount": 180,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u1",
            "amount": 60
          },
          {
            "id": "u2",
            "amount": 60
          },
          {
            "id": "u3",
            "amount": 60
          }
        ],
        "note": ""
      },
      {
        "id": "e7",
        "name": "杏苞菇",
        "amount": 120,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u2",
            "amount": 40
          },
          {
            "id": "u3",
            "amount": 40
          },
          {
            "id": "u4",
            "amount": 40
          }
        ],
        "note": ""
      },
      {
        "id": "e8",
        "name": "娃娃菜",
        "amount": 140,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u2",
            "amount": 46.666666666666664
          },
          {
            "id": "u3",
            "amount": 46.666666666666664
          },
          {
            "id": "u4",
            "amount": 46.666666666666664
          }
        ],
        "note": ""
      },
      {
        "id": "e9",
        "name": "茄子",
        "amount": 140,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u2",
            "amount": 46.666666666666664
          },
          {
            "id": "u3",
            "amount": 46.666666666666664
          },
          {
            "id": "u4",
            "amount": 46.666666666666664
          }
        ],
        "note": ""
      },
      {
        "id": "e10",
        "name": "炸豆腐",
        "amount": 150,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u2",
            "amount": 50
          },
          {
            "id": "u3",
            "amount": 50
          },
          {
            "id": "u4",
            "amount": 50
          }
        ],
        "note": ""
      },
      {
        "id": "e11",
        "name": "青蔥豚煎餃",
        "amount": 100,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u1",
            "amount": 100
          }
        ],
        "note": ""
      },
      {
        "id": "e12",
        "name": "韭菜豚煎餃",
        "amount": 100,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u2",
            "amount": 100
          }
        ],
        "note": ""
      },
      {
        "id": "e13",
        "name": "綜合煎餃",
        "amount": 120,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "food",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u4",
            "amount": 120
          }
        ],
        "note": ""
      },
      {
        "id": "e14",
        "name": "葡萄沙瓦",
        "amount": 340,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "drink",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u2",
            "amount": 170
          },
          {
            "id": "u3",
            "amount": 170
          }
        ],
        "note": ""
      },
      {
        "id": "e15",
        "name": "荔枝沙瓦",
        "amount": 180,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "drink",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u4",
            "amount": 180
          }
        ],
        "note": ""
      },
      {
        "id": "e16",
        "name": "可爾必思",
        "amount": 80,
        "date": "2024-05-28T00:00:00.000Z",
        "category": "drink",
        "payerId": "u1",
        "sharers": [
          {
            "id": "u1",
            "amount": 80
          }
        ],
        "note": ""
      }
    ],
    "users": [
      {
        "id": "u1",
        "name": "小陳aaaaaaaaaaaa",
        "picture": "https://cdn2.thecatapi.com/images/a4v.jpg",
        "adoptable": false
      },
      {
        "id": "u2",
        "name": "小明bbbbb",
        "picture": "https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg",
        "adoptable": false
      },
      {
        "id": "u3",
        "name": "小美的名字c",
        "picture": "https://cdn2.thecatapi.com/images/O7FnoegHR.jpg",
        "adoptable": false
      },
      {
        "id": "u4",
        "name": "d",
        "picture": "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg",
        "adoptable": false
      },
      {
        "id": "u11",
        "name": "小阿玲四五六七八九十一二三四五六七八九零",
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      },
      {
        "id": "u12",
        "name": "小明1234567890",
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      },
      {
        "id": "u13",
        "name": "小阿依",
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      },
      {
        "id": "u14",
        "name": "小阿二",
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      },
      {
        "id": "u15",
        "name": "小阿三(RRRR CCCC)",
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      },
      {
        "id": "u16",
        "name": "小阿四",
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      },
      {
        "id": "u17",
        "name": "小阿五",
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      },
      {
        "id": "u18",
        "name": "小阿六",
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      },
      {
        "id": "u19",
        "name": "小阿七",
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      },
      {
        "id": "u20",
        "name": "小阿八",
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      },
      {
        "id": "u21",
        "name": "小阿九",
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      },
      {
        "id": "u22",
        "name": "小阿十",
        "picture": "/images/icons/newUserBG.svg",
        "adoptable": true
      }
    ]
  }
  const expense: any = {
    "id": "e1",
    "groupId": "g1",
    "name": "燒鳥肌肉串",
    "amount": 210,
    "date": "2024-05-28T08:18:15.063Z",
    "category": "food",
    "creatorId": "u1",
    "payerId": "u1",
    "sharers": [
      {
        "id": "u1",
        "amount": 105
      },
      {
        "id": "u2",
        "amount": 105
      }
    ],
    "note": "",
    "createAt": "2024-05-28T08:18:15.063Z",
    "updateAt": "2024-05-28T08:18:15.063Z",
    "historys": [
      {
        "editedAt": "2024-05-28T08:18:15.063Z",
        "editorId": "u1"
      }
    ]
  }
  const [currentExpense, setCurrentExpense] = useState<
    ExtendedExpense | Expense
  >(expense);
  // try debounce
  const [currentValue, setCurrentValue] = useState('');
  const isAddPage = false

  const handleInputChange = (
    text: string,
    group: ExtendedGroup,
  ) => {
    if (isAddPage) {
      setNameExist(
        group.expenses?.some((expense) => expense.name === text) ||
        false,
      );
    } else {
      setNameExist(
        (group.expenses?.some((expense) => expense.name === text) &&
          expense?.name !== text) ||
        false,
      );
    }

    if (text.length === 0) {
      setHasNameLength(false);
    } else {
      setHasNameLength(true);
    }
  };

  const handleInputBlur = (
    text: string,
    expenseData: ExtendedExpense | Expense,
    group: ExtendedGroup,
  ) => {
    const expenseNameExist =
      group.expenses?.some((expense) => expense.name === text) &&
      expense?.name !== text;

    if (expenseNameExist || text.length === 0) {
      return;
    } else {
      setCurrentExpense({
        ...expenseData,
        name: text,
      });
    }
    console.log(currentExpense)
  };

  return (
    <>
      <div className="relative w-48 border-b border-grey-500">
        <DebouncedInput
          className="relative w-[80%] border-0 bg-transparent pb-1 pl-0 focus:border-0 focus:outline-none focus:ring-0"
          placeholder=""
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
          maxLength={20}
          handleInputChange={(text) => {
            console.log(`hi ${text}`)
            handleInputChange(text, group)
          }}
          handleInputBlur={(text) => handleInputBlur(text, currentExpense, group)}
          group={group}
          expense={currentExpense}
        />
        <div className="absolute right-0 top-[59%] translate-y-[-50%] text-[10px] text-neutrals-50">
          &#40;{currentValue.length}/20&#41;
        </div>
        <div
          className={clsx(
            'absolute right-0 top-[130%] translate-y-[-50%] text-[10px] text-neutrals-50',
            {
              block: nameExist,
              hidden: !nameExist,
            },
          )}
        >
          該費用名稱已存在，請重新輸入
        </div>
        <div
          className={clsx(
            'absolute right-0 top-[130%] translate-y-[-50%] text-[10px] text-neutrals-50',
            {
              block: !hasNameLength,
              hidden: hasNameLength,
            },
          )}
        >
          費用名稱不可為空值
        </div>
      </div>
      <button className="w-[100px] bg-black text-white" type="button">ok</button>
    </>
  );
}

const DebouncedInput = ({
  className,
  placeholder,
  currentValue,
  setCurrentValue,
  maxLength,
  handleInputChange,
  handleInputBlur,
  group,
  expense
}: {
  className: string;
  placeholder: string;
  currentValue: string;
  setCurrentValue: React.Dispatch<React.SetStateAction<string>>;
  maxLength: number;
  handleInputChange: (text: string, group: ExtendedGroup | Group) => void;
  handleInputBlur: (text: string, expenseData: ExtendedExpense | Expense, group: ExtendedGroup | Group) => void;
  group: ExtendedGroup | Group;
  expense: ExtendedExpense | Expense;
}) => {

  function debounce(fn: any, delay = 500) {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
  // Update function that will be debounced
  const updateDebounceText = useCallback(
    debounce((text: any) => {
      console.log("call api get search result for:", text);
      handleInputChange(text, group);
    }, 500),
    []
  );

  // Handle input change
  const handleFinalInputChange = (e: any) => {
    const value = e.target.value;
    setCurrentValue(value);
    updateDebounceText(value);
  };

  return (
    <>
      <input
        className={className}
        type="text"
        defaultValue={currentValue}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleFinalInputChange}
        onBlur={(e) => handleInputBlur(e.target.value, expense, group)}
      />
    </>
  );
};
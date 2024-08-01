import { useEffect, useState } from "react";
import { splitExpense } from "../(data)/(sharedFunction)/splitDebt";
import { loginUserId } from "../(data)/(fetchData)/user";
import clsx from "clsx";

interface Sharer {
  id: string;
  amount: string | number;
}

interface Expense {
  id: string;
  name: string;
  amount: string | number;
  date: string;
  category: string;
  payerId: string;
  sharers: Sharer[];
  note: string;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface Group {
  id: string;
  name: string;
  picture: string;
  creatorId: string;
  expenses: Expense[];
  users: User[];
}

interface Props {
  group: Group;
}

export function BalanceAmount({ group }: Props) {
  const [addResult, setAddResult] = useState<number>(1)
  const expenses = [
    {
      id: 'e1',
      groupId: 'g1',
      name: '燒鳥肌肉串',
      amount: 210,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u1',
          amount: 105
        },
        {
          id: 'u2',
          amount: 105
        }
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e2',
      groupId: 'g1',
      name: '手工醃蘿波',
      amount: 50,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u2',
          amount: (50 / 3)
        },
        {
          id: 'u3',
          amount: (50 / 3)
        },
        {
          id: 'u4',
          amount: (50 / 3)
        },
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e3',
      groupId: 'g1',
      name: '豆腐沙拉',
      amount: 150,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u2',
          amount: (150 / 3)
        },
        {
          id: 'u3',
          amount: (150 / 3)
        },
        {
          id: 'u4',
          amount: (150 / 3)
        },
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e4',
      groupId: 'g1',
      name: '炭烤玉米筍',
      amount: 180,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u2',
          amount: (180 / 3)
        },
        {
          id: 'u3',
          amount: (180 / 3)
        },
        {
          id: 'u4',
          amount: (180 / 3)
        },
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e5',
      groupId: 'g1',
      name: '節瓜',
      amount: 120,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u2',
          amount: (120 / 3)
        },
        {
          id: 'u3',
          amount: (120 / 3)
        },
        {
          id: 'u4',
          amount: (120 / 3)
        },
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e6',
      groupId: 'g1',
      name: '山藥',
      amount: 180,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u1',
          amount: (180 / 3)
        },
        {
          id: 'u2',
          amount: (180 / 3)
        },
        {
          id: 'u3',
          amount: (180 / 3)
        },
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e7',
      groupId: 'g1',
      name: '杏苞菇',
      amount: 120,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u2',
          amount: (120 / 3)
        },
        {
          id: 'u3',
          amount: (120 / 3)
        },
        {
          id: 'u4',
          amount: (120 / 3)
        },
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e8',
      groupId: 'g1',
      name: '娃娃菜',
      amount: 140,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u2',
          amount: (140 / 3)
        },
        {
          id: 'u3',
          amount: (140 / 3)
        },
        {
          id: 'u4',
          amount: (140 / 3)
        },
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e9',
      groupId: 'g1',
      name: '茄子',
      amount: 140,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u2',
          amount: (140 / 3)
        },
        {
          id: 'u3',
          amount: (140 / 3)
        },
        {
          id: 'u4',
          amount: (140 / 3)
        },
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e10',
      groupId: 'g1',
      name: '炸豆腐',
      amount: 150,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u2',
          amount: (150 / 3)
        },
        {
          id: 'u3',
          amount: (150 / 3)
        },
        {
          id: 'u4',
          amount: (150 / 3)
        },
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e11',
      groupId: 'g1',
      name: '青蔥豚煎餃',
      amount: 100,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u1',
          amount: 100
        }
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e12',
      groupId: 'g1',
      name: '韭菜豚煎餃',
      amount: 100,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u2',
          amount: 100
        }
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e13',
      groupId: 'g1',
      name: '綜合煎餃',
      amount: 120,
      date: '2024/5/28',
      category: 'food',
      payerId: 'u1',
      sharers: [
        {
          id: 'u4',
          amount: 100
        }
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e14',
      groupId: 'g1',
      name: '葡萄沙瓦',
      amount: 340,
      date: '2024/5/28',
      category: 'drink',
      payerId: 'u1',
      sharers: [
        {
          id: 'u2',
          amount: (340 / 2)
        },
        {
          id: 'u3',
          amount: (340 / 2)
        }
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e15',
      groupId: 'g1',
      name: '荔枝沙瓦',
      amount: 180,
      date: '2024/5/28',
      category: 'drink',
      payerId: 'u1',
      sharers: [
        {
          id: 'u4',
          amount: 180
        }
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    },
    {
      id: 'e16',
      groupId: 'g1',
      name: '可爾必思',
      amount: 80,
      date: '2024/5/28',
      category: 'drink',
      payerId: 'u1',
      sharers: [
        {
          id: 'u1',
          amount: 80
        }
      ],
      note: "",
      createBy: 'u1',
      createAt: '2024/5/28',
      updateBy: 'u1',
      updateAt: '2024/5/28',
    }]
  // useEffect(() => {
  //   if (group) {
  //     let TotalResult
  //     // let result = splitExpense(group.expenses)
  //     // const values = Object.values(result[loginUserId]);
  //     // TotalResult = values.reduce((sum:number, value:number) => sum + value, 0);
  //     // setAddResult(TotalResult)
  //     console.log(group.expenses)
  //   }

  // }, [group])

  // let result = splitExpense(expenses)
  // console.log(result)

  let nf = new Intl.NumberFormat('en-US');

  return (
    <div className="mt-16 flex flex-col items-center justify-center border-b-grey-userBar border-b-[1px] pb-6 pt-6">
      <div className="text-sm text-neutrals-70 leading-5">
        {addResult > 0 ? "個人待收款總額" : "個人待繳款總額"}

      </div>
      <div className={clsx("text-xl ",{
        "text-highlight-50": addResult > 0,
        "text-highlight-30": addResult < 0,
      })}>
        ${nf.format(Math.abs(addResult))}
        </div>
    </div>
  );
}
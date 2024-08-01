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

  useEffect(() => {
    if (group) {
      let TotalResult
      let result = splitExpense(group.expenses)
      const values = Object.values(result[loginUserId]);
      TotalResult = values.reduce((sum:number, value:number) => sum + value, 0);
      setAddResult(TotalResult)
      console.log(result)
    }

  }, [group])

  

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
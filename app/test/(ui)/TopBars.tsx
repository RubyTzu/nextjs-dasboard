//import from next
import Link from 'next/link';
//import data
import { loginUserId } from '@/app/test/(data)/(fetchData)/user';
import {
  ExtendedGroup,
  ExtendedExpense,
  Expense,
} from '../(data)/(sharedFunction)/types';
//import ui
import { HomeIcon, EditIcon, EditTwoIcon, BackArrowIcon } from '@/app/test/(ui)/Icons';
import clsx from 'clsx';

interface TopGroupBarProps {
  isBalancePage: boolean;
  groupData: ExtendedGroup;
}

interface TopGroupSettingBarProps {
  isAddPage: boolean;
  groupData: ExtendedGroup;
  middleHintword: string;
  leftHintWord: string | React.ReactNode;
  rightHintWord: string;
  leftCancelLink: string;
  rightCancelLink: string;
}

interface TopExpenseBarProps {
  groupData: ExtendedGroup;
  expenseData: ExtendedExpense;
}

interface TopExpenseSettingBarProps {
  isAddPage: boolean;
  group: ExtendedGroup;
  expenseData: ExtendedExpense | Expense;
  phase: number;
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  hintword: string;
  cancelLink: string;
}

interface TopBarProps {
  name: string;
  leftBtnName: string;
  rightBtnName: string;
  handleLeftClick: () => void;
  handleRightClick: () => void;
}

export function TopGroupBar({
  isBalancePage,
  groupData
}: TopGroupBarProps) {
  const hasGroupData = Boolean(groupData);
  const isUserInGroup = hasGroupData && groupData.users?.some((user) => user.id === loginUserId);

  return (
    <div className="fixed z-10 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
      <div className="h-6 w-6 flex">
        {isBalancePage && hasGroupData ? (
          <Link href={`/test/split/group/${groupData.id}`} className="flex">
            <BackArrowIcon />
          </Link>
        ) : hasGroupData ? (
          <Link href="/test/split/groups">
            <HomeIcon />
          </Link>
        ) : null}
      </div>
      <h1 className="text-lg">
        {isUserInGroup ? groupData.name : ''}
      </h1>
      <div className="h-6 w-6">
        {!isBalancePage && isUserInGroup && (
          <Link
            href={`/test/split/group/${groupData.id}/edit`}
            scroll={false}
          >
            <EditIcon />
          </Link>
        )}
      </div>
    </div>
  );
}

export function TopGroupSettingBar({
  isAddPage,
  groupData,
  middleHintword,
  leftHintWord,
  rightHintWord,
  leftCancelLink,
  rightCancelLink
}: TopGroupSettingBarProps) {

  const shouldRender = groupData && (
    isAddPage ||
    (groupData.users?.some((user) => user.id === loginUserId))
  );

  return (
    <div className="fixed z-20 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
      <div className="h-6 w-8 flex justify-center items-center">
        {shouldRender &&
          <Link href={leftCancelLink} scroll={false}>
            <div className="">{leftHintWord}</div>
          </Link>
        }
      </div>
      <h1 className="text-lg">
        {shouldRender && middleHintword}
      </h1>
      <div className="h-6 w-8">
        {shouldRender &&
          <Link href={rightCancelLink} scroll={false}>
            <div className="">{rightHintWord}</div>
          </Link>
        }
      </div>
    </div>
  );
}

export function TopExpenseBar({
  groupData,
  expenseData,
}: TopExpenseBarProps) {
  const id = groupData ? groupData.id : ""

  return (
    <div className="fixed z-10 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
      <Link href={`/test/split/group/${id}`} className="h-6 w-6">
        <HomeIcon />
      </Link>
      <h1 className="text-lg">
        {expenseData &&
          (expenseData.payerId === loginUserId ||
            expenseData.sharers?.some((sharer) => sharer.id === loginUserId))
          ? '費用明細'
          : ''}
      </h1>
      <div className="h-6 w-6">
        {expenseData &&
          (expenseData.payerId === loginUserId ||
            expenseData.sharers?.some(
              (sharer) => sharer.id === loginUserId,
            )) ? (
          <Link
            href={`/test/split/group/${id}/expense/${expenseData.id}/edit`}
            className="h-6 w-6"
            scroll={false}
          >
            <EditTwoIcon />
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export function TopExpenseSettingBar({
  isAddPage,
  group,
  expenseData,
  phase,
  setPhase,
  hintword,
  cancelLink
}: TopExpenseSettingBarProps) {


  function handleClick() {
    if (phase === 1) return;
    setPhase(phase - 1);
    console.log(phase);
  }

  const shouldRender = expenseData && group && (
    isAddPage ||
    (expenseData.payerId === loginUserId || expenseData.sharers?.some((sharer) => sharer.id === loginUserId))
  );

  return (
    <div className="fixed z-20 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
      <div className="flex h-6 w-12 items-center justify-start">
        <div
          onClick={handleClick}
          className={clsx('cursor-pointer text-sm', {
            hidden: phase === 1,
          })}
        >
          上一步
        </div>
      </div>
      <h1 className="text-lg">
        {shouldRender && hintword}
      </h1>
      <div className="flex h-6 w-12 items-center justify-end">
        <>
          {shouldRender && (
            <Link href={cancelLink} scroll={false}>
              <p className="text-sm">取消</p>
            </Link>
          )}
        </>
      </div>
    </div>
  );
}

export function TopBar({
  name,
  leftBtnName,
  rightBtnName,
  handleLeftClick,
  handleRightClick,
}: TopBarProps) {
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white">
      <div className="h-6 w-8">
        <div onClick={handleLeftClick}>
          <p className="">{leftBtnName}</p>
        </div>
      </div>
      <h1 className="text-lg">{name}</h1>
      <div className="h-6 w-8">
        <div onClick={handleRightClick}>
          <p className="">{rightBtnName}</p>
        </div>
      </div>
    </div>
  );
}

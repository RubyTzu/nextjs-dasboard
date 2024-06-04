'use client';
//import from react
import { createContext, useContext, useEffect, useState } from 'react';
//import data
import { getUserInfo, getExpense } from '@/app/test/(data)/API';

interface UserContextType {
  users: { [key: string]: any };
  expenses: { [key: string]: any };
  fetchUser: (userId: string) => void;
  fetchExpense: (expenseId: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<{ [key: string]: any }>({});
  const [expenses, setExpenses] = useState<{ [key: string]: any }>({});

  const fetchUser = async (userId: string) => {
    if (!users[userId]) {
      const userInfo = await getUserInfo(userId);
      setUsers((prevUsers) => ({
        ...prevUsers,
        [userId]: userInfo,
      }));
    }
  };

  const fetchExpense = async (expenseId: string) => {
    if (!expenses[expenseId]) {
      const expenseData = await getExpense(expenseId);
      setExpenses((prevExpenses) => ({
        ...prevExpenses,
        [expenseId]: expenseData,
      }));
    }
  };

  return (
    <UserContext.Provider value={{ users, expenses, fetchUser, fetchExpense }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (userId: string) => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  useEffect(() => {
    context.fetchUser(userId);

    // console.log(`useEffect fetch user ${userId}`);
  }, [userId]);

  return context.users[userId];
};

export const useExpense = (expenseId: string) => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useExpense must be used within a UserProvider');
  }

  useEffect(() => {
    context.fetchExpense(expenseId);

    // console.log('useEffect fetch Expense');
  }, [expenseId]);

  return context.expenses[expenseId];
};

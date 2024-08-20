'use client';
//import from react
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
//import data
import { getGroup, getUser, getExpense } from '@/app/test/(data)/(fetchData)/API';
import { ExtendedExpense, ExtendedGroup, LoginUser } from '../(sharedFunction)/types';

interface AllContextType {
  loginUserId: string;
  setLoginUserId: React.Dispatch<React.SetStateAction<string>>;
  users: { [key: string]: LoginUser };
  groups: { [key: string]: ExtendedGroup };
  expenses: { [key: string]: ExtendedExpense };
  fetchUser: (userId: string) => void;
  fetchGroup: (groupId: string) => void;
  fetchExpense: (expenseId: string) => void;
}

const AllContext = createContext<AllContextType | undefined>(undefined);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [loginUserId, setLoginUserId] = useState<string>('');
  const [users, setUsers] = useState<{ [key: string]: LoginUser }>({});
  const [groups, setGroups] = useState<{ [key: string]: ExtendedGroup }>({});
  const [expenses, setExpenses] = useState<{ [key: string]: ExtendedExpense }>({});
  
  useEffect(()=>{
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId) {
      setLoginUserId(loginUserId);
    }
  },[loginUserId])

  const fetchUser = async (userId: string) => {
    if (!users[userId]) {
      try {
        const user = await getUser(userId);

        setUsers((prevUsers) => ({
          ...prevUsers,
          [userId]: user,
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const fetchGroup = async (groupId: string) => {
    if (!groups[groupId]) {
      try {
        const group = await getGroup(groupId);

        setGroups((prevGroups) => ({
          ...prevGroups,
          [groupId]: group,
        }));
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    }
  };

  const fetchExpense = async (expenseId: string) => {
    if (!expenses[expenseId]) {
      try {
        const expense = await getExpense(expenseId);
        setExpenses((prevExpenses) => ({
          ...prevExpenses,
          [expenseId]: expense,
        }));
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    }
  };

  const value = useMemo(() => ({
    loginUserId,
    setLoginUserId,
    users,
    groups,
    expenses,
    fetchUser,
    fetchGroup,
    fetchExpense,
  }), [loginUserId, users, groups, expenses]);

  return (
    <AllContext.Provider
      value={value}
    >
      {children}
    </AllContext.Provider>
  );
};

export const useUser = (userId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useUser must be used within a Provider');
  }

  useEffect(() => {
    if(userId === '') return
    context.fetchUser(userId);

  }, [userId]);

  return context.users[userId];
};

export const useGroup = (groupId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useGroup must be used within a Provider');
  }

  useEffect(() => {
    context.fetchGroup(groupId);

  }, [groupId]);

  return context.groups[groupId];
};

export const useExpense = (expenseId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useExpense must be used within a Provider');
  }

  useEffect(() => {
    context.fetchExpense(expenseId);

  }, [expenseId]);

  return context.expenses[expenseId];
};

export const useAllContext = () => {
  const context = useContext(AllContext);
  if (context === undefined) {
    throw new Error('useAllContext must be used within a Providers');
  }
  return context;
};
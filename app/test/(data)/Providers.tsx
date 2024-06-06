'use client';
//import from react
import { createContext, useContext, useEffect, useState } from 'react';
//import data
import { getGroupData, getUserInfo, getExpense, getExpenses, getGroup, getUser } from '@/app/test/(data)/API';

interface AllContextType {
  users: { [key: string]: any };
  expenses: { [key: string]: any };
  groups: { [key: string]: any };
  allExpenses: any[];
  fetchUser: (userId: string) => void;
  fetchExpense: (expenseId: string) => void;
  fetchGroup: (groupId: string) => void;
  fetchAllExpenses: () => void;
  newUsers: { [key: string]: any };
  newGroups: { [key: string]: any };
  fetchNewUser: (userId: string) => void;
  fetchNewGroup: (groupId: string) => void;
}

const AllContext = createContext<AllContextType | null>(null);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<{ [key: string]: any }>({});
  const [expenses, setExpenses] = useState<{ [key: string]: any }>({});
  const [groups, setGroups] = useState<{ [key: string]: any }>({});
  const [allExpenses, setAllExpenses] = useState<any>([]);
  //new Data
  const [newUsers, setNewUsers] = useState<{ [key: string]: any }>({});
  const [newGroups, setNewGroups] = useState<{ [key: string]: any }>({});

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

  const fetchGroup = async (groupId: string) => {
    if (!groups[groupId]) {
      const groupData = await getGroupData(groupId);
      setGroups((prevGroups) => ({
        ...prevGroups,
        [groupId]: groupData,
      }))
    }
  }

  const fetchAllExpenses = async () => {
    const data = await getExpenses();

    setAllExpenses(data)
  }

  //new Fetch function
  const fetchNewUser = async (userId: string) => {
    if (!newUsers[userId]) {
      const user = await getUser(userId);
      setNewUsers((prevUsers) => ({
        ...prevUsers,
        [userId]: user,
      }));
    }
  };

  const fetchNewGroup = async (groupId: string) => {
    if (!newGroups[groupId]) {
      const group = await getGroup(groupId);
      setNewGroups((prevGroups) => ({
        ...prevGroups,
        [groupId]: group,
      }))
    }
  }


  return (
    <AllContext.Provider value={{ users, expenses, groups, allExpenses, fetchUser, fetchExpense, fetchGroup, fetchAllExpenses, newUsers, newGroups, fetchNewUser, fetchNewGroup }}>
      {children}
    </AllContext.Provider>
  );
};

export const useUserData = (userId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useUserData must be used within a Provider');
  }

  useEffect(() => {
    context.fetchUser(userId);

    // console.log(`useEffect fetch user ${userId}`);
  }, [userId]);

  return context.users[userId];
};

export const useExpense = (expenseId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useExpense must be used within a Provider');
  }

  useEffect(() => {
    context.fetchExpense(expenseId);

    // console.log(`useEffect fetch Expense ${expenseId}`);
  }, [expenseId]);

  return context.expenses[expenseId];
};

export const useGroupData = (groupId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useGroupData must be used within a Provider');
  }

  useEffect(() => {
    context.fetchGroup(groupId);

    // console.log(`useEffect fetch group ${groupId}`)
  }, [groupId]);

  return context.groups[groupId]
}

export const useExpenses = () => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useExpenses must be used within a Provider');
  }

  useEffect(() => {
    context.fetchAllExpenses();

    // console.log(`useEffect fetch all expenses`)
  }, []);

  return context.allExpenses;
}

//new useContext Function
export const useUser = (userId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useUser must be used within a Provider');
  }

  useEffect(() => {
    context.fetchNewUser(userId);

    // console.log(`useEffect fetch user ${userId}`);
  }, [userId]);

  return context.newUsers[userId];
};

export const useGroup = (groupId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useGroup must be used within a Provider');
  }

  useEffect(() => {
    context.fetchNewGroup(groupId);

    // console.log(`useEffect fetch group ${groupId}`)
  }, [groupId]);

  return context.newGroups[groupId]
}
'use client';
//import from react
import { createContext, useContext, useEffect, useState } from 'react';
//import data
import { getGroup, getUser } from '@/app/test/(data)/API';

interface AllContextType {
  users: { [key: string]: any };
  groups: { [key: string]: any };
  expenses: any[];
  allUsers: any[];
  fetchUser: (userId: string) => void;
  fetchGroup: (groupId: string) => void;
  fetchUserExpenses: (userId: string) => void;
}

const AllContext = createContext<AllContextType | null>(null);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<{ [key: string]: any }>({});
  const [groups, setGroups] = useState<{ [key: string]: any }>({});
  const [expenses, setExpenses] = useState<any>([]);
  const [allUsers, setAllUsers] = useState<any>([]);

  const fetchUser = async (userId: string) => {
    if (!users[userId]) {
      const user = await getUser(userId);
      setUsers((prevUsers) => ({
        ...prevUsers,
        [userId]: user,
      }));
    }
  };

  const fetchGroup = async (groupId: string) => {
    if (!groups[groupId]) {
      const group = await getGroup(groupId);
      setGroups((prevGroups) => ({
        ...prevGroups,
        [groupId]: group,
      }))
    }
  }

  const fetchUserExpenses = async (userId: string) => {
    try {
      // Fetch user data from API 1
      const user = await getUser(userId);

      // Extract group IDs from user data
      const groupIds = user.groups.map((group: any) => group.id);

      // Fetch group expenses for each group ID from API 2
      const groupExpensesPromises = groupIds.map(async (groupId: any) => {
        const group = await getGroup(groupId);

        return group.expense;
      });
      const groupUsersPromises = groupIds.map(async (groupId: any) => {
        const group = await getGroup(groupId);

        return group.users;
      });

      // Wait for all requests to complete
      const groupExpenses = (await Promise.all(groupExpensesPromises)).flat();
      const groupUsers = (await Promise.all(groupUsersPromises)).flat();

      // Process the group expenses data

      setExpenses(groupExpenses);
      setAllUsers(groupUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors
    }
  }



  return (
    <AllContext.Provider value={{ users, groups, expenses, allUsers, fetchUser, fetchGroup, fetchUserExpenses }}>
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
    context.fetchUser(userId);

    // console.log(`useEffect fetch user ${userId}`);
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

    // console.log(`useEffect fetch group ${groupId}`)
  }, [groupId]);

  return context.groups[groupId]
}

export const useExpenses = (userId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useGroup must be used within a Provider');
  }

  useEffect(() => {
    context.fetchUserExpenses(userId);

    // console.log(`useEffect fetch userId ${userId}`)
  }, [userId]);

  const uniqueUsers: any[] = [...new Set(context.allUsers.map((user: any) => user.id))].map(
    (id: string) => context.allUsers.find((user: any) => user.id === id)
  );

  let alldata = {expenses: context.expenses, users: uniqueUsers}
 
  return alldata
}
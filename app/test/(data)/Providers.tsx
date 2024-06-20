'use client';
//import from react
import { createContext, useContext, useEffect, useState } from 'react';
//import data
import { getGroup, getUser } from '@/app/test/(data)/API';
import { loginUserId } from './user';

interface AllContextType {
  users: { [key: string]: any };
  groups: { [key: string]: any };
  expense: any[];
  groupUsers: any[];
  fetchUser: (userId: string) => void;
  fetchGroup: (groupId: string) => void;
  fetchExpenses: (userId: string) => void;
}

const AllContext = createContext<AllContextType | null>(null);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<{ [key: string]: any }>({});
  const [groups, setGroups] = useState<{ [key: string]: any }>({});
  const [expense, setExpense] = useState<any>([]);
  const [groupUsers, setGroupUsers] = useState<any>([]);

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
        // Handle errors
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
        // Handle errors
      }
    }
  };

  const fetchExpenses = async (expenseId: string) => {
    try {
      let groupWithExpense: any = null;

      // Fetch user data from API 1
      const user = await getUser(loginUserId);

      // Extract group IDs from user data
      const groupIds = user.groups.map((group: any) => group.id);

      // Fetch every group data of user's groupIds from API 2, wait for all requests to complete
      const groupData = await Promise.all(groupIds.map((groupId: any) => {
        // console.log(groupId)
        return getGroup(groupId)
      }));

      // // Process and collect expenses with group information
      // const expenses: any = [];

      // groupData.forEach(group => {
      //   group.expense.forEach((expense: any) => {
      //     // Check if the user is the payer or a sharer in the expense
      //     if (expense.payerId === userId || expense.sharers.some((sharer: any) => sharer.id === userId)) {
      //       // Add group information to the expense object
      //       const expenseWithGroup: any = {
      //         ...expense,
      //         groupId: group.id,
      //       };
      //       expenses.push(expenseWithGroup);
      //     }
      //   });
      // });

      //
      // Find the group that contains the expense with the given expenseId
      groupData.forEach(group => {
        const expense = group.expense.find((exp: any) => exp.id === expenseId);
        if (expense) {
          groupWithExpense = {
            group: group,
            expense: expense
          };
        }
      });
      //
      if (!groupWithExpense) {
        throw new Error(`Expense with ID ${expenseId} not found in any group.`);
      }
      // Extract users from the group that contains the expense
      const groupUsers = groupWithExpense.group.users;

      // // Process the group users data
      // let groupUsers: any[] = groupData.flatMap((data) => data.users);

      // // Remove duplicate group users data
      // groupUsers = [...new Map(groupUsers.map(user => [user.id, user])).values()];

      setExpense(groupWithExpense);
      setGroupUsers(groupUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors
    }
  };

  return (
    <AllContext.Provider
      value={{
        users,
        groups,
        expense,
        groupUsers,
        fetchUser,
        fetchGroup,
        fetchExpenses,
      }}
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

  return context.groups[groupId];
};

export const useExpenses = (expenseId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useGroup must be used within a Provider');
  }

  useEffect(() => {
    context.fetchExpenses(expenseId);

    // console.log(`useEffect fetch expenseId ${expenseId}`)
  }, [expenseId]);

  return { expense: context.expense, users: context.groupUsers };
};
'use client';
//import from react
import { createContext, useContext, useEffect, useState } from 'react';
//import data
import { getGroup, getUser } from '@/app/test/(data)/API';

interface AllContextType {
  users: { [key: string]: any };
  groups: { [key: string]: any };
  fetchUser: (userId: string) => void;
  fetchGroup: (groupId: string) => void;
}

const AllContext = createContext<AllContextType | null>(null);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<{ [key: string]: any }>({});
  const [groups, setGroups] = useState<{ [key: string]: any }>({});

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

  return (
    <AllContext.Provider value={{ users, groups, fetchUser, fetchGroup }}>
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
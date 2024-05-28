import { usersInfo } from '@/app/test/(data)/data';

export const user = (id: any) =>
  usersInfo.filter((user) => {
    return user.userId === id;
  })[0];

import { usersInfo } from '@/app/test/(data)/data';

let loginUserId = 'u1';

const user = (id: any) =>
  usersInfo.filter((user) => {
    return user.userId === id;
  })[0];

export { loginUserId, user };
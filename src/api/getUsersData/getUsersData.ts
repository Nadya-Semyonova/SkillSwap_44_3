import usersData from '@public/db/users.json';
import type { IUser } from '@/types/types';

interface UsersJsonData {
  users: IUser[];
}

const fetchUsersApi = async (): Promise<IUser[]> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  const data = usersData as UsersJsonData;
  return data.users;
};

export default fetchUsersApi;

import type { IUser } from '@/types/types';

const response = await fetch('/db/users.json');
const usersData = await response.json();

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

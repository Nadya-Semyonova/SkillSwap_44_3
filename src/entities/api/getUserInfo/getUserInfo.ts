import type { IUser } from '@/types/types';

const response = await fetch('/db/users.json');
const usersData = await response.json();

interface UsersJsonData {
  users: IUser[];
}

const fetchUserInfoApi = async (email: string, password: string): Promise<IUser | null> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  const data = usersData as UsersJsonData;

  const foundUser = data.users.find((user) => user.email === email && user.password === password);

  return foundUser || null;
};

export default fetchUserInfoApi;

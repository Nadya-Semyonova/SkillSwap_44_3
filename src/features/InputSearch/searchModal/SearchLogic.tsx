import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import type { IUser } from '@/types/types';

export default function useInputSearchLogic() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const users = useSelector((state: RootState) => state.users.users);

  const filteredUsers =
    users?.filter((user: IUser) => {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) return false;
      const query = trimmedQuery.toLowerCase();

      const searchableFields = [
        user.name,
        user.city,
        user.email,
        user.gender,
        user.age?.toString(),
        user.id?.toString(),
        user.dateOfBirth,
        user.about || '',
        user.card_people?.skill || '',
        user.card_people?.category || '',
        user.card_people?.subcategory || '',
        user.card_people?.description || '',
        ...(user.skill_off || []),
      ].filter(Boolean);

      return searchableFields.some((field) => field.toLowerCase().includes(query));
    }) || [];

  const uniqueUsers = Array.from(
    new Map(filteredUsers.map((user: IUser) => [user.id, user])).values()
  );

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredUsers: uniqueUsers,
    clearSearchQuery,
  };
}

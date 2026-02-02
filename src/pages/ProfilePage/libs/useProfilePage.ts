import { useState } from 'react';
import { useSelector, type RootState } from '@/store/store';

export function useProfilePage() {
  const [activeButton, setActiveButton] = useState<string>('personal');
  const favoritesUsers = useSelector((state: RootState) => state.profileEdit.favoritesUsers);

  return { activeButton, setActiveButton, favoritesUsers };
}

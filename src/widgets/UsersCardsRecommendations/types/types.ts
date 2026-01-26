import type { IUser } from '@/types/types';
import type { ReactNode } from 'react';

export interface UsersCardsRecommendationsProps {
  title: string;
  users: IUser[];
  handleClickMore: (title: string) => void;
  buttonMore?: boolean;
  sortButton?: ReactNode;
}

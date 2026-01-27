import type { ReactNode } from 'react';
import type { IUser } from '@/types/types';

export interface UsersCardsRecommendationsProps {
  title: string;
  users: IUser[];
  handleClickMore: (title: string) => void;
  buttonMore?: boolean;
  sortButton?: ReactNode;
}

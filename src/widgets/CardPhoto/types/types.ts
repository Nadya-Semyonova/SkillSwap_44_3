import type { ReactNode } from 'react';
import type { IUser } from '@/types/types';

export interface CardPhotoProps {
  user: IUser;
  onLike?: (userId: number, liked: boolean) => void;
  onShare: (userId: number) => void;
  onMoreDetails: (userId: number) => void;
  title?: string;
  buttons?: ReactNode;
  children?: ReactNode;
}

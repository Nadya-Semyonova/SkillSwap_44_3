import type { IUser } from "@/types/types";
import type { ReactNode } from "react";

export interface CardPhotoProps {
  user: IUser;
  onLike?: (userId: number, liked: boolean) => void;
  onShare: (userId: number) => void;
  onMoreDetails: (userId: number) => void;
  title?: string;
  buttons?: ReactNode;
  children?: ReactNode;
}
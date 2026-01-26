import Request from '@/shared/assets/images/IconsSvg/Request';
import MessageText from '@/shared/assets/images/IconsSvg/MessageText';
import Like from '@/shared/assets/images/IconsSvg/Like';
import Idea from '@/shared/assets/images/IconsSvg/Idea';
import User from '@/shared/assets/images/IconsSvg/User';

export const SIDEBAR_BUTTONS = [
  { id: 'requests', label: 'Заявки', icon: 'Request' },
  { id: 'exchanges', label: 'Мои обмены', icon: 'MessageText' },
  { id: 'favorites', label: 'Избранное', icon: 'Like' },
  { id: 'skills', label: 'Мои навыки', icon: 'Idea' },
  { id: 'personal', label: 'Личные данные', icon: 'User' },
] as const;

export const ICON_COMPONENTS = {
  Request,
  MessageText,
  Like,
  Idea,
  User,
} as const;

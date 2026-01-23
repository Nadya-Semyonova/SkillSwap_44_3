import type { IUser } from '@/types/types';

export const MOCK_FOR_CARDPHOTO_COMPONENT = {
  id: 3,
  liked: 3,
  card_people: {
    skill: 'Фотография',
    category: 'Творчество и искусство',
    subcategory: 'Фотография',
    description:
      'Снимаю больше 5 лет — от уличной фотографии до портретов друзей. Научу видеть свет, выстраивать кадр по правилам (и когда их можно нарушать), работать с композицией и цветом.',
    photos: [],
  },
} as unknown as IUser;

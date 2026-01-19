import BriefCase from '@public/img/IconsSvg/BriefCase';
import Global from '@public/img/IconsSvg/Global';
import Home from '@public/img/IconsSvg/Home';
import Palette from '@public/img/IconsSvg/Palette';
import Book from '@public/img/IconsSvg/Book';
import LifeStyle from '@public/img/IconsSvg/LifeStyle';

export type CategoryConfig = {
  icon: JSX.Element;
  className: string;
};

export const categoryIcons: Record<string, CategoryConfig> = {
  'Бизнес и карьера': {
    icon: <BriefCase />,
    className: 'icon__business',
  },
  'Творчество и искусство': {
    icon: <Palette />,
    className: 'icon__art',
  },
  'Иностранные языки': {
    icon: <Global />,
    className: 'icon__languages',
  },
  'Образование и развитие': {
    icon: <Book />,
    className: 'icon__education',
  },
  'Дом и уют': {
    icon: <Home />,
    className: 'icon__home',
  },
  'Здоровье и лайфстайл': {
    icon: <LifeStyle />,
    className: 'icon__health',
  },
};

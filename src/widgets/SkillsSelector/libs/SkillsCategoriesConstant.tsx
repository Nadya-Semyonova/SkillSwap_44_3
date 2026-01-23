import skills from '@assets/db/skills.json';
import BriefCase from '@/shared/assets/images/IconsSvg/BriefCase';
import Global from '@/shared/assets/images/IconsSvg/Global';
import Home from '@/shared/assets/images/IconsSvg/Home';
import Palette from '@/shared/assets/images/IconsSvg/Palette';
import Book from '@/shared/assets/images/IconsSvg/Book';
import LifeStyle from '@/shared/assets/images/IconsSvg/LifeStyle';
import type { SkillsData } from './types';

export type CategoryConfig = {
  icon: JSX.Element;
  className: string;
};

const skillsData = skills as SkillsData;
const categories = Object.keys(skillsData);

export const SkillsCategoriesConstant: Record<(typeof categories)[number], CategoryConfig> = {
  [categories[0]]: {
    icon: <BriefCase />,
    className: 'icon__business',
  },
  [categories[1]]: {
    icon: <Palette />,
    className: 'icon__art',
  },
  [categories[2]]: {
    icon: <Global />,
    className: 'icon__languages',
  },
  [categories[3]]: {
    icon: <Book />,
    className: 'icon__education',
  },
  [categories[4]]: {
    icon: <Home />,
    className: 'icon__home',
  },
  [categories[5]]: {
    icon: <LifeStyle />,
    className: 'icon__health',
  },
};

import skills from '@assets/db/skills.json';
import BriefCase from '@assets/img/IconsSvg/BriefCase';
import Global from '@assets/img/IconsSvg/Global';
import Home from '@assets/img/IconsSvg/Home';
import Palette from '@assets/img/IconsSvg/Palette';
import Book from '@assets/img/IconsSvg/Book';
import LifeStyle from '@assets/img/IconsSvg/LifeStyle';
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

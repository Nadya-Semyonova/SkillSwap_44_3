import skills from '@public/db/skills.json';
import BriefCase from '@public/img/IconsSvg/BriefCase';
import Global from '@public/img/IconsSvg/Global';
import Home from '@public/img/IconsSvg/Home';
import Palette from '@public/img/IconsSvg/Palette';
import Book from '@public/img/IconsSvg/Book';
import LifeStyle from '@public/img/IconsSvg/LifeStyle';
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

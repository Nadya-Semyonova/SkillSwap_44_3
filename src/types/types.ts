export interface ISingleFilterButton {
  name: string;
  handleClick: (e: string) => void;
  isActive: string;
}

export interface IMultiFilterButton {
  name: string;
  handleClick: (e: string) => void;
  isActiveArray: string[];
  arrayButton?: boolean;
}

export interface ISvgIcon {
  fill?: string;
}

export interface IButtonDefault {
  name: string;
  handleClick?: () => void;
  styleButton?: string;
}

export interface IUser {
  id: number;
  liked: number;
  avatar: string;
  name: string;
  city: string;
  age: number;
  dateOfBirth: string;
  gender: string;
  email: string;
  password: string;
  about: string;
  card_people: {
    skill: string;
    category: string;
    subcategory: string;
    description: string;
    photos: string[];
  };
  skill_off: string[];
}

export interface SkillItem {
  id: string;
  name: string;
}

export interface SkillsData {
  [category: string]: string[];
}

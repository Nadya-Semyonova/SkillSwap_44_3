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
  type?: 'button' | 'submit' | 'reset';
  variant?: 'outline' | 'continue';
}

export interface ChildrenModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
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
  createdAt: string;
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

export interface ISkillItem {
  [categoryName: string]: string[];
}

export interface IInput {
  title?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  disabled?: boolean;
}

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
  handleClick: () => void;
  styleButton?: string;
}

export interface IButtonCancelFilter {
  title: string;
  textStyle: string;
  buttonStyle?: string;
  fillSvg?: string;
  handleClick: (title: string) => void;
}

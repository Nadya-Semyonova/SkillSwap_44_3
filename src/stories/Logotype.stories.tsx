import type { Meta, StoryObj } from '@storybook/react';
import Logotype from '@shared/ui/Logotype/Logotype';
import '@shared/ui/Logotype/Logotype.module.css';

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'inline-flex',
};

type LogotypeStoryArgs = {
  isLink?: boolean;
  href?: string;
  ariaLabel?: string;
};

function LogotypeWithWrapper({
  isLink = false,
  href = '/',
  ariaLabel = 'SkillSwap — главная страница',
}: LogotypeStoryArgs) {
  if (isLink) {
    return (
      <a href={href} aria-label={ariaLabel} style={linkStyle}>
        <Logotype />
      </a>
    );
  }
  return <Logotype />;
}

const meta: Meta<LogotypeStoryArgs> = {
  title: 'Components/Logotype',
  component: LogotypeWithWrapper,
  tags: ['autodocs'],
  argTypes: {
    isLink: {
      control: 'boolean',
      description: 'Оборачивать логотип в ссылку <a> (обёртка в сториз, сам Logotype не меняется)',
    },
    href: {
      control: 'text',
      description: 'URL ссылки при isLink',
      if: { arg: 'isLink', truthy: true },
    },
    ariaLabel: {
      control: 'text',
      name: 'aria-label',
      description: 'aria-label для ссылки',
      if: { arg: 'isLink', truthy: true },
    },
  },
} as Meta<typeof LogotypeWithWrapper>;

export default meta;

type Story = StoryObj<typeof LogotypeWithWrapper>;

export const Default: Story = {
  args: {
    isLink: false,
    href: '/',
    ariaLabel: 'SkillSwap — главная страница',
  },
  render: (args: LogotypeStoryArgs) => (
    <LogotypeWithWrapper isLink={args.isLink} href={args.href} ariaLabel={args.ariaLabel} />
  ),
};

export const AsLink: Story = {
  args: {
    isLink: true,
    href: '/',
    ariaLabel: 'SkillSwap — главная страница',
  },
  render: (args: LogotypeStoryArgs) => (
    <LogotypeWithWrapper isLink={args.isLink} href={args.href} ariaLabel={args.ariaLabel} />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Состояние «логотип как ссылка» — обёртка в `<a>` по условию isLink. Компонент Logotype не меняется.',
      },
    },
  },
};

export const AsLinkWithAriaLabel: Story = {
  args: {
    isLink: true,
    href: '/',
    ariaLabel: 'SkillSwap — вернуться на главную',
  },
  render: (args: LogotypeStoryArgs) => (
    <LogotypeWithWrapper isLink={args.isLink} href={args.href} ariaLabel={args.ariaLabel} />
  ),
};

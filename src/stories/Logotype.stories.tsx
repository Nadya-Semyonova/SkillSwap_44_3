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

const meta: Meta<typeof Logotype> = {
  title: 'Components/Logotype',
  component: Logotype,
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
};

export default meta;

type Story = StoryObj<typeof Logotype & LogotypeStoryArgs>;

/** Логотип по умолчанию. */
export const Default: Story = {
  args: {
    isLink: false,
    href: '/',
    ariaLabel: 'SkillSwap — главная страница',
  },
  render: (args) => <LogotypeWithWrapper {...(args as LogotypeStoryArgs)} />,
};

/** **isLink** включён: логотип обёрнут в <a>. */
export const AsLink: Story = {
  args: {
    isLink: true,
    href: '/',
    ariaLabel: 'SkillSwap — главная страница',
  },
  render: (args) => <LogotypeWithWrapper {...(args as LogotypeStoryArgs)} />,
  parameters: {
    docs: {
      description: {
        story:
          'Состояние «логотип как ссылка» — обёртка в `<a>` по условию isLink. Компонент Logotype не меняется.',
      },
    },
  },
};

/** Ссылка с кастомным aria-label. */
export const AsLinkWithAriaLabel: Story = {
  args: {
    isLink: true,
    href: '/',
    ariaLabel: 'SkillSwap — вернуться на главную',
  },
  render: (args) => <LogotypeWithWrapper {...(args as LogotypeStoryArgs)} />,
};

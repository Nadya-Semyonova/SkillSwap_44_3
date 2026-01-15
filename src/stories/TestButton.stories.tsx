import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'SkillSwap/Button',
  tags: ['autodocs'],
};

export default meta;

export const Example: StoryObj = {
  render: () => <button type="button">SkillSwap Button</button>,
};

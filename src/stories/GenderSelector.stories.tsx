import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import GenderSelector from './GenderSelector';
import type { IGender } from '@/types/types';

const meta: Meta<typeof GenderSelector> = {
  title: 'Features/Auth/Registration/GenderSelector',
  component: GenderSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GenderSelector>;

function GenderSelectorWithState() {
  const [selectedGender, setSelectedGender] = useState<IGender | null>(null);

  return (
    <div style={{ width: '320px' }}>
      <GenderSelector selectedGender={selectedGender} onSelect={setSelectedGender} />
    </div>
  );
}

export const Default: Story = {
  render: () => <GenderSelectorWithState />,
};

export const WithSelectedValue: Story = {
  render: () => {
    const [selectedGender, setSelectedGender] = useState<IGender | null>({
      id: 1,
      name: 'Мужской',
      value: 'male',
    });

    return (
      <div style={{ width: '320px' }}>
        <GenderSelector selectedGender={selectedGender} onSelect={setSelectedGender} />
      </div>
    );
  },
};

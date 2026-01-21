import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CitySelector from './CitySelector';
import type { ICity } from '@/types/types';

const meta: Meta<typeof CitySelector> = {
  title: 'Features/Auth/Registration/CitySelector',
  component: CitySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CitySelector>;

function CitySelectorWithState() {
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);

  return (
    <div style={{ width: '320px' }}>
      <CitySelector selectedCity={selectedCity} onSelect={setSelectedCity} />
    </div>
  );
}

export const Default: Story = {
  render: () => <CitySelectorWithState />,
};

export const WithSelectedCity: Story = {
  render: () => {
    const [selectedCity, setSelectedCity] = useState<ICity | null>({
      id: 1,
      name: 'Москва',
    });

    return (
      <div style={{ width: '320px' }}>
        <CitySelector selectedCity={selectedCity} onSelect={setSelectedCity} />
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import ToggledSelect from '@shared/ui/useSelector/ToggledSelect';

const meta: Meta<typeof ToggledSelect> = {
  title: 'Shared/UI/ToggledSelect',
  component: ToggledSelect,
};

export default meta;
type Story = StoryObj<typeof ToggledSelect>;

export const Default: Story = {
  render: () => (
    <ToggledSelect title="Категория навыка" placeholder="Выберите категорию">
      <div>Бизнес и карьера</div>
      <div>Творчество и искусство</div>
      <div>Иностранные языки</div>
      <div>Здоровье и лайфстайл</div>
      <div>Дом и уют</div>
    </ToggledSelect>
  ),
};

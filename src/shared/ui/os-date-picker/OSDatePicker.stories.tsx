import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { OSDatePicker } from './OSDatePicker';

const meta = {
  title: 'ui/OSDatePicker',
  component: OSDatePicker,
} satisfies Meta<typeof OSDatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PackingListDatePicker: Story = {
  args: {
    children: ({ value }) => <Button.TypeB>{value}</Button.TypeB>,
  },
};

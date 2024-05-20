import type { Meta, StoryObj } from '@storybook/react';

import Chip from '../Chip';

const meta = {
  title: 'ui/Chip',
  component: Chip,
  args: {
    children: '해외여행',
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    active: false,
  },
};

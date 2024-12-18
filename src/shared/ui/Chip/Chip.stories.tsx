import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { Chip } from './Chip';

const meta = {
  title: 'ui/Chip',
  component: Chip,
  args: {
    children: '해외여행',
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

const TypeBTemplate = {
  render: (args: ComponentProps<typeof Chip.TypeB>) => <Chip.TypeB {...args}>D-32</Chip.TypeB>,
};

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

export const TypeB: Story = TypeBTemplate;

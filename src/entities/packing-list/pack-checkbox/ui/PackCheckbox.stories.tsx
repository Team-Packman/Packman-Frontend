import type { Meta, StoryObj } from '@storybook/react';

import { PackCheckbox } from './PackCheckbox';

const meta = {
  title: 'ui/PackCheckbox',
  component: PackCheckbox,
} satisfies Meta<typeof PackCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

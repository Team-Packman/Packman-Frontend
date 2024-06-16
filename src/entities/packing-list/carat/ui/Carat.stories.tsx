import type { Meta, StoryObj } from '@storybook/react';

import { Carat } from './Carat';

const meta = {
  title: 'ui/Carat',
  component: Carat,
} satisfies Meta<typeof Carat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

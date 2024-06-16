import type { Meta, StoryObj } from '@storybook/react';

import { DeleteCheckbox } from './DeleteCheckbox';

const meta = {
  title: 'ui/DeleteCheckbox',
  component: DeleteCheckbox,
} satisfies Meta<typeof DeleteCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

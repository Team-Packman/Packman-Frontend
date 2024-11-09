import type { Meta, StoryObj } from '@storybook/react';

import { Caret } from './Caret';

const meta = {
  title: 'ui/Caret',
  component: Caret,
} satisfies Meta<typeof Caret>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

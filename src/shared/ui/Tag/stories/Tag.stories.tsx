import type { Meta, StoryObj } from '@storybook/react';

import Tag from '../Tag';

const meta = {
  title: 'ui/Tag',
  component: Tag,
  args: {
    children: '총 20개의 짐',
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

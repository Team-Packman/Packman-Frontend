import type { Meta, StoryObj } from '@storybook/react';

import ShareIcon from '@/assets/images/svg/share_icon.svg';

import Button from '../Button';

const meta = {
  title: 'ui/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: {
        type: 'radio',
      },
      description: 'Image component',
      options: ['withIcon', 'withoutIcon'],
      mapping: {
        withIcon: <img src={ShareIcon} alt="공유하기 버튼" />,
        withoutIcon: null,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const ButtonTemplate: Story = {
  render: args => (
    <>
      <Button variant="primary" {...args}>
        PRIMARY
      </Button>
      <Button variant="active" {...args}>
        ACTIVE
      </Button>
      <Button variant="inactive" {...args}>
        INACTIVE
      </Button>
    </>
  ),
};

export const Small: Story = {
  ...ButtonTemplate,
  args: {
    size: 'small',
  },
};

export const Middle: Story = {
  ...ButtonTemplate,
  args: {
    size: 'middle',
  },
};

export const Big: Story = {
  ...ButtonTemplate,
  args: {
    size: 'big',
  },
};

export const WithIcon: Story = {
  ...ButtonTemplate,
  args: {
    ...Big.args,
    icon: 'withIcon',
  },
};

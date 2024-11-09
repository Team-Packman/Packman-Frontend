import type { Meta, StoryObj } from '@storybook/react';

import CalendarIcon from '@/shared/assets/images/svg/calendar-icon.svg';

import { TextInput } from './TextInput';

const meta = {
  title: 'ui/TextInput',
  component: TextInput,
  argTypes: {
    rightIcon: {
      control: {
        type: 'radio',
      },
      options: ['withIcon', 'withoutIcon'],
      mapping: {
        withIcon: <img src={CalendarIcon} alt="달력 아이콘" />,
        withoutIcon: null,
      },
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const TextInputTemplate: Story = {
  render: args => <TextInput placeholder="친구와 도쿄 여행" {...args} />,
};

export const Default: Story = {
  ...TextInputTemplate,
};

export const WithTopLabel: Story = {
  ...TextInputTemplate,
  args: {
    topLabel: '짐 리스트 이름을 정해주세요.',
  },
};

export const WithRightIcon: Story = {
  ...TextInputTemplate,
  args: {
    rightIcon: <img src={CalendarIcon} alt="calendar" />,
  },
};

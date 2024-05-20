import type { Meta, StoryObj } from '@storybook/react';

import ProfileIcon from '@/assets/images/svg/profile_icon.svg';

import AppScreen from '../AppScreen';

const meta = {
  title: 'ui/AppScreen',
  component: AppScreen,
} satisfies Meta<typeof AppScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

const ProfileButton = () => (
  <button type="button" css={{ cursor: 'pointer' }}>
    <img src={ProfileIcon} alt="프로필 아이콘" />
  </button>
);

export const Default: Story = {};

export const WithoutBoth: Story = {
  args: {
    appBar: {
      left: null,
    },
  },
};

export const WithTitle: Story = {
  args: {
    appBar: {
      title: '리스트 목록',
    },
  },
};

export const WithRight: Story = {
  args: {
    appBar: {
      right: <ProfileButton />,
    },
  },
};

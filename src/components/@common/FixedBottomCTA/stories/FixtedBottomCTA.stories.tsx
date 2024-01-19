import type { Meta, StoryObj } from '@storybook/react';

import AppLayout from '../../AppLayout/AppLayout';
import AppScreen from '../../AppScreen/AppScreen';
import Button from '../../Button/Button';
import FixedBottomCTA from '../FixedBottomCTA';

const meta = {
  title: 'ui/FixedBottomCTA',
  component: FixedBottomCTA.TypeA,
  argTypes: {
    direction: {
      control: {
        type: 'radio',
      },
      options: ['row', 'column'],
      description: 'row | column',
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: Story => (
    <AppLayout>
      <AppScreen appBar={{ title: '', left: null }}>
        <Story />
      </AppScreen>
    </AppLayout>
  ),
} satisfies Meta<typeof FixedBottomCTA.TypeA>;

export default meta;

type Story = StoryObj<typeof meta>;

const TypeATemplate: Story = {
  render: args => (
    <FixedBottomCTA.TypeA {...args}>
      <Button>건너뛰기</Button>
      <Button variant="active">확인</Button>
    </FixedBottomCTA.TypeA>
  ),
};

export const TypeARow: Story = {
  ...TypeATemplate,
};

export const TypeAColumn: Story = {
  ...TypeATemplate,
  args: {
    direction: 'column',
  },
};

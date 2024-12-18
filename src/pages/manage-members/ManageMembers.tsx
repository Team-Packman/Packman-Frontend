import styled from '@emotion/styled';

import { useBoolean } from '@/shared/lib/use-boolean';
import { AppScreen } from '@/shared/ui/app-screen/AppScreen';
import { Button } from '@/shared/ui/button/Button';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';
import { Chip } from '@/shared/ui/Chip/Chip';
import { Spacing } from '@/shared/ui/spacing/Spacing';
import { Stack } from '@/shared/ui/stack/Stack';
import { Text } from '@/shared/ui/text/Text';
import { VisuallyFullWidth } from '@/shared/ui/visually-full-width/VisuallyFullWidth';

const FullWidthButton = styled(Button)`
  border-radius: 0;
`;

const GridContainer = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 7.2rem);

  gap: 18px;
`;

const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const AvatarWithIcon = styled(Stack)`
  height: 9.6rem;
`;

const Avatar = styled.div`
  width: 7.2rem;
  height: 7.2rem;
  background: var(--gray-gray1, #f2f2f2);
  border-radius: 50%;
`;

const ManageMembers = () => {
  const { value: isEditMode, setValue: setIsEditMode } = useBoolean(false);

  return (
    <AppScreen appBar={{ title: '멤버 관리' }}>
      <Spacing gap={4} />
      <Text typo="bold20">list name</Text>
      <Spacing gap={8} />
      <Stack gap={8}>
        <Text typo="medium16">2000년 1월 1일</Text>
        <Chip.TypeB>D-32</Chip.TypeB>
      </Stack>
      <Spacing gap={16} />
      <VisuallyFullWidth>
        <FullWidthButton size="big" variant="contained">
          멤버 초대하기
        </FullWidthButton>
      </VisuallyFullWidth>
      <Spacing gap={24} />
      <Stack justifyContent="space-between" alignItems="center">
        <Stack gap={8}>
          <Text typo="semibold16">멤버 목록</Text>
          <Text typo="semibold16" color="pmPink">
            12
          </Text>
        </Stack>
        <Checkbox.Root as="button" css={{ padding: 4 }} onCheckedChange={setIsEditMode}>
          {({ checked }) => <Text typo="semibold14">{checked ? '완료' : '삭제'}</Text>}
        </Checkbox.Root>
      </Stack>
      <Spacing gap={6} />
      <GridContainer>
        {[
          'jooonghwa won',
          'nooeyes',
          '노아이즈',
          '유나심',
          '새로운걸',
          '또 새로운걸',
          '또 또 새로운걸',
          '또 또 또 새로운걸',
        ].map((name, index) => (
          <MemberCard key={index}>
            <AvatarWithIcon direction="column" justifyContent="flex-end">
              <Avatar />
              {/** @todo 아이콘 추가 */}
              {isEditMode && <span>삭제</span>}
            </AvatarWithIcon>
            <Spacing gap={6} />
            <Text typo="medium14">{name}</Text>
          </MemberCard>
        ))}
      </GridContainer>
    </AppScreen>
  );
};

export default ManageMembers;

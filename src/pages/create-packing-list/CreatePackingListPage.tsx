import styled from '@emotion/styled';
import * as RadioGroup from '@radix-ui/react-radio-group';

import CalendarIcon from '@/shared/assets/images/svg/calendar-icon.svg';
import { AppScreen } from '@/shared/ui/app-screen/AppScreen';
import { Button } from '@/shared/ui/button/Button';
import { FixedBottomCTA } from '@/shared/ui/fixed-bottom-cta/FixedBottomCTA';
import { OSDatePicker } from '@/shared/ui/os-date-picker/OSDatePicker';
import { Spacing } from '@/shared/ui/spacing/Spacing';
import { Stack } from '@/shared/ui/stack/Stack';
import { TextInput } from '@/shared/ui/text-input/TextInput';
import { UncontrolledForm } from '@/shared/ui/uncontrolled-form/UncontrolledForm';

const Label = styled.label`
  color: ${({ theme }) => theme.color.pmBlack};

  ${({ theme }) => theme.typo.semibold16};
`;

const CreatePackingListPage = () => (
  <AppScreen appBar={{ title: '짐 리스트 만들기' }}>
    <UncontrolledForm<{ name: string; date: string; type: string }>
      id="create-packing-list-form"
      mode="onChange"
      validation={formValue => Boolean(formValue.name && formValue.date && formValue.type)}
      onValidSubmit={formValue => {
        /** @todo 추후 api 연결 */
        console.log('formValue :>> ', formValue);
      }}
    >
      {({ isValid }) => (
        <>
          <Spacing gap={12} />
          <TextInput
            name="name"
            topLabel="짐 리스트 이름을 정해주세요."
            placeholder="친구와 도쿄 여행"
          />
          <Spacing gap={44} />
          <OSDatePicker name="date">
            {({ value, isModified }) => (
              <TextInput
                topLabel="언제 출발하시나요?"
                rightIcon={<img src={CalendarIcon} alt="달력 아이콘" />}
                defaultValue={isModified ? value : ''}
                placeholder={value}
                /** @description 클릭 시 포커스(커서 노출) 방지 */
                onMouseDown={e => e.preventDefault()}
              />
            )}
          </OSDatePicker>
          <Spacing gap={44} />
          <Label>누구와 떠나시나요?</Label>
          <Spacing gap={12} />
          <RadioGroup.Root name="type">
            <Stack gap={9} css={{ height: 46 }}>
              <RadioGroup.Item value="alone" asChild>
                <Button variant="dimmed">혼자 패킹</Button>
              </RadioGroup.Item>
              <RadioGroup.Item value="together" asChild>
                <Button variant="dimmed">함께 패킹</Button>
              </RadioGroup.Item>
            </Stack>
          </RadioGroup.Root>
          <FixedBottomCTA.TypeA>
            <Button
              disabled={!isValid}
              type="submit"
              form="create-packing-list-form"
              size="big"
              variant="contained"
            >
              다음으로
            </Button>
          </FixedBottomCTA.TypeA>
        </>
      )}
    </UncontrolledForm>
  </AppScreen>
);

export { CreatePackingListPage };

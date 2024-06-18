import { Button } from '@/shared/ui/button/Button';
import { Icon } from '@/shared/ui/icon/Icon';
import { OSDatePicker } from '@/shared/ui/os-date-picker/OSDatePicker';
import { Stack } from '@/shared/ui/stack/Stack';

import { Title } from './components/Title';

const PackingListInfo = () => (
  <Stack direction="column" gap={8}>
    <Title>제목입니다</Title>
    <Stack gap={6}>
      <OSDatePicker>{({ value }) => <Button.TypeB>{value}</Button.TypeB>}</OSDatePicker>
      <Button.TypeB icon={<Icon.Exchange />}>전체공개</Button.TypeB>
      <Button.TypeB variant="secondary" icon={<Icon.Member />}>
        멤버 관리
      </Button.TypeB>
    </Stack>
  </Stack>
);

export { PackingListInfo };

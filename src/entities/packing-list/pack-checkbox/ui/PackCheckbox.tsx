import styled from '@emotion/styled';

import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

const Root = styled(Checkbox.Root)`
  cursor: pointer;
  user-select: none;

  width: 1.8rem;
  height: 1.8rem;
  padding: 0.2rem;

  border: 1px solid #ddd;
  border-radius: 50%;

  &[data-state='checked'] {
    border: 1px solid #ff307b;
  }
`;

const Indicator = styled(Checkbox.Indicator)`
  width: 100%;
  height: 100%;

  background-color: #ff307b;
  border: 1px solid #ff307b;
  border-radius: 50%;
`;

const PackCheckbox = () => (
  <Root>
    <Indicator />
  </Root>
);

export { PackCheckbox };

import styled from '@emotion/styled';

import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

const Root = styled(Checkbox.Root)`
  cursor: pointer;
  user-select: none;

  width: 1.8rem;
  height: 1.8rem;

  border: 1px solid #ddd;

  &[data-state='checked'] {
    border: 1px solid #ff307b;
  }
`;

const Indicator = styled(Checkbox.Indicator)`
  width: 100%;
  height: 100%;

  color: white;
  text-align: center;

  background-color: #ff307b;
`;

const DeleteCheckbox = () => (
  <Root>
    <Indicator>✔</Indicator>
  </Root>
);

export { DeleteCheckbox };

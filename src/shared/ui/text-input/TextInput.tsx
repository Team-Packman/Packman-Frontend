import styled from '@emotion/styled';
import { type ComponentPropsWithoutRef, type ReactNode, useRef } from 'react';

import { Stack } from '../stack/Stack';

const Root = styled(Stack)`
  position: relative;

  width: 100%;

  align-items: center;

  padding: 12px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.pmGray};
  background: ${({ theme }) => theme.color.white} ${({ theme }) => theme.typo.medium16};
`;

const Input = styled.input`
  width: 100%;

  color: var(--gray-pmBlack, #121212);

  border: none;

  &::placeholder {
    color: var(--gray-gray4, #909090);
  }

  ${({ theme }) => theme.typo.medium16};

  outline: none;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.color.pmBlack};

  ${({ theme }) => theme.typo.semibold16};
`;

type TextInputProps = {
  topLabel?: string;
  rightIcon?: ReactNode;
} & ComponentPropsWithoutRef<'input'>;

const TextInput = ({ topLabel, rightIcon, ...restProps }: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  /** @description showPicker user gesture 에러 방지를 위해 htmlFor 대신 onClick으로 직접 제어한다. */
  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Stack direction="column" gap={12}>
      {topLabel && <Label onClick={focusInput}>{topLabel}</Label>}
      <Root gap={12}>
        <Input {...restProps} ref={inputRef} />
        {rightIcon}
      </Root>
    </Stack>
  );
};

export { TextInput };

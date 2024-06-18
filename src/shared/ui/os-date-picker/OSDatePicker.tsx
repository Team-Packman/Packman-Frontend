import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';
import { useRef } from 'react';

import { composeFunctions } from '@/shared/lib/compose-functions';
import { resolveChildren } from '@/shared/lib/resolve-children';
import { useControllableState } from '@/shared/lib/use-controllable-state';
import type { PropsWithRenderProps } from '@/shared/types/compound';

import type { ValidComponentProps } from '../polymorphic/Polymorphic';
import { Polymorphic } from '../polymorphic/Polymorphic';
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden';
import type { YYYYMMDD } from './models/date-schema';
import { parseYYYYMMDD } from './models/date-schema';
import { getCurrentYYYYMMDD } from './models/get-current-yyyymmdd';

const Root = styled.div`
  position: relative;
`;

const AbsoluteInput = styled.input`
  position: absolute;
  top: 100%;
  left: 0;
`;

type OSDatePickerProps = ValidComponentProps<
  'input',
  PropsWithRenderProps<
    {
      value?: YYYYMMDD;
      onValueChange?: (value: YYYYMMDD) => void;
    },
    { value: YYYYMMDD }
  >
>;

const OSDatePicker = (props: OSDatePickerProps) => {
  const { children, value: valueProp, onClick: onClickProp, onValueChange, ...restProps } = props;

  const dateRef = useRef<HTMLInputElement>(null);

  const [value = getCurrentYYYYMMDD(), setValue] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });

  const showPicker = () => dateRef.current?.showPicker();

  const setDate = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setValue(parseYYYYMMDD(value));

  return (
    <Root>
      <Polymorphic as="span" {...restProps} onClick={composeFunctions(showPicker, onClickProp)}>
        {resolveChildren(children, { value })}
      </Polymorphic>
      <VisuallyHidden>
        <AbsoluteInput {...restProps} ref={dateRef} type="date" value={value} onChange={setDate} />
      </VisuallyHidden>
    </Root>
  );
};

export { OSDatePicker };

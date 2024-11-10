import {
  type ComponentPropsWithoutRef,
  type FormEvent,
  type ForwardedRef,
  forwardRef,
  type PropsWithoutRef,
  type ReactNode,
  type RefAttributes,
  useLayoutEffect,
  useRef,
} from 'react';

import { composeFunctions } from '@/shared/lib/compose-functions';
import { composeRefs } from '@/shared/lib/compose-refs';
import { resolveChildren } from '@/shared/lib/resolve-children';
import { useBoolean } from '@/shared/lib/use-boolean';
import type { PropsWithRenderProps } from '@/shared/types/compound';

type ValidationAttributes<T> = { validation: (formValue: T) => boolean };

type UncontrolledFormProps<T = Record<string, FormDataEntryValue>> = PropsWithRenderProps<
  PropsWithoutRef<
    {
      mode?: 'onSubmit' | 'onChange';
      preventDefault?: boolean;
      onValidSubmit?: (formData: T, e: FormEvent<HTMLFormElement>) => void;
      onInvalidSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    } & ComponentPropsWithoutRef<'form'>
  > &
    RefAttributes<HTMLFormElement>,
  { isValid: boolean }
>;

type UncontrolledForm = {
  <T>(
    props: UncontrolledFormProps<T> & ValidationAttributes<T>,
    forwardedRef?: ForwardedRef<HTMLFormElement>,
  ): ReactNode;
  (props: UncontrolledFormProps, forwardedRef?: ForwardedRef<HTMLFormElement>): ReactNode;
};

// eslint-disable-next-line comma-spacing
const _UncontrolledForm = <T,>(
  props: UncontrolledFormProps<T> & Partial<ValidationAttributes<T>>,
  forwardedRef?: ForwardedRef<HTMLFormElement>,
) => {
  const {
    mode = 'onSubmit',
    preventDefault = true,
    children,
    validation,
    onValidSubmit,
    onInvalidSubmit,
    onSubmit,
    onChange,
    ...restProps
  } = props;

  const formRef = useRef<HTMLFormElement>(null);
  const { value: isValid, setValue: setIsValid } = useBoolean(Boolean(validation));

  const validateFormValue = (form?: HTMLFormElement) => {
    const formValue = Object.fromEntries(new FormData(form ?? formRef.current!));
    const isValid = !validation || validation(formValue as T);

    return { isValid, formValue };
  };

  const validateSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (preventDefault) e.preventDefault();

    const { isValid, formValue } = validateFormValue();

    isValid ? onValidSubmit?.(formValue as T, e) : onInvalidSubmit?.(e);

    setIsValid(isValid);
  };

  const validateChange = (e: FormEvent<HTMLFormElement>) => {
    if (mode === 'onChange') {
      setIsValid(validateFormValue(e.currentTarget).isValid);
    }
  };

  useLayoutEffect(() => {
    setIsValid(validateFormValue().isValid);
  }, []);

  return (
    <form
      {...restProps}
      ref={composeRefs(formRef, forwardedRef)}
      onSubmit={composeFunctions(validateSubmit, onSubmit)}
      onChange={composeFunctions(validateChange, onChange)}
    >
      {resolveChildren(children, { isValid })}
    </form>
  );
};

const UncontrolledForm = forwardRef(_UncontrolledForm) as UncontrolledForm;

export { UncontrolledForm };

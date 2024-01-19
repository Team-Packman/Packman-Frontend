import { ComponentPropsWithoutRef, PropsWithChildren, ReactNode } from 'react';

import * as Styled from './Button.styles';
import { ButtonSize, ButtonType } from './Button.types';

type ButtonProps = {
  variant?: ButtonType;
  size?: ButtonSize;
  icon?: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { variant = 'primary', size = 'auto', icon, children, ...restProps } = props;

  return (
    <Styled.Button type="button" variant={variant} size={size} {...restProps}>
      {icon}
      {children}
    </Styled.Button>
  );
};

export default Button;

import styled from '@emotion/styled';
import type { ComponentPropsWithoutRef } from 'react';

import ArrowBackIcon from '@/shared/assets/images/svg/arrow-back-icon.svg';
import { calcZIndex } from '@/shared/lib/calc-z-Index';
import { composeFunctions } from '@/shared/lib/compose-functions';
import { useRouter } from '@/shared/lib/use-router';

const Layout = styled.button`
  position: relative;
  z-index: ${calcZIndex(10000)};
`;

type BackArrowProps = {
  disableRouting?: boolean;
} & ComponentPropsWithoutRef<'button'>;

const BackArrow = (props: BackArrowProps) => {
  const { disableRouting = false, ...restProps } = props;

  const router = useRouter();

  return (
    <Layout
      {...restProps}
      type="button"
      onClick={disableRouting ? props.onClick : composeFunctions(router.back, props.onClick)}
    >
      <img src={ArrowBackIcon} alt="뒤로 가기 버튼" width={24} height={24} />
    </Layout>
  );
};

export { BackArrow };

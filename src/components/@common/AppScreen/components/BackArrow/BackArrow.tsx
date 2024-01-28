import styled from '@emotion/styled';
import type { ComponentPropsWithoutRef } from 'react';

import ArrowBackIcon from '@/assets/images/svg/arrow_back_icon.svg';
import { useRouter } from '@/hooks/@common/useRouter';
import { calcZIndex } from '@/utils/calcZIndex';
import { composeFunctions } from '@/utils/composeFunctions';

const Layout = styled.button`
  position: relative;
  z-index: ${calcZIndex(10000)};
`;

const BackArrow = (props: ComponentPropsWithoutRef<'button'>) => {
  const router = useRouter();

  return (
    <Layout type="button" {...props} onClick={composeFunctions(router.back, props.onClick)}>
      <img src={ArrowBackIcon} alt="뒤로 가기 버튼" width={24} height={24} />
    </Layout>
  );
};

export default BackArrow;

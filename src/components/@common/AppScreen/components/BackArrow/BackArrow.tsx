import styled from '@emotion/styled';

import ArrowBackIcon from '@/assets/images/svg/arrow_back_icon.svg';
import { useRouter } from '@/hooks/@common/useRouter';
import { calcZIndex } from '@/utils/calcZIndex';

const Layout = styled.button`
  position: relative;
  z-index: ${calcZIndex(10000)};
`;

const BackArrow = () => {
  const router = useRouter();

  return (
    <Layout type="button" onClick={router.back}>
      <img src={ArrowBackIcon} alt="뒤로 가기 버튼" width={24} height={24} />
    </Layout>
  );
};

export default BackArrow;

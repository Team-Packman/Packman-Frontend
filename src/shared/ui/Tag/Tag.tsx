import styled from '@emotion/styled';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type TagProps = ComponentPropsWithoutRef<'span'>;

const Layout = styled.span`
  width: fit-content;
  padding: 0.2rem 0.8rem;

  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.pmPink};
  ${({ theme }) => theme.typo.body1}
  border-radius: 12px;
`;

const Tag = (props: PropsWithChildren<TagProps>) => <Layout {...props} />;

export default Tag;

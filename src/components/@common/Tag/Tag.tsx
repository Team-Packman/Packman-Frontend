import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import * as Styled from './Tag.styles';

type TagProps = ComponentPropsWithoutRef<'span'>;

const Tag = (props: PropsWithChildren<TagProps>) => <Styled.Layout {...props} />;

export default Tag;

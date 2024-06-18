import type { ComponentPropsWithoutRef } from 'react';

import ExchangeIcon from '@/shared/assets/images/svg/exchange-icon.svg';
import MemberIcon from '@/shared/assets/images/svg/member-icon.svg';

type IconProps = ComponentPropsWithoutRef<'img'>;

const Exchange = (props: IconProps) => <img src={ExchangeIcon} alt="토글 아이콘" {...props} />;

const Member = (props: IconProps) => <img src={MemberIcon} alt="멤버 아이콘" {...props} />;

const Icon = { Exchange, Member };

export { Icon };

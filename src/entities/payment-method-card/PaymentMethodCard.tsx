import React, { useEffect, useState } from 'react';
import s from './PaymentMethodCard.module.scss';
import clsx from 'clsx';
import { PaymentT } from '@/shared/api/payment-methods/types';
import Image from 'next/image';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import Cookies from 'js-cookie';

export const PaymentMethodCard = ({
  name,
  image,
  active,
  onClick,
}: PaymentT & { onClick: () => void; active: boolean }) => {
  const [variant, setVariant] = useState<string | undefined>(undefined);

  useEffect(() => {
    const cookieVariant = Cookies.get('variant');
    setVariant(cookieVariant);
  }, []);

  return (
    <button type="button" className={clsx(s.container, active && s.active)} onClick={onClick}>
      <div className={s.icon}>
        <Image src={`${getStoreBaseUrl(variant)}/${image}`} fill alt="icon" />
      </div>
      <h6 className="h6">{name}</h6>
    </button>
  );
};

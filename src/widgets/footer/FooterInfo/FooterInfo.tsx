'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MasterCardIcon, VisaIcon } from '@/shared/assets';
import Link from 'next/link';
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint';
import s from './FooterInfo.module.scss';
import belcardPassword from '@/shared/assets/images/belcard-password.png';
import belcard from '@/shared/assets/images/belcard.png';
import bePaid from '@/shared/assets/images/be-paid.png';
import mtbBank from '@/shared/assets/images/mtb-bank.png';
import visaSecure from '@/shared/assets/images/visa-secure.png';

export const FooterInfo = () => {
  const { isMobile } = useBreakpoint();
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <div className={s.container}>
      <p className="body_7">
        ⓒ {new Date().getFullYear()} {url.split('/')[2]}
      </p>
      <div className={s.paymentMethod}>
        <MasterCardIcon width={!isMobile ? 35 : 26} height={!isMobile ? 21 : 16} />
        <Image
          src={belcardPassword}
          width={!isMobile ? 56 : 41}
          height={!isMobile ? 22 : 16}
          alt="belcard"
        />
        <Image
          src={belcard}
          width={!isMobile ? 24 : 17}
          height={!isMobile ? 26 : 19}
          alt="belcard"
        />
        <VisaIcon width={!isMobile ? 36 : 27} height={!isMobile ? 11 : 8} />
        <Image
          src={visaSecure}
          width={!isMobile ? 33 : 24}
          height={!isMobile ? 32 : 24}
          alt="visa secure"
          style={{ objectFit: 'cover' }}
        />
        <Image src={bePaid} width={!isMobile ? 45 : 33} height={!isMobile ? 22 : 16} alt="bePaid" />
        <Image
          src={mtbBank}
          width={!isMobile ? 54 : 40}
          height={!isMobile ? 22 : 16}
          alt="MTB Bank"
        />
      </div>
      <div className={s.productBy}>
        <p className="body_7">Дизайн и разработка: </p>
        <Link href={'https://web-space.by/'} className="body_7" target="_blank">
          Web-space.by
        </Link>
      </div>
    </div>
  );
};

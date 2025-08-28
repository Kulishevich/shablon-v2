import { TelegramIcon, ViberIcon, WhatsAppIcon } from '@/shared/assets';
import React from 'react';
import s from './SocialMedia.module.scss';
import Link from 'next/link';
import clsx from 'clsx';

export const SocialMedia = ({
  className,
  telegram,
  whatsapp,
  viber,
}: {
  className?: string;
  telegram?: string | null;
  whatsapp?: string | null;
  viber?: string | null;
}) => {
  const formatPhoneNumber = (number: string) => number.replace(/\D/g, '');

  return (
    <div className={clsx(s.container, className)}>
      {viber && (
        <Link
          href={`viber://chat?number=${formatPhoneNumber(viber)}`}
          target="_blank"
          aria-label="Связаться с нами в Viber"
        >
          <ViberIcon />
        </Link>
      )}
      {telegram && (
        <Link
          href={`https://t.me/${telegram}`}
          target="_blank"
          aria-label="Связаться с нами в Telegram"
        >
          <TelegramIcon />
        </Link>
      )}
      {whatsapp && (
        <Link
          href={`https://wa.me/${formatPhoneNumber(whatsapp)}`}
          target="_blank"
          aria-label="Связаться с нами в WhatsApp"
        >
          <WhatsAppIcon />
        </Link>
      )}
    </div>
  );
};

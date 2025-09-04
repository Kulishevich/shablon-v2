'use client';
import { Collapse } from '@/shared/ui/collapse';
import s from './DeliverySection.module.scss';
import { PaymentAndDeliveryT } from '@/shared/api/delivery-and-payment/types';
import { YandexMap } from '@/shared/ui/yandex-map/YandexMap';
import { ContactsT } from '@/shared/api/design/types';
import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

export const DeliverySection = ({
  content,
  contacts,
}: {
  content: PaymentAndDeliveryT[] | null;
  contacts: ContactsT | null;
}) => {
  const [activeContent, setActiveContent] = useState<PaymentAndDeliveryT | null>(
    content?.[0] || null
  );

  return (
    <div className={s.wrapper}>
      <h1 className="h1">Доставка и оплата</h1>

      <div className={s.container}>
        <div className={s.firstBlock}>
          <div className={s.navigation}>
            {content?.map((nav) => (
              <button
                onClick={() => setActiveContent(nav)}
                className={clsx('button', s.navBtn, activeContent?.id === nav.id && s.active)}
              >
                {nav.title}
              </button>
            ))}
          </div>

          <div className={clsx(s.imageContainer, 'desktop-only')}>
            <Image src={'/delivery-image.png'} fill alt="delivery-image" />
          </div>
        </div>

        <div className={s.secondBlock}>
          <p className="h2">{activeContent?.title}</p>

          <div
            className={s.content}
            dangerouslySetInnerHTML={{ __html: activeContent?.content || '' }}
          />

          {contacts?.address && (
            <>
              <YandexMap address={contacts?.address} className={s.map} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

'use client';
import { Collapse } from '@/shared/ui/collapse';
import s from './DeliverySection.module.scss';
import { PaymentAndDeliveryT } from '@/shared/api/delivery-and-payment/types';
import { YandexMap } from '@/shared/ui/yandex-map/YandexMap';
import clsx from 'clsx';
import { ContactsT } from '@/shared/api/design/types';

export const DeliverySection = ({
  content,
  contacts,
}: {
  content: PaymentAndDeliveryT[] | null;
  contacts: ContactsT | null;
}) => {
  return (
    <div className={s.wrapper}>
      <h1 className="h1">Доставка и оплата</h1>
      {content?.map((item, index) => (
        <Collapse title={item.title} key={item.id} initialOpen={index === 0}>
          <div className={s.container} dangerouslySetInnerHTML={{ __html: item.content }} />
          {contacts?.address && (
            <>
              <YandexMap address={contacts?.address} className={s.map} />
            </>
          )}
        </Collapse>
      ))}
    </div>
  );
};

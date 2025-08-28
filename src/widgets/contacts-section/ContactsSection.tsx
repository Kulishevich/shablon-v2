import React from 'react';
import s from './ContactsSection.module.scss';
import { YandexMap } from '@/shared/ui/yandex-map/YandexMap';
import { SocialMedia } from '@/entities/social-media';
import { ContactsT } from '@/shared/api/design/types';
import Link from 'next/link';
import clsx from 'clsx';
import Script from 'next/script';

const formatPhoneNumber = (number: string) => number.replace(/\D/g, '');

const mapSocialLinks = (socialLinks: ContactsT['social_links']) => {
  const socialMedia = [];

  if (socialLinks.telegram) {
    socialMedia.push({ '@type': 'Telegram', url: `https://t.me/${socialLinks.telegram}` });
  }

  if (socialLinks.whatsapp) {
    socialMedia.push({
      '@type': 'WhatsApp',
      url: `https://wa.me/${formatPhoneNumber(socialLinks.whatsapp)}`,
    });
  }

  if (socialLinks.viber) {
    socialMedia.push({
      '@type': 'Viber',
      url: `viber://chat?number=${formatPhoneNumber(socialLinks.viber)}`,
    });
  }

  return socialMedia;
};

export const ContactsSection = ({
  contacts,
  isMain = false,
}: {
  contacts: ContactsT | null;
  isMain?: boolean;
}) => {
  return (
    <div className={clsx(s.container, !isMain && s.standalone)}>
      {isMain ? <h2 className="h2">Контакты компании</h2> : <h1 className="h1">Контакты</h1>}
      <div className={s.content}>
        <Script id="contacts-schema" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: contacts?.company_info,
            description: contacts?.company_description,
            address: {
              '@type': 'PostalAddress',
              addressLocality: contacts?.address,
              streetAddress: contacts?.address,
            },
            email: contacts?.email,
            telephone: contacts?.phones,
            workingHours: contacts?.working_hours,
            socialMedia: contacts?.social_links ? mapSocialLinks(contacts.social_links) : [],
          })}
        </Script>
        <div className={s.inner}>
          <div className={s.info}>
            <div className={s.elem}>
              <div className="h3">Адрес</div>
              <p className="body_2">
                <span>{contacts?.address}</span>
              </p>
            </div>

            <div className={s.elem}>
              <div className="h3">Телефон для связи</div>
              <div className={s.phones}>
                {contacts?.phones.map((phone, index) => (
                  <Link href={`tel:${phone}`} key={index} className="body_2">
                    {phone}
                  </Link>
                ))}
              </div>
            </div>

            <>
              <div className={s.elem}>
                <div className="h3">Email</div>
                <Link href={`mailto:${contacts?.email}`} className="body_2">
                  {contacts?.email}
                </Link>
              </div>
              <div className={s.elem}>
                <div className="h3">Режим работы</div>
                <p className="body_2">{contacts?.working_hours}</p>
              </div>
              <div className={s.elem}>
                <div className="h3">Мессенджеры</div>
                <SocialMedia {...contacts?.social_links} />
              </div>
            </>
          </div>
        </div>

        {contacts?.address && (
          <>
            <YandexMap
              coordinatesOffset={[-0.006, 0]}
              address={contacts?.address}
              className={clsx(s.map, s.map_desktop, { [s.main]: isMain })}
            />
            <YandexMap
              address={contacts?.address}
              className={clsx(s.map, s.map_mobile, { [s.main]: isMain })}
            />
          </>
        )}
      </div>
    </div>
  );
};

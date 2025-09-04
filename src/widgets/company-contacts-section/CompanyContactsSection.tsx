import React from 'react';
import s from './styles.module.scss';
import Script from 'next/script';
import { ContactsT } from '@/shared/api/design/types';
import { LocationArrowIcon, MailIcon, SecondPhoneIcon, TimeIcon } from '@/shared/assets';
import Link from 'next/link';
import { SocialMedia } from '@/entities/social-media';
import { YandexMap } from '@/shared/ui/yandex-map/YandexMap';
import clsx from 'clsx';

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

interface CompanyContactsSectionProps {
  contacts: ContactsT | null;
  isMain?: boolean;
}

export const CompanyContactsSection = ({
  contacts,
  isMain = false,
}: CompanyContactsSectionProps) => {
  return (
    <div className={s.content}>
      <h2 className={clsx('h2', s.title, { [s.main]: isMain })}>
        {isMain ? 'Контакты компании' : 'Адрес и контакты'}{' '}
      </h2>

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

      <div className={clsx(s.info, { [s.main]: isMain })}>
        <div className={clsx(s.elem, { [s.main]: isMain })}>
          <div className={s.elem__iconContainer}>
            <LocationArrowIcon />
          </div>
          <p className="body_5">
            <span>{contacts?.address}</span>
          </p>
        </div>

        <div className={clsx(s.elem, { [s.main]: isMain })}>
          <div className={s.elem__iconContainer}>
            <MailIcon />
          </div>

          <div className={s.phones}>
            {contacts?.phones.map((phone, index) => (
              <Link href={`tel:${phone}`} key={index} className="body_5">
                {phone}
              </Link>
            ))}
          </div>
        </div>

        <div className={clsx(s.elem, { [s.main]: isMain })}>
          <div className={s.elem__iconContainer}>
            <SecondPhoneIcon />
          </div>

          <Link href={`mailto:${contacts?.email}`} className="body_5">
            {contacts?.email}
          </Link>
        </div>

        <div className={clsx(s.elem, { [s.main]: isMain })}>
          <div className={s.elem__iconContainer}>
            <TimeIcon />
          </div>

          <p className="body_5">{contacts?.working_hours}</p>
        </div>
        <SocialMedia
          {...contacts?.social_links}
          className={clsx('desktop-only', { 'mobile-only': isMain })}
        />
      </div>

      {contacts?.address && (
        <YandexMap
          coordinatesOffset={[-0.006, 0]}
          address={contacts?.address}
          className={clsx(s.map, { [s.main]: isMain })}
        />
      )}
    </div>
  );
};

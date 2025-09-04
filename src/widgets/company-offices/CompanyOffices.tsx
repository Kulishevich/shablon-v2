import React from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import { LocationArrowIcon, MailIcon, SecondPhoneIcon, TimeIcon } from '@/shared/assets';

const mockOffices = [
  {
    id: '1',
    image: '/delivery-image.png',
    city: 'г. Брест',
    address: 'ул. Советская, 25, офис 18',
    phone: '+375 (99) 999-99-99',
    email: 'info@mail.by',
    workTime: 'с 08:00 до 22:00 ежедневно',
  },
  {
    id: '2',
    image: '/delivery-image.png',
    city: 'г. Брест',
    address: 'ул. Советская, 25, офис 18',
    phone: '+375 (99) 999-99-99',
    email: 'info@mail.by',
    workTime: 'с 08:00 до 22:00 ежедневно',
  },
  {
    id: '3',
    image: '/delivery-image.png',
    city: 'г. Брест',
    address: 'ул. Советская, 25, офис 18',
    phone: '+375 (99) 999-99-99',
    email: 'info@mail.by',
    workTime: 'с 08:00 до 22:00 ежедневно',
  },
];

export const CompanyOffices = () => {
  return (
    <div className={s.container}>
      <h2 className={clsx('h2')}>Офисы компании</h2>
      <div className={s.cardsList}>
        {mockOffices.map((item) => (
          <div className={s.card}>
            <div className={s.card__imageContainer}>
              <Image src={item.image} fill alt="office-image" />
            </div>
            <div className={s.card__content}>
              <p className={clsx('h3', s.card__city)}>{item.city}</p>

              <div className={s.card__contentWrapper}>
                <div className={s.card__infoContainer}>
                  <p className={clsx('body_7', s.card__info)}>
                    <LocationArrowIcon />
                    {item.address}
                  </p>
                  <p className={clsx('body_7', s.card__info)}>
                    <MailIcon />
                    {item.email}
                  </p>
                  <p className={clsx('body_7', s.card__info)}>
                    <SecondPhoneIcon />
                    {item.phone}
                  </p>
                  <p className={clsx('body_7', s.card__info)}>
                    <TimeIcon />
                    {item.workTime}
                  </p>
                </div>

                <p className={clsx(s.card__button, 'button')}>Показать на карте</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

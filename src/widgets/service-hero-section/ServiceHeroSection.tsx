import React from 'react';
import s from './ServiceHeroSection.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { ServiceOrderPopup } from '../service-order-popup/ServiceOrderPopup';

export const ServiceHeroSection = ({
  image,
  price,
  discount,
}: {
  image: string;
  price: string;
  discount: string | null;
}) => {
  return (
    <section className={clsx(s.container)}>
      <div className={s.imageContainer}>
        <Image src={image} alt="service-hero" fill />
      </div>
      <div className={s.content}>
        <div className={s.price}>
          <p className={clsx('h3', s.priceValue)}>от {discount || price} BYN</p>
          {discount && <p className={clsx('body_4', s.priceDiscount)}>{price} BYN</p>}
        </div>
        <ServiceOrderPopup service="service-1">
          <Button variant="primary">Заказать услугу</Button>
        </ServiceOrderPopup>
      </div>
    </section>
  );
};

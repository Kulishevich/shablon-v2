'use client';
import Image from 'next/image';
import s from './EmptyCart.module.scss';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import clsx from 'clsx';

export const EmptyCart = () => {
  return (
    <div className={s.container}>
      <Image src={'/empty.png'} alt="Корзина пуста" width={120} height={120} />
      <h2 className={clsx('h2', s.title)}>В корзине ничего нет...</h2>
      <p className="body_1">Добавьте интересующие вас товары в корзину, перейдя в каталог.</p>
      <Button as={Link} href={paths.catalog} className={s.button}>
        Перейти в каталог
      </Button>
    </div>
  );
};

'use client';
import React, { ReactNode, useRef } from 'react';
import s from './Slider.module.scss';
import { Button } from '../button';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/assets';
import clsx from 'clsx';

type SliderProps = {
  children: ReactNode;
  itemWidth: number;
  itemsCount: number;
  containerClassName?: string;
  [key: string]: any;
};

export const Slider = ({
  children,
  itemWidth,
  itemsCount,
  containerClassName,
  ...props
}: SliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = itemWidth;

    if (direction === 'right') {
      container.scrollLeft += scrollAmount;
    } else {
      container.scrollLeft -= scrollAmount;
    }
  };

  return (
    <div className={clsx(s.container, containerClassName)}>
      {itemsCount > 2 && (
        <Button
          variant="icon_secondary"
          className={s.iconLeft}
          onClick={() => scroll('left')}
          aria-label="Слайд влево"
        >
          <ArrowLeftIcon />
        </Button>
      )}

      <div className={s.itemsContainer} ref={scrollRef} {...props}>
        {children}
      </div>
      {itemsCount > 2 && (
        <Button
          variant="icon_secondary"
          className={s.iconRight}
          onClick={() => scroll('right')}
          aria-label="Слайд вправо"
        >
          <ArrowRightIcon />
        </Button>
      )}
    </div>
  );
};

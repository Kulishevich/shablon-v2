'use client';
import React, { Dispatch, ReactNode } from 'react';
import s from './SliderWrapper.module.scss';
import { Slider } from '@/shared/ui/slider';
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint';
import clsx from 'clsx';
import { ProductTag } from '@/shared/api/product/types';

interface SliderWrapperProps {
  title?: string;
  children: ReactNode;
  variant?: 'news' | 'product' | 'discount' | 'mini_product';
  className?: string;
  itemsCount: number;
  [key: string]: any;
  tags?: ProductTag[];
  activeTag?: number | null;
  setActiveTag?: Dispatch<React.SetStateAction<number | null>>;
}

export const SliderWrapper = ({
  title,
  children,
  variant,
  className,
  itemsCount,
  tags,
  activeTag,
  setActiveTag,
  ...props
}: SliderWrapperProps) => {
  const { isMobile } = useBreakpoint();

  const itemWidth = () => {
    switch (variant) {
      case 'product':
        return 330;
      case 'mini_product':
        return !isMobile ? 220 : 117;
      case 'news':
        return !isMobile ? 330 : 174;
      case 'discount':
        return !isMobile ? 440 : 350;
    }
    return 330;
  };

  return (
    <div className={clsx(s.container, className)}>
      {title && <h2 className="h2">{title}</h2>}
      {activeTag !== undefined && setActiveTag && tags && (
        <div className={s.tags}>
          <button className={clsx(s.tagBtn, 'button')} onClick={() => setActiveTag(null)}>
            Все
          </button>
          {tags.map((tag) => (
            <button
              className={clsx(s.tagBtn, 'button', activeTag === tag.id && s.activeTag)}
              key={tag.id}
              onClick={() => setActiveTag(tag.id)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
      <Slider
        containerClassName={className}
        itemWidth={itemWidth()}
        itemsCount={itemsCount}
        {...props}
      >
        {children}
      </Slider>
    </div>
  );
};

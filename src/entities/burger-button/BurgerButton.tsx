'use client';
import { Button } from '@/shared/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import s from './BurgerButton.module.scss';
import { NavigationPopup } from '../navigation-popup';
import { BurgerIcon } from '@/shared/assets';
import { CategoryT } from '@/shared/api/category/types';
import { paths } from '@/shared/config/constants/paths';

export const BurgerButton = ({
  categories,
  variant,
  containerRef,
}: {
  categories: CategoryT[] | null;
  variant: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [isOpenNavigation, setIsOpenNavigation] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleOpenCatalog = () => {
    setIsOpenNavigation(true);
  };

  const handleCloseCatalog = () => {
    setIsOpenNavigation(false);
  };

  useEffect(() => {
    const container = containerRef?.current;
    const button = buttonRef.current;

    if (!container || !button) return;

    button.addEventListener('mouseenter', handleOpenCatalog);
    container.addEventListener('mouseleave', handleCloseCatalog);

    return () => {
      button.removeEventListener('mouseenter', handleOpenCatalog);
      container.removeEventListener('mouseleave', handleCloseCatalog);
    };
  }, []);

  return (
    <div className={s.burgerMenu} ref={buttonRef}>
      <Button variant="burger" as="a" href={paths.catalog}>
        <BurgerIcon />
        Каталог
      </Button>
      {isOpenNavigation && <NavigationPopup categories={categories} variant={variant} />}
    </div>
  );
};

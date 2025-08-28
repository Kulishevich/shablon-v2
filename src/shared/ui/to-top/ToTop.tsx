'use client';
import { useEffect, useState } from 'react';
import s from './ToTop.module.scss';
import ArrowToTop from '@/shared/assets/ArrowToTop';
import clsx from 'clsx';

export const ToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition >= windowHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className={clsx(s.button, isVisible && s.visible)} onClick={handleClick}>
      <ArrowToTop />
      Наверх
    </button>
  );
};

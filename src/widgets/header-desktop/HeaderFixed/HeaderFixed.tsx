'use client';
import { useState, useEffect } from 'react';
import { Navigation } from '../Navigation/Navigation';
import { Search } from '../Search/Search';
import s from './HeaderFixed.module.scss';
import { CategoryT } from '@/shared/api/category/types';
import { ContactsT } from '@/shared/api/design/types';
import clsx from 'clsx';
import { ArrowRightIcon } from '@/shared/assets';
import { motion as m } from 'framer-motion';

export const HeaderFixed = ({
  categories,
  contacts,
}: {
  categories: CategoryT[];
  contacts: ContactsT | null;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const headerDesktop = document.querySelector('[data-header-desktop]');

    if (!headerDesktop) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Фиксированный хедер показывается когда основной хедер не виден
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    );

    observer.observe(headerDesktop);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <m.div
      className={clsx(s.container, !isVisible && s.hidden)}
      initial={{ height: 0 }}
      animate={{ height: isOpen ? 'auto' : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className={clsx(s.inner, isOpen && s.open)}>
        <Navigation phones={contacts?.phones || []} variant={'default'} />
        <Search categories={categories} variant="default" />
      </div>

      <button className={s.button} onClick={handleToggle} aria-label="Открыть/закрыть меню">
        <ArrowRightIcon style={{ transform: isOpen ? 'rotate(-90deg)' : 'rotate(90deg)' }} />
      </button>
    </m.div>
  );
};

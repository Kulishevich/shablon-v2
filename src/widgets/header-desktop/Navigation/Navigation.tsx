'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { LocationArrowIcon, PercentIcon, ProfileIcon } from '@/shared/assets';
import { navigation } from '@/shared/config/constants/navigation';
import s from './Navigation.module.scss';
import { paths } from '@/shared/config/constants/paths';
import clsx from 'clsx';
import { DefaultSelect } from '@/shared/ui/default-select';

interface NavigationProps {
  phones?: string[];
  variant: 'home' | 'default';
}

export const Navigation = ({ phones, variant }: NavigationProps) => {
  const [selectedCountry, setSelectedCountry] = useState({
    id: 0,
    value: phones?.[0] || '',
  });

  const options =
    phones?.map((elem, index) => ({
      id: index,
      value: elem,
    })) || [];

  return (
    <div className={clsx(s.container, s[variant])}>
      <div className={s.content}>
        <div className={clsx(s.location, s[variant])}>
          <LocationArrowIcon />
          <p>Минск и Минская область</p>
        </div>

        <nav className={s.navigation}>
          <ul className={clsx(s.navList, s[variant])}>
            {navigation.slice(0, 6).map((nav, index) => (
              <li key={index}>
                <Link className="body_4" href={nav.path}>
                  {nav.title === 'Акции' && <PercentIcon />}
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={clsx(s.phone, s[variant])}>
          <Link
            href={`tel:${selectedCountry.value
              .replace(/\s/g, '')
              .replace(/–/g, '')
              .replace(/-/g, '')
              .replace(/\(/g, '')
              .replace(/\)/g, '')}`}
            className="body_4"
          >
            {selectedCountry.value}
          </Link>
          <DefaultSelect
            selected={selectedCountry}
            onSelect={setSelectedCountry}
            options={options}
            className={clsx(s.select, s[variant])}
          />
        </div>

        <Link href={paths.profile} className={clsx(s.profileLink, 'body_7', s[variant])}>
          <ProfileIcon />
          Личный кабинет
        </Link>
      </div>
    </div>
  );
};

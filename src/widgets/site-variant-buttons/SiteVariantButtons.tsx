'use client';
import React from 'react';
import s from './SiteVariantButtons.module.scss';

import { CollapseSettings } from '@/shared/ui/collapse-settings';

export const SiteVariantButtons = () => {
  return (
    <div className={s.container}>
      <CollapseSettings />
    </div>
  );
};

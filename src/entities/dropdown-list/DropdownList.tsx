'use client';
import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowDownIcon } from '@/shared/assets';
import clsx from 'clsx';
import s from './DropdownList.module.scss';

export interface DropdownItem {
  title: string;
  href: string;
}

export interface DropdownListProps {
  title: string;
  items: DropdownItem[];
  className?: string;
  defaultOpen?: boolean;
}

export const DropdownList = ({
  title,
  items,
  className,
  defaultOpen = false,
}: DropdownListProps) => {
  const [open, setOpen] = useState(defaultOpen);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={handleOpenChange}
      className={clsx(s.rootState, className)}
    >
      <div className={s.triggerContainer}>
        <div className={clsx(s.title, 'h6')}>{title}</div>
        <Collapsible.Trigger className={s.trigger}>
          <ArrowDownIcon />
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content className={s.wrapper}>
        <div className={s.content}>
          {items.map((item, index) => (
            <Link key={index} href={item.href} className={clsx(s.itemLink, 'body-4')}>
              {item.title}
            </Link>
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

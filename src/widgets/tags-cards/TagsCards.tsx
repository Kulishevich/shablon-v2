'use client';
import { TagT } from '@/shared/api/tags';
import React from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { Button } from '@/shared/ui/button';
import clsx from 'clsx';

interface ITagsCardsProps {
  tags: TagT[] | null;
  variant?: string;
}

export const TagsCards = ({ tags, variant }: ITagsCardsProps) => {
  console.log(tags);
  return (
    <div className={s.container}>
      {tags?.map((tag) => (
        <div key={tag.id} className={s.tag}>
          <Image src={`${getStoreBaseUrl(variant)}/${tag.photo_path}`} fill alt="tag-image" />
          <div className={s.background} />

          <div className={s.content}>
            <p className="h3">{tag.name}</p>
            <button className={clsx(s.catalogLink, 'button')}>В каталог</button>
          </div>
        </div>
      ))}
    </div>
  );
};

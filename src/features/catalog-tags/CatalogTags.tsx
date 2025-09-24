'use client';
import React from 'react';
import s from './CatalogTags.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { TagT } from '@/shared/api/tags/types';
import clsx from 'clsx';

export const CatalogTags = ({ tags }: { tags: TagT[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTagName = searchParams.get('tags');

  const handleChange = (tagName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', '1');

    if (tagName !== activeTagName) {
      params.set('tags', tagName);
    } else {
      params.delete('tags');
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={s.container}>
      {tags.map((tag) => (
        <span
          key={tag.id}
          className={clsx(s.tag, 'body_6', { [s.active]: tag.name === activeTagName })}
          onClick={() => handleChange(tag.name)}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

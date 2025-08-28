'use client';
import cn, { clsx } from 'clsx';
import s from './Breadcrumbs.module.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowRightIcon } from '@/shared/assets';
import { navigation } from '@/shared/config/constants/navigation';

interface Props {
  className?: string;
  dynamicPath?: { title: string; path: string }[];
}

export const Breadcrumbs = ({ className, dynamicPath }: Props) => {
  const pathname = usePathname();
  const pathNames = pathname.split('/');

  function handlePathName(path: string) {
    return navigation.find((elem) => path === elem.path.replace('/', ''));
  }

  const pathArr = [
    ...pathNames.map((elem) => handlePathName(elem)),
    ...(dynamicPath ? [...dynamicPath] : []),
  ].filter((elem) => !!elem);

  return (
    <ul
      className={clsx(s.container, className)}
      itemScope
      itemType="http://schema.org/BreadcrumbList"
    >
      {pathArr?.map((path, idx) => {
        const lastItem = idx === pathArr.length - 1;
        const href = pathArr
          .slice(1, idx + 1)
          .map((elem) => elem.path)
          .join('');

        if (lastItem) {
          return (
            <li
              key={idx}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <a className={cn(s.elem, 'body_6_bold')} itemProp="item">
                <span itemProp="name">{path?.title}</span>
              </a>
              <meta itemProp="position" content={(idx + 1).toString()} />
            </li>
          );
        }

        return (
          <li itemProp="itemListElement" key={idx} itemScope itemType="https://schema.org/ListItem">
            <Link href={href || '/'} className={cn(s.elem, 'body_6')} itemProp="item">
              <span itemProp="name">{path?.title}</span>
              <ArrowRightIcon className={s.icon} />
              <meta itemProp="position" content={(idx + 1).toString()} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

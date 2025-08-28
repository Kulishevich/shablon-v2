'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPaginationPages } from '@/shared/lib/utils/getPaginationPages';
import cn from 'clsx';
import { ArrowLeftIcon, ArrowRightIcon } from '../../assets';
import s from './Pagination.module.scss';

interface Props {
  totalPages: number;
  currentPage?: string;
}

export const Pagination = ({ totalPages, currentPage = '1' }: Props) => {
  const [paginationPages, setPaginationPages] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPageNumber = +currentPage;
  const totalPagesNumber = +totalPages;

  function handlePageChange(page: number) {
    return () => {
      const params = new URLSearchParams(searchParams);

      params.set('page', page.toString());

      const url = `${pathname}?${params.toString()}`;
      router.push(url, { scroll: false });
    };
  }

  useEffect(() => {
    const pages = getPaginationPages({
      currentPage: currentPageNumber,
      totalPages: totalPagesNumber,
    });

    setPaginationPages(pages);
  }, [currentPageNumber, totalPagesNumber]);

  if (totalPagesNumber < 2) {
    return <></>;
  }

  return (
    <div className={s.container}>
      {currentPageNumber !== 1 && (
        <button
          className={s.button}
          onClick={handlePageChange(currentPageNumber - 1)}
          disabled={currentPageNumber === 1}
        >
          <ArrowLeftIcon />
        </button>
      )}
      <div className={s.pagination}>
        {paginationPages.map((page) => {
          const isActive = currentPageNumber == page;

          return (
            <button
              key={page}
              className={cn(isActive && s.active, s.paginationElem, 'h4')}
              onClick={handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
      {currentPageNumber !== totalPagesNumber && (
        <button className={s.button} onClick={handlePageChange(currentPageNumber + 1)}>
          <ArrowRightIcon />
        </button>
      )}
    </div>
  );
};

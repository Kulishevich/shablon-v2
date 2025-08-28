'use client';
import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowDownIcon } from '@/shared/assets';
import { paths } from '@/shared/config/constants/paths';
import { CategoryT } from '@/shared/api/category/types';
import clsx from 'clsx';
import s from './CategoryTree.module.scss';

interface CategoryTreeItemProps {
  category: CategoryT;
  parentPath?: string;
  onCategoryClick?: (category: CategoryT) => void;
  level?: number;
  currentCategoryPath?: string[];
  isActive?: boolean;
  shouldExpand?: boolean;
}

const CategoryTreeItem = ({
  category,
  parentPath = '',
  onCategoryClick,
  level = 0,
  currentCategoryPath = [],
  isActive = false,
  shouldExpand = false,
}: CategoryTreeItemProps) => {
  const [open, setOpen] = useState(shouldExpand);
  const [manuallyToggled, setManuallyToggled] = useState(false);
  const currentPath = parentPath ? `${parentPath}/${category.slug}` : category.slug;
  const categoryHref = `${paths.catalog}/${currentPath}`;

  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  useEffect(() => {
    if (shouldExpand && !manuallyToggled) {
      setOpen(true);
    } else if (!shouldExpand && !manuallyToggled) {
      setOpen(false);
    }
  }, [shouldExpand, manuallyToggled]);

  const pathString = currentCategoryPath.join('/');
  useEffect(() => {
    setManuallyToggled(false);
  }, [pathString]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    setManuallyToggled(true);
  };

  const handleCategoryClick = () => {
    onCategoryClick?.(category as CategoryT);
  };

  if (!hasSubcategories) {
    return (
      <div className={s.rootState} data-level={level}>
        <div className={s.triggerContainer}>
          <Link
            href={categoryHref}
            className={clsx(s.categoryLink, {
              [s.active]: isActive,
              h6: level === 0,
              'body-4': level !== 1,
            })}
            onClick={handleCategoryClick}
          >
            {category.name}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={handleOpenChange}
      className={s.rootState}
      data-level={level}
    >
      <div className={s.triggerContainer}>
        <Link
          href={categoryHref}
          className={clsx(s.categoryLink, { [s.active]: isActive })}
          onClick={handleCategoryClick}
        >
          {category.name}
        </Link>
        <Collapsible.Trigger className={s.trigger}>
          <ArrowDownIcon />
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content className={s.wrapper}>
        <div className={s.content}>
          {category.subcategories?.map((subcategory, index) => {
            const isSubcategoryActive = currentCategoryPath.includes(subcategory.slug);
            const hasActiveDescendant = (cat: any): boolean => {
              if (currentCategoryPath.includes(cat.slug)) return true;
              return cat.subcategories?.some(hasActiveDescendant) || false;
            };
            const shouldExpandSubcategory = hasActiveDescendant(subcategory as CategoryT);

            return (
              <CategoryTreeItem
                key={index}
                category={subcategory as CategoryT}
                parentPath={currentPath}
                onCategoryClick={onCategoryClick}
                level={level + 1}
                currentCategoryPath={currentCategoryPath}
                isActive={isSubcategoryActive}
                shouldExpand={shouldExpandSubcategory}
              />
            );
          })}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

interface CategoryTreeProps {
  categories: CategoryT[];
  title?: string;
  onCategoryClick?: (category: CategoryT) => void;
  className?: string;
  currentCategory?: CategoryT;
  categoryPath?: CategoryT[];
}

export const CategoryTree = ({
  categories,
  onCategoryClick,
  className,
  currentCategory,
  categoryPath,
}: CategoryTreeProps) => {
  const pathname = usePathname();

  const currentCategoryPath = useMemo(() => {
    if (categoryPath && categoryPath.length > 0) {
      return categoryPath.map((cat) => cat.slug);
    }

    if (pathname.startsWith('/catalog/')) {
      const pathSegments = pathname.replace('/catalog/', '').split('/').filter(Boolean);
      return pathSegments;
    }

    return [];
  }, [pathname, categoryPath]);

  return (
    <div className={`${s.categoryTree} ${className || ''}`}>
      <div className={s.categoriesList}>
        {categories.map((category, index) => {
          const isActive = currentCategoryPath.includes(category.slug);

          // Рекурсивная функция для проверки активных потомков
          const hasActiveDescendant = (cat: any): boolean => {
            if (currentCategoryPath.includes(cat.slug)) return true;
            return cat.subcategories?.some(hasActiveDescendant) || false;
          };

          const shouldExpand = hasActiveDescendant(category);

          return (
            <CategoryTreeItem
              key={index}
              category={category}
              onCategoryClick={onCategoryClick}
              level={0}
              currentCategoryPath={currentCategoryPath}
              isActive={isActive}
              shouldExpand={shouldExpand}
            />
          );
        })}
      </div>
    </div>
  );
};

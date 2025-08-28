'use client';
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import s from './HeaderSearchPopup.module.scss';
import { Button } from '@/shared/ui/button';
import { SearchIcon } from '@/shared/assets';
import { SearchProductCard } from '@/entities/search-product-card';
import { TextField } from '@/shared/ui/text-field';
import Link from 'next/link';
import { CategoryT } from '@/shared/api/category/types';
import { ProductT } from '@/shared/api/product/types';
import { useRouter } from 'next/navigation';
import { searchProducts } from '@/shared/api/product/searchProducts';
import { enrichProductsWithFullPath } from '@/shared/lib/utils/productUtils';
import { paths } from '@/shared/config/constants/paths';
import Cookies from 'js-cookie';

export const HeaderSearchPopup = ({ categories }: { categories: CategoryT[] | null }) => {
  const [variant, setVariant] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState<ProductT[]>([]);
  const [productResult, setProductResult] = useState<ProductT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cookieVariant = Cookies.get('variant');
    setVariant(cookieVariant);
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (searchQuery: string, variant: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          if (!searchQuery.trim() || searchQuery.trim().length < 2) {
            setProducts([]);
            setIsLoading(false);
            return;
          }

          setIsLoading(true);
          try {
            const searchResults = await searchProducts({
              search: searchQuery,
              variant,
              limit: 10,
            });
            setProducts(searchResults || []);
          } catch (error) {
            console.error('Search error:', error);
            setProducts([]);
          } finally {
            setIsLoading(false);
          }
        }, 300); // 300ms debounce
      };
    })(),
    []
  );

  // Effect для поиска продуктов при изменении поискового запроса
  useEffect(() => {
    if (!variant) return;

    if (!searchValue.trim()) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    debouncedSearch(searchValue, variant);
  }, [searchValue, variant, debouncedSearch]);

  // Effect для обогащения продуктов полными путями
  useEffect(() => {
    if (!variant || !products.length) {
      setProductResult([]);
      return;
    }

    const createProductsWithFullPath = async () => {
      try {
        const productsResultWithFullPath = await enrichProductsWithFullPath({
          products,
          variant,
        });
        setProductResult(productsResultWithFullPath);
      } catch (error) {
        console.error('Error enriching products with full path:', error);
        setProductResult(products); // Fallback to original products
      }
    };

    createProductsWithFullPath();
  }, [products, variant]);

  const searchResult = useMemo(
    () => ({
      categories:
        searchValue.length > 0
          ? categories?.filter((category) =>
              category.name.toLowerCase().includes(searchValue.toLowerCase())
            )
          : [],
      products: productResult,
    }),
    [categories, productResult, searchValue]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setIsOpen(false);
      setSearchValue(''); // Очищаем поле после перехода
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div ref={containerRef}>
      <Button variant="icon_secondary" onClick={() => setIsOpen(!isOpen)} aria-label="Поиск">
        <SearchIcon />
      </Button>
      {isOpen && (
        <div className={s.container}>
          <TextField
            variant="search"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Поиск по сайту"
          />
          {((searchResult.categories && searchResult.categories.length > 0) ||
            (searchResult.products && searchResult.products.length > 0)) && (
            <div className={s.content}>
              {searchResult.categories &&
                searchResult.categories.length > 0 &&
                searchValue.length > 0 && (
                  <div className={s.categories}>
                    <h6 className="h6">Поиск по категориям:</h6>
                    {searchResult.categories?.map((category, index) => (
                      <Link
                        className="body_4"
                        key={index}
                        href={`${paths.catalog}/${category.slug}`}
                        onClick={() => {
                          setIsOpen(false);
                          setSearchValue('');
                        }}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              {searchResult.products &&
                searchResult.products.length > 0 &&
                searchValue.length > 0 && (
                  <div className={s.products}>
                    <h6 className="h6">Поиск по товарам:</h6>
                    {searchResult.products?.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setIsOpen(false);
                          setSearchValue('');
                        }}
                      >
                        <SearchProductCard {...product} />
                      </div>
                    ))}
                  </div>
                )}
              {isLoading && searchValue.length > 0 && (
                <div className={s.loading}>
                  <p className="body_4">Поиск...</p>
                </div>
              )}
              {!isLoading &&
                searchValue.length > 0 &&
                searchResult.categories &&
                searchResult.categories.length === 0 &&
                searchResult.products &&
                searchResult.products.length === 0 && (
                  <div className={s.noResults}>
                    <p className="body_4">По вашему запросу ничего не найдено</p>
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

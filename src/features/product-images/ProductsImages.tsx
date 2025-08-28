'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import s from './ProductsImages.module.scss';
import { ProductT } from '@/shared/api/product/types';
import clsx from 'clsx';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import Cookies from 'js-cookie';

export const ProductsImages = ({ product }: { product: ProductT | null }) => {
  const [variant, setVariant] = useState<string | undefined>(undefined);
  const [activeImage, setActiveImage] = useState(product?.main_image.image_path);

  useEffect(() => {
    const cookieVariant = Cookies.get('variant');
    setVariant(cookieVariant);
  }, []);

  return (
    <div className={s.images} itemScope itemType="http://schema.org/ImageGallery">
      <div className={s.miniImages}>
        {product?.images.map((image, index) => (
          <button
            onClick={() => setActiveImage(image.image_path)}
            key={index}
            className={clsx(s.smallImage, {
              [s.active]: activeImage === image.image_path,
            })}
          >
            <Image
              itemProp="image"
              src={`${getStoreBaseUrl(variant)}/${image.image_path}`}
              fill
              alt="product"
            />
          </button>
        ))}
      </div>
      <div className={s.imageContainer}>
        <Image
          itemProp="image"
          src={`${getStoreBaseUrl(variant)}/${activeImage}`}
          fill
          alt="product"
        />
      </div>
    </div>
  );
};

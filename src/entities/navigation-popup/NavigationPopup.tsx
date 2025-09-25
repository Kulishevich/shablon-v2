import { CategoryT } from '@/shared/api/category/types';
import s from './NavigationPopup.module.scss';
import Image from 'next/image';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';

export const NavigationPopup = ({
  categories,
  variant,
}: {
  categories: CategoryT[] | null;
  variant: string;
}) => {
  return (
    <div className={s.content}>
      <div className={s.categoryList}>
        {categories?.map((category, index) => (
          <div className={s.category} key={index}>
            <Image
              src={`${getStoreBaseUrl(variant)}/${category.photo_path}`}
              alt={category.name}
              width={298}
              height={354}
              className={s.image}
            />

            <div className={s.caption}>
              <Link className="h6" href={`${paths.catalog}/${category.slug}`}>
                {category.name}
              </Link>
              {category.subcategories?.map((subcategory) => (
                <Link
                  className="body_6"
                  href={`${paths.catalog}/${category.slug}/${subcategory.slug}`}
                  key={subcategory.id}
                >
                  {subcategory.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={s.banner}>
        <Image src={'/delivery-image.png'} alt="banner" fill />
      </div>
    </div>
  );
};

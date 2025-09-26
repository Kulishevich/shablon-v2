import s from './AboutSection.module.scss';
import Image from 'next/image';
import { ContentImageBlock } from '@/shared/api/about/types';
import clsx from 'clsx';
import { parseImageTextBlock } from '@/shared/lib/utils/parseImageTextBlock';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';

export const AboutSection = ({
  items,
  variant,
}: {
  items?: ContentImageBlock[];
  variant?: string;
}) => {
  return (
    <div className={s.container}>
      <h1 className="h1">О нас</h1>
      {items && (
        <div className={s.content}>
          {items.map((item) => {
            if (item.type === 'image_text') {
              const caption = parseImageTextBlock(item.content.text);

              return (
                <div
                  className={clsx(s.block, item.content.image_position === 'right' && s.reverse)}
                >
                  <div className={s.caption} dangerouslySetInnerHTML={{ __html: caption }} />

                  <div className={s.imageContainer}>
                    <Image
                      src={`${getStoreBaseUrl(variant)}/${item.content.image_path}`}
                      alt="about"
                      width={636}
                      height={396}
                      className={s.image}
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div className={s.block}>
                  <div
                    className={clsx(s.caption, 'body_2')}
                    dangerouslySetInnerHTML={{ __html: item.content.text }}
                  />
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

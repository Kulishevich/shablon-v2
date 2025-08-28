'use client';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import clsx from 'clsx';
import styles from './YandexMap.module.scss';
import { VectorCustomizationItem } from '@yandex/ymaps3-types';
import mapStyles from '@/shared/config/constants/maps-styles.json';
import LocationIcon from '@/shared/assets/LocationIcon';

declare global {
  interface Window {
    ymaps3: typeof import('@yandex/ymaps3-types');
  }
}

const Marker = () => {
  const container = document.createElement('div');
  container.className = styles.container;

  // Создаем контейнер для LocationIcon
  const iconContainer = document.createElement('div');
  iconContainer.id = 'marker-image';
  iconContainer.className = styles.image;

  // Рендерим LocationIcon в DOM элемент
  const root = ReactDOM.createRoot(iconContainer);
  root.render(<LocationIcon />);

  container.appendChild(iconContainer);

  return container;
};

export function YandexMap({
  className,
  address,
  coordinatesOffset,
}: {
  className?: string;
  address?: string;
  coordinatesOffset?: [number, number];
}) {
  const mapRef = useRef(null);

  useEffect(() => {
    async function initMap() {
      if (mapRef.current && address) {
        await ymaps3.ready;

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

        const searchResponse = await ymaps3.search({ text: address });

        const coordinates = searchResponse[0]?.geometry?.coordinates;

        const map = new YMap(
          mapRef.current,
          {
            location: {
              center: [
                ((coordinates && coordinates[0]) || 0) + (coordinatesOffset?.[0] || 0),
                ((coordinates && coordinates[1]) || 0) + (coordinatesOffset?.[1] || 0),
              ],
              zoom: 16,
            },
            mode: 'vector',
          },
          [
            new YMapDefaultSchemeLayer({
              customization: mapStyles as VectorCustomizationItem[],
            }),
            new YMapDefaultFeaturesLayer({}),
          ]
        );

        map.addChild(
          new YMapMarker(
            {
              coordinates: coordinates || [0, 0],
              draggable: false,
              mapFollowsOnDrag: true,
            },
            Marker()
          )
        );
      }
    }

    initMap();
  }, [mapRef, address]);

  return (
    <>
      <section ref={mapRef} className={clsx(styles.map, className)} />
    </>
  );
}

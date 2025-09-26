import React from 'react';
import s from './styles.module.scss';
import { ServiceCard } from '@/entities/service-card';

interface ServicesListProps {
  services: { title: string; slug: string; photo_path: string }[];
  variant?: string;
}

export const ServicesList = ({ services, variant }: ServicesListProps) => {
  return (
    <div className={s.container}>
      <h1 className="h1">Услуги</h1>

      <div className={s.categoriesList}>
        {services.map((service, index) => (
          <ServiceCard
            variant={variant}
            key={index}
            title={service.title}
            slug={service.slug}
            photo_path={service.photo_path}
          />
        ))}
      </div>
    </div>
  );
};

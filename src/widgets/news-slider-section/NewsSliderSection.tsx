import { NewsCard } from '@/entities/news-card';
import { SliderWrapper } from '@/entities/slider-wrapper';
import { NewsT } from '@/shared/api/news/types';
import React from 'react';

export const NewsSliderSection = ({ newsList }: { newsList: NewsT[] | null }) => {
  return (
    <SliderWrapper title="Новости" variant="news" itemsCount={newsList?.length || 0}>
      {newsList?.map((news, index) => <NewsCard key={index} news={news} />)}
    </SliderWrapper>
  );
};

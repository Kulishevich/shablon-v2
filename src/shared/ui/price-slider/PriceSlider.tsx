import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import s from './PriceSlider.module.scss';

type PriceSliderProps = {
  min?: number;
  max?: number;
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
};

export const PriceSlider = ({
  min = 1,
  max = 100,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: PriceSliderProps) => {
  return (
    <Slider.Root
      className={s.root}
      min={min}
      max={max}
      step={1}
      value={[minPrice, maxPrice]}
      onValueChange={([from, to]) => {
        setMinPrice(from);
        setMaxPrice(to);
      }}
    >
      <Slider.Track className={s.track}>
        <Slider.Range className={s.range} />
      </Slider.Track>
      <Slider.Thumb className={s.thumb} />
      <Slider.Thumb className={s.thumb} />
    </Slider.Root>
  );
};

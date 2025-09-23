'use client';
import { Select } from '@/shared/ui/select';
import { ColorPicker } from '@/shared/ui/color-picker';
import s from './SiteSettingsForm.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

const fonts = [
  {
    value: '1',
    option: 'Onest',
  },
  {
    value: '2',
    option: 'Open Sans',
  },
];

export const SiteSettingsForm = ({ variant }: { variant?: string }) => {
  const [font, setFont] = useState<string>(fonts[0].value);
  const [primaryColor, setPrimaryColor] = useState<string>('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState<string>('#10B981');

  const handleChangeFont = (value: string) => {
    setFont(value);
  };

  const handleChangePrimaryColor = (color: string) => {
    setPrimaryColor(color);
  };

  const handleChangeSecondaryColor = (color: string) => {
    setSecondaryColor(color);
  };

  return (
    <div className={s.formContainer}>
      <div className={s.filed}>
        <div className={clsx(s.title, 'h6')}>Шрифт</div>
        <Select
          options={fonts}
          defaultValue={fonts[0].value}
          onValueChange={handleChangeFont}
          className={s.select}
        />
      </div>

      <div className={s.filed}>
        <div className={clsx(s.title, 'h6')}>Цвета</div>
        <div className={s.colorsContainer}>
          <ColorPicker
            label="Основной цвет"
            value={primaryColor}
            onChange={handleChangePrimaryColor}
            className={s.colorPicker}
          />
          <ColorPicker
            label="Вторичный цвет"
            value={secondaryColor}
            onChange={handleChangeSecondaryColor}
            className={s.colorPicker}
          />
        </div>
      </div>
    </div>
  );
};

'use client';
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import s from './ColorPicker.module.scss';
import { ColorPickerIcon } from '@/shared/assets';

export type ColorPickerProps = {
  errorMessage?: string;
  label?: string;
  value?: string;
  onChange?: (color: string) => void;
  disabled?: boolean;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>;

type ColorPickerRef = ElementRef<'div'>;

// Функция для валидации hex цвета
const isValidHex = (hex: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
};

// Функция для нормализации hex цвета (добавляет # если его нет)
const normalizeHex = (hex: string): string => {
  if (!hex) return '#000000';

  hex = hex.trim();

  if (!hex.startsWith('#')) {
    hex = '#' + hex;
  }

  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  return hex.toUpperCase();
};

export const ColorPicker = forwardRef<ColorPickerRef, ColorPickerProps>((props, ref) => {
  const {
    className,
    disabled = false,
    errorMessage,
    label,
    value = '#000000',
    onChange,
    ...rest
  } = props;

  const [hexValue, setHexValue] = useState(normalizeHex(value));
  const [isHexInputFocused, setIsHexInputFocused] = useState(false);

  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const hexInputRef = useRef<HTMLInputElement | null>(null);

  const id = useId();
  const colorInputId = `${id}-color`;
  const hexInputId = `${id}-hex`;

  useEffect(() => {
    const normalizedValue = normalizeHex(value);
    if (normalizedValue !== hexValue) {
      setHexValue(normalizedValue);
    }
  }, [value]);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value.toUpperCase();
    setHexValue(newColor);
    onChange?.(newColor);
  };

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setHexValue(inputValue);

    const normalizedHex = normalizeHex(inputValue);
    if (isValidHex(normalizedHex)) {
      onChange?.(normalizedHex);
    }
  };

  const handleHexBlur = () => {
    setIsHexInputFocused(false);
    const normalizedHex = normalizeHex(hexValue);
    if (isValidHex(normalizedHex)) {
      setHexValue(normalizedHex);
      onChange?.(normalizedHex);
    } else {
      setHexValue(normalizeHex(value));
    }
  };

  const handleHexFocus = () => {
    setIsHexInputFocused(true);
  };

  const displayColor = isValidHex(hexValue) ? hexValue : normalizeHex(value);

  return (
    <div className={clsx(s.container, className)} ref={ref} {...rest}>
      {label && (
        <label className={clsx('body_7', disabled && s.disabled)} htmlFor={colorInputId}>
          {label}
        </label>
      )}

      <div className={s.colorPickerContainer}>
        <div className={s.colorSquareContainer}>
          <input
            ref={colorInputRef}
            type="color"
            id={colorInputId}
            value={displayColor}
            onChange={handleColorChange}
            disabled={disabled}
            className={s.colorInput}
          />
          <div
            className={clsx(s.colorSquare, disabled && s.disabled)}
            style={{ backgroundColor: displayColor }}
            onClick={() => !disabled && colorInputRef.current?.click()}
          >
            <ColorPickerIcon />
          </div>
        </div>

        <div className={s.hexInputContainer}>
          <input
            ref={hexInputRef}
            type="text"
            id={hexInputId}
            value={hexValue}
            onChange={handleHexChange}
            onFocus={handleHexFocus}
            onBlur={handleHexBlur}
            disabled={disabled}
            placeholder="#000000"
            maxLength={7}
            className={clsx(s.hexInput, 'body_7', errorMessage && s.error, disabled && s.disabled)}
          />
        </div>
      </div>

      {errorMessage && <span className="error">{errorMessage}</span>}
    </div>
  );
});

ColorPicker.displayName = 'ColorPicker';

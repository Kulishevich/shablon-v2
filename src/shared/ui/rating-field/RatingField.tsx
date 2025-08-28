'use client';
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import s from './RatingField.module.scss';
import { StarIcon } from '../../assets';

export type RatingFieldProps = {
  errorMessage?: ReactNode | string;
  isRequired?: boolean;
  label?: string;
  value: number;
} & ComponentPropsWithoutRef<'button'>;

type RatingFieldRef = ElementRef<'button'>;

export const RatingField = forwardRef<RatingFieldRef, RatingFieldProps>((props, ref) => {
  const {
    className,
    disabled,
    errorMessage,
    isRequired = false,
    label,
    onClick,
    value,
    ...rest
  } = props;

  const inputRef = useRef<HTMLButtonElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const id = useId();

  const inputChangeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  const handleMouseEnter = (index: number) => {
    if (!disabled) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    if (inputRef) {
      if (typeof value === 'string' && inputRef.current) {
        inputRef.current.value = value;
      }
    }
  }, [value]);

  return (
    <div className={s.container}>
      {label && (
        <div className={clsx(disabled && s.disabled, 'h6', isRequired && 'required')}>{label}</div>
      )}
      <div className={clsx(s.inputContainer, 'placeholder')}>
        {Array.from({ length: 5 }, (_, index) => {
          const isActive = hoveredIndex !== null ? index <= hoveredIndex : index < value;

          return (
            <button
              key={index}
              className={clsx(s.ratingButton, { [s.active]: isActive })}
              onClick={inputChangeHandler}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              value={index + 1}
              disabled={disabled}
            >
              <StarIcon />
            </button>
          );
        })}
      </div>
      {errorMessage && <span className={'error'}>{errorMessage}</span>}
    </div>
  );
});

RatingField.displayName = 'RatingField';

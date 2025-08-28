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
} from 'react';
import clsx from 'clsx';

import s from './TextField.module.scss';
import { CloseIcon, SearchIcon } from '../../assets';

export type TextFieldProps = {
  errorMessage?: ReactNode | string;
  isRequired?: boolean;
  label?: string;
  variant?: 'password' | 'search' | 'text';
} & ComponentPropsWithoutRef<'input'>;

type TextFieldRef = ElementRef<'input'>;

export const TextField = forwardRef<TextFieldRef, TextFieldProps>((props, ref) => {
  const {
    className,
    disabled,
    errorMessage,
    isRequired = false,
    label,
    onChange,
    placeholder,
    value,
    variant = 'text',
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const id = useId();

  const isSearch = variant === 'search';

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    if (inputRef.current) {
      inputRef.current.value = e.target.value;
    }
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
        <label
          className={clsx(disabled && s.disabled, 'h6', isRequired && 'required')}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className={clsx(s.inputContainer, 'placeholder')}>
        {isSearch && <SearchIcon className={clsx(s.iconSearch, disabled && s.disabled)} />}
        <input
          className={clsx(
            s.input,
            s[variant],
            errorMessage && s.error,
            disabled && s.disabled,
            className
          )}
          disabled={disabled}
          id={id}
          onChange={inputChangeHandler}
          placeholder={placeholder}
          ref={ref}
          value={value}
          {...rest}
        />
        {isSearch && (
          <CloseIcon
            className={s.clearIcon}
            onClick={() => onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)}
          />
        )}
      </div>
      {errorMessage && <span className={'error'}>{errorMessage}</span>}
    </div>
  );
});

TextField.displayName = 'TextField';

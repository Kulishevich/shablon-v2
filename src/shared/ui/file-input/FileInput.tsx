'use client';
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
  useId,
} from 'react';
import clsx from 'clsx';
import s from './FileInput.module.scss';
import DownloadIcon from '@/shared/assets/DownloadIcon';
export type FileInputProps = {
  errorMessage?: ReactNode | string;
  isRequired?: boolean;
  label?: string;
  acceptedTypes?: string;
  value?: File | null;
} & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'value'>;

type FileInputRef = ElementRef<'input'>;

export const FileInput = forwardRef<FileInputRef, FileInputProps>((props, ref) => {
  const {
    className,
    disabled,
    errorMessage,
    isRequired = false,
    onChange,
    acceptedTypes = 'image/png,image/jpeg',
    value,
    ...rest
  } = props;

  const id = useId();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const displayText = value?.name || 'Выберите фото (PNG, JPEG)';

  return (
    <div className={s.container}>
      <label className={s.inputContainer}>
        <DownloadIcon className={s.downloadIcon} />
        <input
          className={clsx(s.input, errorMessage && s.error, disabled && s.disabled, className)}
          disabled={disabled}
          id={id}
          onChange={inputChangeHandler}
          ref={ref}
          type="file"
          accept={acceptedTypes}
          {...rest}
        />
        <div className={clsx(s.placeholder, value && s.hasFile, 'body_4')}>
          <span>{displayText}</span>
        </div>
      </label>
      {errorMessage && <span className={'error'}>{errorMessage}</span>}
    </div>
  );
});

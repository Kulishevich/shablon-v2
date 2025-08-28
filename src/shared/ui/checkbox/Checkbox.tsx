import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef, useId } from 'react';

import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { clsx } from 'clsx';

import { CheckedIcon } from '../../assets';

import s from './Checkbox.module.scss';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';

export type CheckboxProps = {
  error?: string;
  isRequired?: boolean;
  label?: ReactNode;
  errorMessage?: string;
  privacyPolicy?: boolean;
} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root>;

type CheckboxRef = ElementRef<typeof RadixCheckbox.Root>;

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  const {
    className,
    disabled,
    error,
    isRequired,
    label,
    errorMessage,
    privacyPolicy = false,
    ...rest
  } = props;
  const checkboxId = useId();

  return (
    <div>
      <div className={s.container}>
        <RadixCheckbox.Root
          className={clsx(s.root, error && s.error, className)}
          disabled={disabled}
          id={checkboxId}
          aria-label={'Чекбокс'}
          ref={ref}
          {...rest}
        >
          <RadixCheckbox.Indicator className={clsx(s.indicator, disabled && s.disabled)}>
            <CheckedIcon className={clsx(s.icon, disabled && s.disabledIcon)} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label &&
          (privacyPolicy ? (
            <label
              className={clsx(s.label, disabled && s.disabled, 'body_4', isRequired && 'required')}
            >
              Согласие на{' '}
              <Link href={paths.privacy_policy} target="_blank">
                обработку персональных данных
              </Link>
            </label>
          ) : (
            <label
              className={clsx(s.label, disabled && s.disabled, 'body_4', isRequired && 'required')}
            >
              {label}
            </label>
          ))}
      </div>
      {errorMessage && <span className={'error'}>{errorMessage}</span>}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

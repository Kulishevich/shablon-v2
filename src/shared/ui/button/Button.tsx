import React, { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react';

import clsx from 'clsx';

import styles from './Button.module.scss';

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T;
  fullWidth?: boolean;
  variant?:
    | 'icon'
    | 'icon_outlined'
    | 'icon_primary'
    | 'icon_secondary'
    | 'icon_banner_nav'
    | 'link'
    | 'burger'
    | 'primary'
    | 'secondary'
    | 'white';
} & ComponentPropsWithoutRef<T>;

export const Button = forwardRef(
  <T extends ElementType = 'button'>(
    props: ButtonProps<T>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const {
      as: Component = 'button',
      className,
      fullWidth,
      type = 'button',
      variant = 'primary',
      ...rest
    } = props;
    const cn = clsx(
      styles.button,
      styles[variant],
      fullWidth && styles.fullWidth,
      className,
      'button'
    );

    return <Component className={cn} ref={ref} type={type} {...rest} />;
  }
);

Button.displayName = 'Button';

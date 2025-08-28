import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { clsx } from 'clsx';

import s from './TextArea.module.scss';

export type TextAreaProps = {
  errorMessage?: string;
  label?: string;
  isRequired?: boolean;
} & ComponentPropsWithoutRef<'textarea'>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, errorMessage, label, isRequired, ...rest }, ref) => {
    const showError = !!errorMessage;

    return (
      <div className={s.container}>
        {label && <label className={clsx(s.label, 'h6', isRequired && 'required')}>{label}</label>}
        <textarea
          required={isRequired}
          className={clsx(s.textarea, showError && s.error, className, 'placeholder')}
          ref={ref}
          {...rest}
        />

        {showError && <span className={'error'}>{errorMessage}</span>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

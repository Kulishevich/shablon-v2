import React from 'react';
import { TextArea, TextAreaProps } from '../text-area';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

type ControlledTextAreaProps<T extends FieldValues> = Omit<
  TextAreaProps,
  'disabled' | 'onBlur' | 'onChange' | 'ref' | 'value'
> &
  UseControllerProps<T>;

export const ControlledTextArea = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  errorMessage,
  ...props
}: ControlledTextAreaProps<T>) => {
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue,
    disabled,
    rules,
    shouldUnregister,
  });

  return (
    <TextArea
      errorMessage={errorMessage || fieldState.error?.message}
      {...props}
      {...field}
    />
  );
};

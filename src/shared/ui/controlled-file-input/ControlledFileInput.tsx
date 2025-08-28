'use client';
import React from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { FileInput, FileInputProps } from '@/shared/ui/file-input';

type ControlledFileInputProps<T extends FieldValues> = Omit<
  FileInputProps,
  'disabled' | 'onBlur' | 'onChange' | 'ref' | 'value'
> &
  UseControllerProps<T>;

export const ControlledFileInput = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  errorMessage,
  name,
  rules,
  shouldUnregister,
  ...props
}: ControlledFileInputProps<T>) => {
  const {
    field: { onBlur, onChange, ref, value, ...field },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <FileInput
      {...props}
      errorMessage={errorMessage ?? error?.message}
      onBlur={onBlur}
      onChange={handleChange}
      ref={ref}
      value={value}
      {...field}
    />
  );
};

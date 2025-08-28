import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { PhoneField, PhoneFieldProps } from '../phone-field';

type ControlledPhoneFieldProps<T extends FieldValues> = Omit<
  PhoneFieldProps,
  'disabled' | 'onBlur' | 'onChange' | 'ref' | 'value'
> &
  UseControllerProps<T>;

export const ControlledPhoneField = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  errorMessage,
  name,
  rules,
  shouldUnregister,
  mask,
  ...props
}: ControlledPhoneFieldProps<T>) => {
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
    const inputValue = e.target.value;

    onChange(inputValue);
  };

  return (
    <PhoneField
      {...props}
      errorMessage={errorMessage ?? error?.message}
      onBlur={onBlur}
      onChange={handleChange}
      ref={ref}
      value={value ?? ''}
      mask={mask}
      {...field}
    />
  );
};

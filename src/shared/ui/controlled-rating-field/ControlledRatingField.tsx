import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { RatingField, RatingFieldProps } from '../rating-field';

type ControlledRatingFieldProps<T extends FieldValues> = Omit<
  RatingFieldProps,
  'disabled' | 'onBlur' | 'onChange' | 'ref' | 'value'
> &
  UseControllerProps<T>;

export const ControlledRatingField = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  errorMessage,
  name,
  rules,
  shouldUnregister,
  type,
  ...props
}: ControlledRatingFieldProps<T>) => {
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

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChange(Number(e.currentTarget.value));
  };

  return (
    <RatingField
      {...props}
      errorMessage={errorMessage ?? error?.message}
      onBlur={onBlur}
      onClick={handleChange}
      ref={ref}
      value={value ?? 0}
      {...field}
    />
  );
};

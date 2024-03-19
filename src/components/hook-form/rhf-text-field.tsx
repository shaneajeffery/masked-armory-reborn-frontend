import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import { ReactNode } from 'react';

interface Props {
  name: string;
  type: string;
  helperText: ReactNode;
}

export default function RHFTextField({ name, helperText, type, ...rest }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...rest}
        />
      )}
    />
  );
}

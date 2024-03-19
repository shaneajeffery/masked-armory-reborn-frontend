import { Controller, useFormContext } from 'react-hook-form';

import { TextField, Autocomplete } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  name: string;
  type: string;
  label: string;
  helperText: ReactNode;
  placeholder: string;
}

export default function RHFAutocomplete({
  name,
  label,
  type,
  helperText,
  placeholder,
  ...rest
}: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          // @ts-ignore
          <Autocomplete
            {...field}
            id={`autocomplete-${name}`}
            onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error?.message : helperText}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
            {...rest}
          />
        );
      }}
    />
  );
}

import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, FormHelperText, FormControlLabel } from '@mui/material';

interface Props {
  name: string;
  helperText: string;
}

export function RHFCheckbox({ name, helperText, ...rest }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {/* @ts-ignore */}
          <FormControlLabel control={<Checkbox {...field} checked={field.value} />} {...rest} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}

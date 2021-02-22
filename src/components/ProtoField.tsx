import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import TextField from '@material-ui/core/TextField';

import { ProtoFieldProps } from 'src/types';

export const ProtoField: FC<ProtoFieldProps> = observer(({
  field,
  textFieldProps,
  changeField,
  InputLabelClass,
  startAdornment,
  endAdornment,
  inputProps,
}) => {
  const handleDetailsChange = (event: any) => {
    const { name, value }: { name: string; value: string } = event.target;
    changeField(name, value);
  };

  return (
    <TextField
      id={field.id}
      label={field.label}
      name={field.id}
      value={field.singleValue}
      disabled={field.disabled}
      onChange={handleDetailsChange}
      placeholder={field.placeholder}
      size="small"
      error={!!field.error}
      helperText={field.error || field.helperText}
      InputLabelProps={{ classes: InputLabelClass }}
      variant="outlined"
      InputProps={{
        startAdornment,
        endAdornment,
        ...inputProps,
      }}
      {...textFieldProps}
    />
  );
});

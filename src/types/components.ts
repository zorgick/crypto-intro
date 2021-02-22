import { ReactNode } from 'react';

import { TextFieldProps } from '@material-ui/core/TextField';
import { InputLabelClassKey } from '@material-ui/core/InputLabel';
import { InputProps } from '@material-ui/core/Input';

export type LoaderProps = {
  loading: boolean;
  stubComponent?: ReactNode;
  children?: ReactNode;
  mutual?: boolean;
};

export type ProtoFieldProps = {
  field: {
    id: string;
    label: string;
    singleValue: string;
    disabled: boolean;
    placeholder?: string;
    error?: string;
    helperText?: string;
  };
  textFieldProps?: TextFieldProps;
  changeField: (name: string, value: string) => void;
  InputLabelClass?: Partial<Record<InputLabelClassKey, string>>;
  endAdornment?: InputProps['endAdornment'],
  startAdornment?: InputProps['startAdornment'],
  inputProps?: InputProps,
};

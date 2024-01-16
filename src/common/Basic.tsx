import { Grow, TextField, TextFieldProps, Tooltip } from '@mui/material';
import React, { useState, ReactElement } from 'react';

interface LeftGrowProps {
    children: ReactElement;
    timeout?: number;
    trigger?: boolean;
  }
  
  export const LeftGrow: React.FC<LeftGrowProps> = ({ children, timeout = 1500, trigger = true }) => {
  return (
    <Grow in={trigger} style={{ transformOrigin: '-30% 50%' }} timeout={timeout}>
      {children}
    </Grow>
  );
};

export type ValidatedFieldProps = TextFieldProps & {
  len?: number;
  inputType?: 'decimal' | 'text' | 'int';
  invalidMsg?: string;
  /** 
   * setter is always called AFTER validation, regardless of whether validation fails
   * @param value Change event for the field  */
  setter: (value: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

/**
 * 
 * @param setter The setter for the state variable, always called AFTER validation, regarless of whether or not validation fails.
 * @returns 
 */
export const ValidatedField: React.FC<ValidatedFieldProps> = ({
  len = 0,
  inputType = 'text',
  invalidMsg,
  setter,
  ...textFieldProps
}) => {
  const [error, setError] = useState(false);

  const validateInput = (input: string) => {
    if (len > 0 && input.length > len) return false;
    if (inputType === 'decimal' && !/^[0-9]*\.?[0-9]*$/.test(input)) return false;
    if (inputType === 'int' && !/^[0-9]*$/.test(input)) return false;
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const isValid = validateInput(e.target.value);
    setError(!isValid);
    setter(e);
  };

  const getErrorMsg = () => {
    if (invalidMsg) return invalidMsg;
    return len > 0 ? `Enter only ${inputType}, max ${len} characters` : `Enter only ${inputType}`;
  };

  // Merge incoming transitions, don't overwrite.
  const fieldStyle = {
    ...textFieldProps.style,
    transition: `${textFieldProps.style?.transition ? textFieldProps.style?.transition + ', ' : ''}background-color 1.0s ease`,
    backgroundColor: textFieldProps.disabled ? '#202020' : 'transparent',
  };

  return (
    <Tooltip title={error ? getErrorMsg() : ''} open={error} arrow>
      <TextField
        {...textFieldProps}
        error={error}
        onChange={handleChange}
        size={ textFieldProps.disabled ? 'small' : 'medium' }
        style={{
          ...fieldStyle,
        }}
      />
    </Tooltip>
  );
};

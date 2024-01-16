import { Grow, TextField, TextFieldProps, Tooltip } from '@mui/material';
import React, { useState, ReactElement } from 'react';
import { ValidatedField, ValidatedFieldProps } from './Basic';
import { ZipDist } from '../entities/ZipDist';

type SelectClimateProps = ValidatedFieldProps & {
  onZipDataReceived: (data: any) => void; // Callback to update state in parent
};
  
export const SelectClimate: React.FC<SelectClimateProps> = ({
  onZipDataReceived,
  ...validatedFieldProps
}) => {
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    validatedFieldProps.setter(e);
    const zipCode = e.target.value;
    console.log(`$Selected {zipCode}`);
  };
  
  return (
    <ValidatedField
        {...validatedFieldProps}
        setter={handleZipChange}
    />
  );
};
  
import { Grow, TextField, TextFieldProps, Tooltip } from '@mui/material';
import React, { useState, ReactElement } from 'react';
import { ValidatedField, ValidatedFieldProps } from './Basic';

type ZipFieldProps = ValidatedFieldProps & {
  onZipDataReceived: (data: any) => void; // Callback to update state in parent
};
  
export const ZipField: React.FC<ZipFieldProps> = ({
  onZipDataReceived,
  ...validatedFieldProps
}) => {
  const fetchZipData = async (zipCode: string) => {
    // Need to validate here too, since the setter is always called after validation, even
    // if validation fails.
    if (validateZip(zipCode)) {
      console.log(`REceived ${zipCode}`);

      
      // Implement the API request logic here
      // use onZipDataReceived(data); to set parent state
    }
  };

  const validateZip = (zipCode: string) => {
    if (zipCode.length !== 5) return false;
    if (!/^[0-9]*\.?[0-9]*$/.test(zipCode)) return false;
    return true;
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    validatedFieldProps.setter(e);
    const zipCode = e.target.value;
    if (zipCode.length === 5) {
      fetchZipData(zipCode);
    }
  };
  
  return (
    <ValidatedField
        {...validatedFieldProps}
        setter={handleZipChange}
    />
  );
};
  
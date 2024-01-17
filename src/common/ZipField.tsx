import { Grow, TextField, TextFieldProps, Tooltip } from '@mui/material';
import React, { useState, ReactElement } from 'react';
import { ValidatedField, ValidatedFieldProps } from './Basic';
import { ZipDist } from '../entities/ZipDist';

type ZipFieldProps = ValidatedFieldProps & {
  onZipDataReceived: (data: any) => void; // Callback to update state in parent
};
  
export const ZipField: React.FC<ZipFieldProps> = ({
  onZipDataReceived,
  ...validatedFieldProps
}) => {
  const fetchZipData = async (zipCode: string) => {
    // const edgeFunction = 'https://uqjgvhebgvzrbbfjcxsg.supabase.co/functions/v1/get-zip';
    const edgeFunction = 'http://127.0.0.1:54321/functions/v1/get-zip'
    // Need to validate here too, since the setter is always called after validation, even
    // if validation fails.
    if (validateZip(zipCode)) {
      const response = await fetch(edgeFunction, {
        method: 'POST',
        body: JSON.stringify({ 'zip': zipCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const responseData = await response.json();
      const data = responseData.data[0] as ZipDist;
      onZipDataReceived(data === undefined ? {} : data);
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
    } else {
      onZipDataReceived({});
    }
  };
  
  return (
    <ValidatedField
        {...validatedFieldProps}
        setter={handleZipChange}
    />
  );
};
  
import { TextField, TextFieldProps, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ZipDist } from '../entities/ZipDist';

type SelectClimateProps = TextFieldProps & {
  zipData: ZipDist; // Include a property for zip data
};

export const SelectClimate: React.FC<SelectClimateProps> = ({
  zipData,
  ...textFieldProps
}) => {
  const [selectedZip, setSelectedZip] = useState('');

  useEffect(() => {
    if (zipData && Object.keys(zipData).length !== 0) {
      setSelectedZip(zipData['near_zip_1']);
    } else {
      setSelectedZip('');
    }
  }, [zipData]);


  const menuItems = zipData && Object.keys(zipData).length !== 0
    ? Array.from({ length: 5 }, (_, i) => {
        const cityKey = `near_city_${i + 1}` as keyof ZipDist;
        const zipKey = `near_zip_${i + 1}` as keyof ZipDist;
        return (
          <MenuItem key={zipData[zipKey]} value={zipData[zipKey]}>
            {zipData[cityKey]} ({zipData[zipKey]})
          </MenuItem>
        );
      })
    : [<MenuItem key={'placeholder'} value={'placeholder'}>No zip entered</MenuItem>];

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedZip(event.target.value as string);
  };  

  const fieldStyle = {
    ...textFieldProps.style,
    transition: `${textFieldProps.style?.transition ? textFieldProps.style?.transition + ', ' : ''}background-color 1.0s ease`,
    backgroundColor: textFieldProps.disabled ? '#202020' : 'transparent',
  };

  return (
    <TextField
      {...textFieldProps}
      value={selectedZip}
      select
      label='Closest Climate'
      onChange={handleChange}
      style={{
        ...fieldStyle
      }}
    >
      {menuItems}
    </TextField>
  );
};
  
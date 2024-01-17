import { TextField, TextFieldProps, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ZipDist } from '../entities/ZipDist';
import { isEmpty } from './Util';

type SelectClimateProps = TextFieldProps & {
  zipData: ZipDist;
  selectedClimate: string;
  setSelectedClimate: (data: string) => void;
};

type ClimateMenuItems = {
  itemKey: string | number;
  value: string | number;
};

export const SelectClimate: React.FC<SelectClimateProps> = ({
  zipData,
  selectedClimate,
  setSelectedClimate,
  ...textFieldProps
}) => {
  const [menuItems, setMenuItems] = useState<ClimateMenuItems[]>([]);

  useEffect(() => {
    if (!isEmpty(zipData)) {
      setMenuItems(Array.from({ length: 5 }, (_, i) => {
        const cityKey = `near_city_${i + 1}` as keyof ZipDist;
        const zipKey = `near_zip_${i + 1}` as keyof ZipDist;
        return {itemKey: zipData[cityKey], value: zipData[zipKey]};
      }));
      setSelectedClimate(zipData['near_zip_1']);
    } else {
      setMenuItems( [{itemKey: 'placeholder', value: ''}] );
      setSelectedClimate('');
    }
  }, [zipData]);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClimate(event.target.value as string);
  };

  const fieldStyle = {
    ...textFieldProps.style,
    transition: `${textFieldProps.style?.transition ? textFieldProps.style?.transition + ', ' : ''}background-color 1.0s ease`,
    backgroundColor: textFieldProps.disabled ? '#202020' : 'transparent',
  };

  return (
    <TextField
      {...textFieldProps}
      value={selectedClimate}
      select
      label='Closest Climate'
      onChange={handleChange}
      style={{
        ...fieldStyle
      }}
    >
      {menuItems.map(item => (
        <MenuItem key={item.itemKey} value={item.value}>{item.value} : {item.itemKey}</MenuItem>
      ))}
    </TextField>
  );
};
  
import React, { useEffect, useState } from 'react';
import { Box, Button, InputAdornment } from '@mui/material';
import { LeftGrow, ValidatedField } from '../common/Basic';
import { ZipField } from '../common/ZipField';
import { SelectClimate } from '../common/SelectClimate';
import { ZipDist } from '../entities/ZipDist';
import { FormData } from '../entities/FormData';

type CurrentSystemFormProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

const CurrentSystemForm: React.FC<CurrentSystemFormProps> = ({
  formData,
  setFormData,
}) => {
  const [currentHeatPumpSeer, setCurrentHeatPumpSeer] = useState(formData.currentHeatPumpSeer || '');
  const [currentHeatPumpHspf, setCurrentHeatPumpHspf] = useState(formData.currentHeatPumpHspf || '');
  const [currentACSeer, setCurrentACSeer] = useState(formData.currentACSeer || '');
  const [currentFurnaceEfficiency, setCurrentFurnaceEfficiency] = useState(formData.currentFurnaceEfficiency || '');
  const [zipCode, setZipCode] = useState(formData.zipCode || '');
  const [zipDistData, setZipDistData] = useState(formData.zipDistData || {} as ZipDist);
  const [selectedClimate, setSelectedClimate] = useState(formData.selectedClimate || '');

  const isHeatPumpFilled = (currentHeatPumpSeer.trim() !== '' || currentHeatPumpHspf.trim() !== '');
  const isACFilled = currentACSeer.trim() !== '';
  const haveZipDistData = Object.keys(zipDistData).length !== 0;

  useEffect(() => {
    setFormData({
      ...formData, 'currentACSeer': currentACSeer, 'currentFurnaceEfficiency': currentFurnaceEfficiency,
      'currentHeatPumpHspf': currentHeatPumpHspf, 'currentHeatPumpSeer': currentHeatPumpSeer,
      'zipCode': zipCode, 'selectedClimate': selectedClimate,
    });
  }, [currentACSeer, currentFurnaceEfficiency, currentHeatPumpHspf, currentHeatPumpSeer, zipCode, selectedClimate]);

  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        <ValidatedField 
          label="Current Heat Pump SEER" 
          value={currentHeatPumpSeer}
          inputMode='numeric'
          inputType='decimal'
          disabled={isACFilled}
          setter={(e) => setCurrentHeatPumpSeer(e.target.value)}
          // onChange={(e) => setCurrentHeatPumpSeer(e.target.value)} 
        />
        <ValidatedField 
          label="Current Heat Pump HSPF"
          value={currentHeatPumpHspf}
          inputMode='numeric'
          inputType='decimal'
          disabled={isACFilled}
          setter={(e) => setCurrentHeatPumpHspf(e.target.value)} 
        />
        <ValidatedField 
          label="Current AC SEER" 
          value={currentACSeer}
          inputMode='numeric'
          inputType='decimal'
          disabled={isHeatPumpFilled}
          setter={(e) => setCurrentACSeer(e.target.value)} 
        />
        <ValidatedField 
          label="Current Furnace Efficiency" 
          value={currentFurnaceEfficiency} 
          inputMode='numeric'
          inputType='decimal'
          InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
          setter={(e) => setCurrentFurnaceEfficiency(e.target.value)} 
        />
        <div style={{ display: 'flex' }}>
          <ZipField
            label="Zip Code"
            value={zipCode}
            len={5}
            inputMode='numeric'
            inputType='int'
            style={{
              width: haveZipDistData ? '50%' : '100%',
              marginRight: '0',
              transition: 'width 0.5s ease-in-out, opacity 0.5s ease-in-out',
            }}
            InputProps={{
              style: {
                borderTopRightRadius: haveZipDistData ? '0' : '4px',
                borderBottomRightRadius: haveZipDistData ? '0' : '4px',
              }
            }}
            setter={(e) => setZipCode(e.target.value)}
            onZipDataReceived={setZipDistData}
          />
        <SelectClimate
          label="Closest Climate"
          hidden={!haveZipDistData}
          style={{
            width: haveZipDistData ? '50%' : '0%',
            marginLeft: '0',
            opacity: haveZipDistData ? 1 : 0,
            transition: 'width 0.5s ease-in-out, opacity 0.5s ease-in-out',
          }}
          InputProps={{
            style: {
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0',
            }
          }}
          zipData={zipDistData as ZipDist}
          selectedClimate={selectedClimate}
          setSelectedClimate={setSelectedClimate}
        />
        </div>
      </Box>
    </LeftGrow>
  );
};

export default CurrentSystemForm;

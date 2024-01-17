import React, { useState } from 'react';
import { Box, Button, Tooltip, InputAdornment } from '@mui/material';
import { LeftGrow, ValidatedField } from '../common/Basic';
import { ZipField } from '../common/ZipField';
import { SelectClimate } from '../common/SelectClimate';
import { ZipDist } from '../entities/ZipDist';

const Calculator = () => {
  const [currentHeatPumpSeer, setCurrentHeatPumpSeer] = useState('');
  const [currentHeatPumpHspf, setCurrentHeatPumpHspf] = useState('');
  const [currentACSeer, setCurrentACSeer] = useState('');
  const [currentFurnaceEfficiency, setCurrentFurnaceEfficiency] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [zipDistData, setZipDistData] = useState({});
  const [selectedClimate, setSelectedClimate] = useState('');

  const handleCalculate = () => {
    // Logic for calculation goes here
    console.log("Calculating with values:", currentHeatPumpSeer, currentACSeer, currentFurnaceEfficiency, zipCode);
  };

  const textFieldStyle = {
    width: '250px',
  };

  const isHeatPumpFilled = (currentHeatPumpSeer.trim() !== '' || currentHeatPumpHspf.trim() !== '');
  const isACFilled = currentACSeer.trim() !== '';
  const haveZipDistData = Object.keys(zipDistData).length !== 0;

  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        <ValidatedField 
          label="Current Heat Pump SEER" 
          value={currentHeatPumpSeer}
          inputMode='numeric'
          inputType='decimal'
          style={textFieldStyle}
          disabled={isACFilled}
          setter={(e) => setCurrentHeatPumpSeer(e.target.value)}
          // onChange={(e) => setCurrentHeatPumpSeer(e.target.value)} 
        />
        <ValidatedField 
          label="Current Heat Pump HSPF"
          value={currentHeatPumpHspf}
          inputMode='numeric'
          inputType='decimal'
          style={textFieldStyle}
          disabled={isACFilled}
          setter={(e) => setCurrentHeatPumpHspf(e.target.value)} 
        />
        <ValidatedField 
          label="Current AC SEER" 
          value={currentACSeer}
          inputMode='numeric'
          inputType='decimal'
          style={textFieldStyle}
          disabled={isHeatPumpFilled}
          setter={(e) => setCurrentACSeer(e.target.value)} 
        />
        <ValidatedField 
          label="Current Furnace Efficiency" 
          value={currentFurnaceEfficiency} 
          inputMode='numeric'
          inputType='decimal'
          style={textFieldStyle}
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
              ...textFieldStyle,
              width: haveZipDistData ? '125px' : '250px',
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
            ...textFieldStyle,
            width: haveZipDistData ? '125px' : '0px',
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
        <Button onClick={handleCalculate} style={textFieldStyle}>Calculate</Button>
      </Box>
    </LeftGrow>
  );
};

export default Calculator;

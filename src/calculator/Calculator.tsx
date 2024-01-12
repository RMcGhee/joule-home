import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import LeftGrow from '../common/Basic';

const Calculator = () => {
  const [currentHeatPumpSeer, setCurrentHeatPumpSeer] = useState('');
  const [currentHeatPumpHspf, setCurrentHeatPumpHspf] = useState('');
  const [currentACSeer, setCurrentACSeer] = useState('');
  const [currentFurnaceEfficiency, setCurrentFurnaceEfficiency] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleCalculate = () => {
    // Logic for calculation goes here
    console.log("Calculating with values:", currentHeatPumpSeer, currentACSeer, currentFurnaceEfficiency, zipCode);
  };

  const textFieldStyle = {
    width: '250px',
  };

  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        <TextField 
          label="Current Heat Pump SEER" 
          value={currentHeatPumpSeer}
          style={textFieldStyle}
          onChange={(e) => setCurrentHeatPumpSeer(e.target.value)} 
        />
        <TextField 
          label="Current Heat Pump HSPF"
          value={currentHeatPumpHspf}
          style={textFieldStyle}
          onChange={(e) => setCurrentHeatPumpHspf(e.target.value)} 
        />
        <TextField 
          label="Current AC SEER" 
          value={currentACSeer}
          style={textFieldStyle}
          onChange={(e) => setCurrentACSeer(e.target.value)} 
        />
        <TextField 
          label="Current Furnace Efficiency" 
          value={currentFurnaceEfficiency} 
          style={textFieldStyle}
          onChange={(e) => setCurrentFurnaceEfficiency(e.target.value)} 
        />
        <TextField 
          label="Zip Code" 
          value={zipCode} 
          style={textFieldStyle}
          onChange={(e) => setZipCode(e.target.value)} 
        />
        <Button onClick={handleCalculate} style={textFieldStyle}>Calculate</Button>
      </Box>
    </LeftGrow>
  );
};

export default Calculator;

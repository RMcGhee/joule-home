import React, { useState } from 'react';
import { TextField, Box, Button, Tooltip } from '@mui/material';
import LeftGrow from '../common/Basic';
import theme from '../base-theme';
import { useTheme } from '@emotion/react';

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

  const isHeatPumpFilled = (currentHeatPumpSeer.trim() !== '' || currentHeatPumpHspf.trim() !== '');
  const isACFilled = currentACSeer.trim() !== '';

  const disableTooltip = 'Fill out either heat pump info or AC, not both';

  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        <Tooltip title={disableTooltip} disableHoverListener={!isACFilled} disableFocusListener={true}
          PopperProps={{ sx: { '.MuiTooltip-tooltip': { backgroundColor: theme.palette.background.default }}}}>
          <TextField 
            label="Current Heat Pump SEER" 
            value={currentHeatPumpSeer}
            style={textFieldStyle}
            disabled={isACFilled}
            onChange={(e) => setCurrentHeatPumpSeer(e.target.value)} 
          />
        </Tooltip>
        <Tooltip title={disableTooltip} disableHoverListener={!isACFilled} disableFocusListener={true}
          PopperProps={{ sx: { '.MuiTooltip-tooltip': { backgroundColor: theme.palette.background.default }}}}>
          <TextField 
            label="Current Heat Pump HSPF"
            value={currentHeatPumpHspf}
            style={textFieldStyle}
            disabled={isACFilled}
            onChange={(e) => setCurrentHeatPumpHspf(e.target.value)} 
          />
        </Tooltip>
        <Tooltip title={disableTooltip} disableHoverListener={!isHeatPumpFilled} disableFocusListener={true}
          PopperProps={{ sx: { '.MuiTooltip-tooltip': { backgroundColor: theme.palette.background.default }}}}>
          <TextField 
            label="Current AC SEER" 
            value={currentACSeer}
            style={textFieldStyle}
            disabled={isHeatPumpFilled}
            onChange={(e) => setCurrentACSeer(e.target.value)} 
          />
        </Tooltip>
        <TextField 
          label="Current Furnace Efficiency" 
          value={currentFurnaceEfficiency} 
          style={textFieldStyle}
          onChange={(e) => setCurrentFurnaceEfficiency(e.target.value)} 
        />
        <Tooltip title='Any zip close to you' PopperProps={{ sx: { '.MuiTooltip-tooltip': { backgroundColor: theme.palette.background.default }}}}>
          <TextField 
            label="Zip Code" 
            value={zipCode} 
            style={textFieldStyle}
            onChange={(e) => setZipCode(e.target.value)} 
          />
        </Tooltip>
        <Button onClick={handleCalculate} style={textFieldStyle}>Calculate</Button>
      </Box>
    </LeftGrow>
  );
};

export default Calculator;

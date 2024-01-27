import React, { useEffect, useState } from 'react';
import { Box, Collapse, IconButton, InputAdornment, Slide, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { LeftGrow, ValidatedField } from '../common/Basic';
import { FormData } from '../entities/FormData';
import { QuestionMark } from '@mui/icons-material';
import { HelpPopover } from '../common/HelpPopover';
import { EnergyFormData, MonthlyUsage, } from '../entities/EnergyFormData';

type EnergyUsageAnalysisProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

const EnergyUsageAnalysis: React.FC<EnergyUsageAnalysisProps> = ({
  formData,
  setFormData,
}) => {
  const [energyFormData, setEnergyFormData] = useState<EnergyFormData>({...formData} as EnergyFormData);
  
  const [showHelpPopover, setShowHelpPopover] = useState(false);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    setFormData({
      ...formData, ...energyFormData,
    });
  }, [energyFormData]);

  const helpText = (
    <div>
      <h3>Summer/winter electric or gas usage</h3>
      <p>These should be the average of the three hottest (summer) and coldest (winter) months. For example, to get winter gas usage,
        average your gas usages for December, January, and Febuary (if these are the coldest months for your area). For summer,
        you would average months June, July, and August. If you use a different energy source (propane, oil, kerosene, etc), then
        use your units for this for winter and summer gas usage. As long as you use the same units, most calculations will be accurate.
        If you don't use a fossil fuel for heating, leave these blank.
      </p>
      <hr/>
    </div>
  );

  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2, transition: 'all 1s' }}>
        <ToggleButtonGroup
          color="primary"
          value={energyFormData.energyResolution}
          exclusive
          onChange={(e, newResolution) => {
            if (newResolution !== null) {
              setEnergyFormData({...energyFormData, energyResolution: newResolution})
            }
          }
        }
          aria-label="Monthly or biannual"
        >
          <ToggleButton value="biannual">Summer/Winter</ToggleButton>
          <ToggleButton value="monthly">Monthly</ToggleButton>
        </ToggleButtonGroup>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
          <ValidatedField 
            label="Electric Price/kWh" 
            value={energyFormData.electricPrice}
            inputType='decimal'
            inputProps={{ inputMode: 'decimal' }}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            formOrder={4}
            setter={(e) => setEnergyFormData({...energyFormData, electricPrice: e.target.value})}
          />
          <ValidatedField 
            label={`Gas Price/${energyFormData.gasUnits}`}
            value={energyFormData.gasPrice}
            inputType='decimal'
            inputProps={{ inputMode: 'decimal' }}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            formOrder={5}
            setter={(e) => setEnergyFormData({...energyFormData, gasPrice: e.target.value})}
          />
        </div>
        <IconButton
          color='primary'
          sx={{ alignSelf: 'flex-end', marginLeft: 'auto', marginRight: '5%'}}
          onClick={() => setShowHelpPopover(!showHelpPopover)}
        ><QuestionMark/></IconButton>
        <HelpPopover helpText={helpText} isOpen={showHelpPopover} onClose={() => setShowHelpPopover(false)}></HelpPopover>
      </Box>
    </LeftGrow>
  );
};

export default EnergyUsageAnalysis;

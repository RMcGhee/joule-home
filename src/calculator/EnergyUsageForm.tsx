import React, { useEffect, useState } from 'react';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { LeftGrow, ValidatedField } from '../common/Basic';
import { FormData } from '../entities/FormData';
import { QuestionMark } from '@mui/icons-material';
import { HelpPopover } from '../common/HelpPopover';
import { EnergyFormData } from '../entities/EnergyFormData';

type EnergyUsageFormProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

const EnergyUsageForm: React.FC<EnergyUsageFormProps> = ({
  formData,
  setFormData,
}) => {

  const [energyFormData, setEnergyFormData] = useState<EnergyFormData>({...formData} as EnergyFormData);
  
  const [showHelpPopover, setShowHelpPopover] = useState(false);

  useEffect(() => {
    setFormData({
      ...formData, ...energyFormData,
    });
  }, [energyFormData]);

  const helpText = (
    <div>
      <h3>Current Heat Pump Seer/HSPF</h3>
      <p>You should be able to find this and HSPF by searching for the model of your heat pump, but it's usually between 13 and 20 SEER, and 8 and 10 HSPF.
        These values represent how efficient a heat pump is in cooling and heating mode, and higher numbers are better.
      </p>
      <hr/>
    </div>
  );

  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '1rem' }}>
          <ValidatedField 
            label="Summer Electric Bill" 
            value={energyFormData.summerElectricBill}
            inputType='decimal'
            inputProps={{ inputMode: 'decimal' }}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            formOrder={0}
            setter={(e) => setEnergyFormData({...energyFormData, summerElectricBill: e.target.value})}
          />
          <ValidatedField 
            label="Summer Gas Bill"
            value={energyFormData.summerGasBill}
            inputType='decimal'
            inputProps={{ inputMode: 'decimal' }}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            formOrder={1}
            setter={(e) => setEnergyFormData({...energyFormData, summerGasBill: e.target.value})}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '1rem' }}>
          <ValidatedField 
            label="Winter Electric Bill" 
            value={energyFormData.winterElectricBill}
            inputType='decimal'
            inputProps={{ inputMode: 'decimal' }}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            formOrder={2}
            setter={(e) => setEnergyFormData({...energyFormData, summerElectricBill: e.target.value})}
          />
          <ValidatedField 
            label="Winter Gas Bill"
            value={energyFormData.winterGasBill}
            inputType='decimal'
            inputProps={{ inputMode: 'decimal' }}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            formOrder={3}
            setter={(e) => setEnergyFormData({...energyFormData, summerGasBill: e.target.value})}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '1rem' }}>
          <ValidatedField 
            label="Electric Price/kWh" 
            value={energyFormData.electricPrice}
            inputType='decimal'
            inputProps={{ inputMode: 'decimal' }}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            formOrder={4}
            setter={(e) => setEnergyFormData({...energyFormData, summerElectricBill: e.target.value})}
          />
          <ValidatedField 
            label="Gas Price/kBTU"
            value={energyFormData.gasPrice}
            inputType='decimal'
            inputProps={{ inputMode: 'decimal' }}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            formOrder={5}
            setter={(e) => setEnergyFormData({...energyFormData, summerGasBill: e.target.value})}
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

export default EnergyUsageForm;

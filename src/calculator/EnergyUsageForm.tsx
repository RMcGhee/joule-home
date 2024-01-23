import React, { useEffect, useState } from 'react';
import { Box, IconButton, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
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

  // const onChangeGasUnits = (event: React.MouseEvent<HTMLElement>, newUnits: 'ccf' | 'therm') => {
  //   setEnergyFormData({...energyFormData, gasUnits: newUnits});
  // };

  const helpText = (
    <div>
      <h3>Summer/winter elctric or gas bill</h3>
      <p>These should be the average of the three hottest (summer) and coldest (winter) months. For example, to get winter gas bill,
        average your gas bills for December, January, and Febuary (if these are the coldest months for your area). For summer,
        you would average months June, July, and August. If you use a different energy source (propane, oil, kerosene, etc), then
        use your cost for this for winter and summer gas bill. If you don't use a fossil fuel for heating, leave these blank.
      </p>
      <hr/>
      <h3>Electric/gas price</h3>
      <p>The average price that your utility charges per unit of energy delivered ($/kWh for electricity, $/Ccf/therms for gas).
        If your utility charges rates on a time of use basis, simply use the average price, not including delivery fees (divide (total bill - delivery fees) by total usage).
      </p>
      <hr/>
      <h3>Gas units; Ccf or kBTU</h3>
      <p>The units that your gas utility measures delivery in. Ccf and kBTU are fairly close (1.038 therms/Ccf), so if you don't know,
        it's fine to leave this as the default. therms and kBTU are the same. If you use a different fuel, just leave this as therms.
        Some efficiency results won't be relevant in this case, but the cost calculations will be accurate.
      </p>
    </div>
  );

  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        <ToggleButtonGroup
          color="primary"
          value={energyFormData.energyResolution}
          exclusive
          onChange={(e, newResolution) => setEnergyFormData({...energyFormData, energyResolution: newResolution})}
          aria-label="Monthly or biannual"
        >
          <ToggleButton value="ccf">Summer/Winter</ToggleButton>
          <ToggleButton value="therm">Monthly</ToggleButton>
        </ToggleButtonGroup>
        {/* I want this box group to show when Summer/Winter is selected, it's the default, but I want it so slide in from the left*/}
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
              setter={(e) => setEnergyFormData({...energyFormData, winterElectricBill: e.target.value})}
            />
            <ValidatedField 
              label="Winter Gas Bill"
              value={energyFormData.winterGasBill}
              inputType='decimal'
              inputProps={{ inputMode: 'decimal' }}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              formOrder={3}
              setter={(e) => setEnergyFormData({...energyFormData, winterGasBill: e.target.value})}
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
        </Box>
        {/* I want this box group to show when monthly is selected it's optional, and I want it to slide in from the right */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '1rem' }}>
            <ValidatedField 
              label="Jan Electric Bill" 
              value={energyFormData.summerElectricBill}
              inputType='decimal'
              inputProps={{ inputMode: 'decimal' }}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              formOrder={0}
              setter={(e) => setEnergyFormData({...energyFormData, summerElectricBill: e.target.value})}
            />
            <ValidatedField 
              label="Jan Gas Bill"
              value={energyFormData.summerGasBill}
              inputType='decimal'
              inputProps={{ inputMode: 'decimal' }}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              formOrder={1}
              setter={(e) => setEnergyFormData({...energyFormData, summerGasBill: e.target.value})}
            />
          </div>
        </Box>

        <ToggleButtonGroup
          color="primary"
          value={energyFormData.gasUnits}
          exclusive
          onChange={(e, newUnits) => setEnergyFormData({...energyFormData, gasUnits: newUnits})}
          aria-label="Gas Units"
        >
          <ToggleButton value="ccf">Ccf</ToggleButton>
          <ToggleButton value="therm">therms/kBTU</ToggleButton>
        </ToggleButtonGroup>
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

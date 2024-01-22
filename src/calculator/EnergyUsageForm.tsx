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
        If your utility charges rates on a time of use basis, simply use the average price (divide your total bill by your total usage).
      </p>
      <hr/>
      <h3>Gas units; Ccf or kBTU</h3>
      <p>The units that your gas utility measures delivery in. Ccf and kBTU are fairly close (1.038 therms/Ccf), so if you don't know,
        it's fine to leave this as the default. therms and kBTU are the same.
      </p>
    </div>
  );

  const onChangeGasUnits = (event: React.MouseEvent<HTMLElement>, newUnits: string) => {
    setEnergyFormData({...energyFormData, gasUnits: newUnits});
  };

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
            label={`Gas Price/${energyFormData.gasUnits}`}
            value={energyFormData.gasPrice}
            inputType='decimal'
            inputProps={{ inputMode: 'decimal' }}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            formOrder={5}
            setter={(e) => setEnergyFormData({...energyFormData, summerGasBill: e.target.value})}
          />
        </div>
        <ToggleButtonGroup
          color="primary"
          value={energyFormData.gasUnits}
          exclusive
          onChange={onChangeGasUnits}
          aria-label="Platform"
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

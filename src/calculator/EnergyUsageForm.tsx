import React, { useEffect, useState } from 'react';
import { Box, Collapse, IconButton, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { LeftGrow, ValidatedField } from '../common/Basic';
import { FormData } from '../entities/FormData';
import { QuestionMark } from '@mui/icons-material';
import { HelpPopover } from '../common/HelpPopover';
import { EnergyFormData, MonthlyUsage, } from '../entities/EnergyFormData';
import { DegreeDayData, initDegreeDayMonths } from '../entities/DegreeDayData';
import { isEmpty } from '../common/Util';
import { Updater } from 'use-immer';

type EnergyUsageFormProps = {
  formData: FormData;
  setFormData: Updater<FormData>;
};

const EnergyUsageForm: React.FC<EnergyUsageFormProps> = ({
  formData,
  setFormData,
}) => {

  const [energyFormData, setEnergyFormData] = useState<EnergyFormData>(() => {
    return {...formData} as EnergyFormData;
  });
  
  const [showHelpPopover, setShowHelpPopover] = useState(false);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const kWhData = {jan: '743', feb: '725', mar: '589', apr: '550', may: '714', jun: '1243', jul: '1635', aug: '1384', sep: '972', oct: '529', nov: '620', dec: '723',};
  const gasData = {jan: '171', feb: '156', mar: '143', apr: '65', may: '25', jun: '13', jul: '12', aug: '12', sep: '11', oct: '20', nov: '69', dec: '134'};

  const validateZip = (zipCode: string) => {
    if (zipCode.length !== 5) return false;
    if (!/^[0-9]*\.?[0-9]*$/.test(zipCode)) return false;
    return true;
  };

  const degreeDayDataOutOfDate = (degreeDayData: DegreeDayData): boolean => {
    let res = (isEmpty(degreeDayData) || degreeDayData.cooling.jan === '' || degreeDayData.zip !== formData.selectedClimate);
    return res;
  };

  useEffect(() => {
    if (validateZip(formData.selectedClimate) && degreeDayDataOutOfDate(formData.degreeDayData)) {
      const getDegreeDayData = async () => {
        const edgeFunction = 'http://127.0.0.1:54321/functions/v1/get-dd'
        const response = await fetch(edgeFunction, {
          method: 'POST',
          body: JSON.stringify({ 'zip': formData.selectedClimate }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const responseData = await response.json();
        const data = responseData.data[0] as DegreeDayData;
        data.cooling = initDegreeDayMonths(data.cooling);
        data.heating = initDegreeDayMonths(data.heating);
        setFormData((formDataDraft) => {
          formDataDraft.degreeDayData = data;
        });
      };
      getDegreeDayData();
    }
  }, []);

  useEffect(() => {
    energyFormData.monthlyElectricUsage = kWhData;
    energyFormData.monthlyGasUsage = gasData;
    setFormData((formDataDraft) => {
      Object.assign(formDataDraft, {
        monthlyElectricUsage: {...energyFormData.monthlyElectricUsage},
        monthlyGasUsage: {...energyFormData.monthlyGasUsage},
        energyResolution: energyFormData.energyResolution,
        summerElectricUsage: energyFormData.summerElectricUsage,
        winterElectricUsage: energyFormData.winterElectricUsage,
        winterGasUsage: energyFormData.winterGasUsage,
        electricPrice: energyFormData.electricPrice,
        gasPrice: energyFormData.gasPrice,
        gasUnits: energyFormData.gasUnits,
      } as FormData);
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

  const biannualShowing = energyFormData.energyResolution === 'biannual';

  const rowSx = { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' } as React.CSSProperties;

  const biannualForm = (
    <Box sx={{justifyContent: 'space-between', flexDirection: 'column', gap: 2, marginTop: '5px'}}>
      <div style={rowSx}>
        <ValidatedField 
          label="Summer Electric Usage" 
          value={energyFormData.summerElectricUsage}
          inputType='decimal'
          inputProps={{ inputMode: 'decimal' }}
          InputProps={{ endAdornment: <InputAdornment position="end">kWh</InputAdornment> }}
          InputLabelProps={{ shrink: true }}
          formOrder={0}
          setter={(e) => setEnergyFormData({...energyFormData, summerElectricUsage: e.target.value})}
        />
        <ValidatedField 
          label="Summer Gas Usage"
          value={energyFormData.summerGasUsage}
          inputType='decimal'
          inputProps={{ inputMode: 'decimal' }}
          InputProps={{ endAdornment: <InputAdornment position="end">{energyFormData.gasUnits}</InputAdornment> }}
          InputLabelProps={{ shrink: true }}
          formOrder={1}
          setter={(e) => setEnergyFormData({...energyFormData, summerGasUsage: e.target.value})}
        />
      </div>
      <div style={rowSx}>
        <ValidatedField 
          label="Winter Electric Usage" 
          value={energyFormData.winterElectricUsage}
          inputType='decimal'
          inputProps={{ inputMode: 'decimal' }}
          InputProps={{ endAdornment: <InputAdornment position="end">kWh</InputAdornment> }}
          InputLabelProps={{ shrink: true }}
          formOrder={2}
          setter={(e) => setEnergyFormData({...energyFormData, winterElectricUsage: e.target.value})}
        />
        <ValidatedField 
          label="Winter Gas Usage"
          value={energyFormData.winterGasUsage}
          inputType='decimal'
          inputProps={{ inputMode: 'decimal' }}
          InputProps={{ endAdornment: <InputAdornment position="end">{energyFormData.gasUnits}</InputAdornment> }}
          InputLabelProps={{ shrink: true }}
          formOrder={3}
          setter={(e) => setEnergyFormData({...energyFormData, winterGasUsage: e.target.value})}
        />
      </div>
    </Box>
  );

  const monthlyForm = (
    <Box sx={{justifyContent: 'space-between', flexDirection: 'column', gap: 2, marginTop: '5px', }}>
      {months.map((month, i) => {
        return (
          <div style={rowSx} key={`${month}-row`}>
            <ValidatedField 
              label={`${month} Electric Usage`}
              value={energyFormData.monthlyElectricUsage[month.toLowerCase() as keyof MonthlyUsage]}
              inputType='decimal'
              inputProps={{ inputMode: 'decimal' }}
              InputProps={{ endAdornment: <InputAdornment position="end">kWh</InputAdornment> }}
              InputLabelProps={{ shrink: true }}
              formOrder={i + 6}
              setter={(e) => setEnergyFormData({...energyFormData, monthlyElectricUsage: {...energyFormData.monthlyElectricUsage, [month.toLowerCase()]: e.target.value}})}
            />
            <ValidatedField 
              label={`${month} Gas Usage`}
              value={energyFormData.monthlyGasUsage[month.toLowerCase() as keyof MonthlyUsage]}
              inputType='decimal'
              inputProps={{ inputMode: 'decimal' }}
              InputProps={{ endAdornment: <InputAdornment position="end">{energyFormData.gasUnits}</InputAdornment> }}
              InputLabelProps={{ shrink: true }}
              formOrder={i + 18}
              setter={(e) => setEnergyFormData({...energyFormData, monthlyGasUsage: {...energyFormData.monthlyGasUsage, [month.toLowerCase()]: e.target.value}})}
            />
          </div>
        );
      })}
    </Box>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
          <Collapse in={biannualShowing} timeout={400}>{biannualForm}</Collapse>
          <Collapse in={!biannualShowing} timeout={400}>{monthlyForm}</Collapse>
        </Box>
        <div style={rowSx}>
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

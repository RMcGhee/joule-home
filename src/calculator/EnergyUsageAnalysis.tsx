import React, { useEffect, useState } from 'react';
import { Box, Collapse, IconButton, InputAdornment, Slide, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { LeftGrow, ValidatedField } from '../common/Basic';
import { FormData } from '../entities/FormData';
import { QuestionMark } from '@mui/icons-material';
import { HelpPopover } from '../common/HelpPopover';
import { EnergyFormData, MonthlyUsage, } from '../entities/EnergyFormData';
import { DegreeDayMonths } from '../entities/DegreeDayData';
import { ScatterChart } from '@mui/x-charts';

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

  type MonthDataEntry = [string, [number, number]];

  // Where the next two return [['mon', [kWh/gas usage for month, dd for month]]
  const coolingMonthsKwh = Object.entries(formData.degreeDayData.cooling).map(([month, dd]) => {
    if (dd > formData.degreeDayData.heating[month as keyof DegreeDayMonths]) {
      return [month, [Number(formData.monthlyElectricUsage[month as keyof MonthlyUsage]), dd]]
    }
    return null;
  })
  .filter((entry): entry is MonthDataEntry => entry !== null);

  const heatingMonthsKwh = Object.entries(formData.degreeDayData.heating).map(([month, dd]) => {
    if (dd > formData.degreeDayData.cooling[month as keyof DegreeDayMonths]) {
      return [month, [Number(formData.monthlyElectricUsage[month as keyof MonthlyUsage]), dd]]
    }
    return null;
  })
  .filter((entry): entry is MonthDataEntry => entry !== null);

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
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        <ScatterChart
          title='kWh usage'
          series={[
            {
              label: 'Cooling months',
              data: coolingMonthsKwh.map(([k, [kwh, dd]]) => ({x: dd, y: kwh, id: k})),
              color: '#4e79a7',
            },
            {
              label: 'Heating months',
              data: heatingMonthsKwh.map(([k, [kwh, dd]]) => ({x: dd, y: kwh, id: k})),
              color: '#e15759',
            },
          ]}
          width={500}
          height={300}
        />
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

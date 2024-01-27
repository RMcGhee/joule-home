import React, { useEffect, useState } from 'react';
import { Box, Collapse, IconButton, InputAdornment, Slide, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { LeftGrow, ValidatedField } from '../common/Basic';
import { FormData } from '../entities/FormData';
import { QuestionMark } from '@mui/icons-material';
import { HelpPopover } from '../common/HelpPopover';
import { EnergyFormData, MonthlyUsage, } from '../entities/EnergyFormData';
import { DegreeDayMonths } from '../entities/DegreeDayData';
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip, Title, } from 'chart.js';
import { Chart, Scatter } from 'react-chartjs-2';
import { SimpleLinearRegression } from 'ml-regression-simple-linear';

type EnergyUsageAnalysisProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

const EnergyUsageAnalysis: React.FC<EnergyUsageAnalysisProps> = ({
  formData,
  setFormData,
}) => {
  ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip, Title);
  const [energyFormData, setEnergyFormData] = useState<EnergyFormData>({ ...formData } as EnergyFormData);

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
      return [month, [Number(formData.monthlyElectricUsage[month as keyof MonthlyUsage]), dd]];
    }
    return null;
  })
  .filter((entry): entry is MonthDataEntry => entry !== null);

  const heatingMonthsKwh = Object.entries(formData.degreeDayData.heating).map(([month, dd]) => {
    if (dd > formData.degreeDayData.cooling[month as keyof DegreeDayMonths]) {
      return [month, [Number(formData.monthlyElectricUsage[month as keyof MonthlyUsage]), dd]];
    }
    return null;
  })
  .filter((entry): entry is MonthDataEntry => entry !== null);
  
  const coolingMonthScatter = coolingMonthsKwh.map(([k, [kwh, dd]]) => ({ x: dd, y: kwh }));
  const heatingMonthScatter = heatingMonthsKwh.map(([k, [kwh, dd]]) => ({ x: dd, y: kwh }));
  const coolingMonthLine = new SimpleLinearRegression(coolingMonthScatter.map((pair) => pair.x), coolingMonthScatter.map((pair) => pair.y));
  const heatingMonthLine = new SimpleLinearRegression(heatingMonthScatter.map((pair) => pair.x), heatingMonthScatter.map((pair) => pair.y));
  const coolingMonthMaxDd = Math.max(...coolingMonthsKwh.map(([k, [kwh, dd]]) => dd));
  const heatingMonthMaxDd = Math.max(...heatingMonthsKwh.map(([k, [kwh, dd]]) => dd));

  const helpText = (
    <div>
      <h3>Summer/winter electric or gas usage</h3>
      <p>These should be the average of the three hottest (summer) and coldest (winter) months. For example, to get winter gas usage,
        average your gas usages for December, January, and Febuary (if these are the coldest months for your area). For summer,
        you would average months June, July, and August. If you use a different energy source (propane, oil, kerosene, etc), then
        use your units for this for winter and summer gas usage. As long as you use the same units, most calculations will be accurate.
        If you don't use a fossil fuel for heating, leave these blank.
      </p>
      <hr />
    </div>
  );

  const chartData = {
    datasets: [
      {
        type: 'scatter' as const,
        label: 'Cooling kWh',
        data: coolingMonthsKwh.map(([k, [kwh, dd]]) => ({ x: dd, y: kwh })),
        backgroundColor: '#4e79a7',
      },
      {
        type: 'line' as const,
        label: 'Trend',
        data: [{x: 0, y: coolingMonthLine.intercept}, {x: coolingMonthMaxDd, y: coolingMonthLine.predict(coolingMonthMaxDd)}],
        borderColor: '#4e79a7',
        borderWidth: 2,
      },
      {
        type: 'scatter' as const,
        label: 'Heating kWh',
        data: heatingMonthsKwh.map(([k, [kwh, dd]]) => ({ x: dd, y: kwh })),
        backgroundColor: '#e15759',
      },
      {
        type: 'line' as const,
        label: 'Trend',
        data: [{x: 0, y: heatingMonthLine.intercept}, {x: heatingMonthMaxDd, y: heatingMonthLine.predict(heatingMonthMaxDd)}],
        borderColor: '#e15759',
        borderWidth: 2,
      },
    ],
  };

  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        <Chart
          title='kWh per season'
          type='scatter'
          data={chartData}
          width={400}
          height={400}
          options={{
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              }
            },
            plugins: {
              title: {
                display: true,
                text: 'kWh per season',
                align: 'center',
                font: {
                  size: 18
                }
              },
            },
          }}
        />
        <IconButton
          color='primary'
          sx={{ alignSelf: 'flex-end', marginLeft: 'auto', marginRight: '5%' }}
          onClick={() => setShowHelpPopover(!showHelpPopover)}
        ><QuestionMark /></IconButton>
        <HelpPopover helpText={helpText} isOpen={showHelpPopover} onClose={() => setShowHelpPopover(false)}></HelpPopover>
      </Box>
    </LeftGrow>
  );
}

export default EnergyUsageAnalysis;

import React, { useEffect, useRef } from 'react';
import { FormData } from '../../entities/FormData';
import { MonthlyUsage, } from '../../entities/EnergyFormData';
import { DegreeDayMonths } from '../../entities/DegreeDayData';
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip, Title, ChartArea, } from 'chart.js';
import { Chart, Line } from 'react-chartjs-2';
import { SimpleLinearRegression } from 'ml-regression-simple-linear';
import { MonthDataEntry } from '../EnergyUsageAnalysis';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { useTheme } from '@mui/material';
import { btuInCcf, btuInkWh, copInSeer, months } from '../../common/Basic';

type YearBtuGraphProps = {
  formData: FormData;
};

const YearBtuGraph: React.FC<YearBtuGraphProps> = ({
  formData,
}) => {
  const theme = useTheme();
  ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip, Title);

  const chartRefBtu = useRef <ChartJSOrUndefined<"line", number[], unknown>>(null);

  // Where the next two return [['mon', [kWh/gas usage for month, dd for month]]
  const coolingMonthsGas = Object.entries(formData.degreeDayData.cooling).map(([month, dd]) => {
    if (dd > formData.degreeDayData.heating[month as keyof DegreeDayMonths]) {
      return [month, [Number(formData.monthlyGasUsage[month as keyof MonthlyUsage]), dd]];
    }
    return null;
  })
  .filter((entry): entry is MonthDataEntry => entry !== null);

  const heatingMonthsGas = Object.entries(formData.degreeDayData.heating).map(([month, dd]) => {
    if (dd > formData.degreeDayData.cooling[month as keyof DegreeDayMonths]) {
      return [month, [Number(formData.monthlyGasUsage[month as keyof MonthlyUsage]), dd]];
    }
    return null;
  })
  .filter((entry): entry is MonthDataEntry => entry !== null);
  
  const coolingMonthScatter = coolingMonthsGas.map(([k, [unit, dd]]) => ({ x: dd, y: unit }));
  const heatingMonthScatter = heatingMonthsGas.map(([k, [unit, dd]]) => ({ x: dd, y: unit }));
  const coolingMonthLine = new SimpleLinearRegression(coolingMonthScatter.map((pair) => pair.x), coolingMonthScatter.map((pair) => pair.y));
  const heatingMonthLine = new SimpleLinearRegression(heatingMonthScatter.map((pair) => pair.x), heatingMonthScatter.map((pair) => pair.y));
  

  // useEffect(() => {}, []);

  const acCop = Number(formData.currentACSeer) * copInSeer;
  const furnaceEfficiency = Number(formData.currentFurnaceEfficiency) / 100;
  // in kBTU
  const getRawBtuMonth = (month: string) => {
    return (
      ((Number(formData.monthlyElectricUsage[month.toLowerCase() as keyof MonthlyUsage]) - formData.baseElectricUsage) * btuInkWh) +
      ((Number(formData.monthlyGasUsage[month.toLowerCase() as keyof MonthlyUsage]) - formData.baseGasUsage) * btuInCcf)
    ) / 1000;
  };

  const getRealBtuMonth = (month: string) => {
    return (
      ((Number(formData.monthlyElectricUsage[month.toLowerCase() as keyof MonthlyUsage]) - formData.baseElectricUsage) * btuInkWh * acCop) +
      ((Number(formData.monthlyGasUsage[month.toLowerCase() as keyof MonthlyUsage]) - formData.baseGasUsage) * btuInCcf * furnaceEfficiency)
    ) / 1000;
  };

  const getLinearGradient = (chartRef: React.RefObject<ChartJSOrUndefined<"line", number[], unknown>>) => {
    if (chartRef && chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      const area = chart.chartArea;
      const heatingColor = 'red';
      const coolingColor = 'blue';
    
      const gradient = ctx.createLinearGradient(30, area.top/2, area.right, area.top/2);
    
      gradient.addColorStop(0, heatingColor);
      gradient.addColorStop(0.6, coolingColor);
      gradient.addColorStop(1, heatingColor);
      
      return gradient;
    }
  }

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Raw kBTU',
        data: months.map((month) => getRawBtuMonth(month)),
        borderColor: '#4e79a7',
        borderWidth: 2,
        yAxisId: 'y',
      },
      {
        label: 'Real kBTU',
        data: months.map((month) => getRealBtuMonth(month)),
        borderColor: getLinearGradient(chartRefBtu),
        borderWidth: 2,
        yAxisId: 'y1',
      },
    ],
  };

  return (
    <Line
      ref={chartRefBtu}
      key='yearRawBtuGraph'
      title='Raw kBTU per month'
      data={chartData}
      width={400}
      height={400}
      options={{
        scales: {
          x: {
            beginAtZero: true,
            title: {
              text: 'Month',
              display: true,
            },
            ticks: {
              color: theme.palette.text.primary,
            }
          },
          y: {
            beginAtZero: true,
            title: {
              text: 'kBTU per month',
              display: true,
              color: theme.palette.text.primary,
            },
            ticks: {
              color: theme.palette.text.primary,
            },
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'HVAC energy use/month',
            align: 'center',
            color: theme.palette.text.primary,
            font: {
              size: 18
            }
          },
        },
      }}
    />
  );
}

export default YearBtuGraph;
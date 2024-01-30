import React, { useEffect, useRef } from 'react';
import { FormData } from '../../entities/FormData';
import { MonthlyUsage, } from '../../entities/EnergyFormData';
import { DegreeDayMonths } from '../../entities/DegreeDayData';
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip, Title, } from 'chart.js';
import { Chart, Line } from 'react-chartjs-2';
import { SimpleLinearRegression } from 'ml-regression-simple-linear';
import { MonthDataEntry } from '../EnergyUsageAnalysis';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { useTheme } from '@mui/material';
import { btuInCcf, btuInkWh, months } from '../../common/Basic';

type YearRawBtuGraphProps = {
  formData: FormData;
};

const YearRawBtuGraph: React.FC<YearRawBtuGraphProps> = ({
  formData,
}) => {
  const theme = useTheme();
  ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip, Title);

  const chartRefBtu = useRef <ChartJSOrUndefined<"line" | "scatter", {x: number; y: number;}[], unknown>>(null);

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
  const coolingMonthMaxDd = Math.max(...coolingMonthsGas.map(([k, [unit, dd]]) => dd));
  const heatingMonthMaxDd = Math.max(...heatingMonthsGas.map(([k, [unit, dd]]) => dd));

  // useEffect(() => {}, []);

  // in kBTU
  const getRawBtuMonth = (month: string) => {
    return ((Number(formData.monthlyElectricUsage[month.toLowerCase() as keyof MonthlyUsage]) * btuInkWh) +
    (Number(formData.monthlyGasUsage[month.toLowerCase() as keyof MonthlyUsage]) * btuInCcf)) / 1000;
  };

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
    ],
  };

  return (
    <Line
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
              text: 'Raw kBTU per month',
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
            text: ``,
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

export default YearRawBtuGraph;
import React, { useEffect, useRef } from 'react';
import { FormData } from '../../entities/FormData';
import { MonthlyUsage, } from '../../entities/EnergyFormData';
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip, Title, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { useTheme } from '@mui/material';
import { btuInCcf, btuInkWh, copInSeer, months } from '../../common/Basic';

type YearBtuNeedsGraphProps = {
  formData: FormData;
};

const YearBtuNeedsGraph: React.FC<YearBtuNeedsGraphProps> = ({
  formData,
}) => {
  const theme = useTheme();
  ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip, Title);

  const chartRefBtu = useRef <ChartJSOrUndefined<"line", number[], unknown>>(null);

  // useEffect(() => {}, []);

  const acCop = Number(formData.currentACSeer) * copInSeer;
  const furnaceEfficiency = Number(formData.currentFurnaceEfficiency) / 100;
  const electricPrice = Number(formData.electricPrice);
  const gasPrice = Number(formData.gasPrice);

  // in kBTU
  const realBtuMonths = months.map((month: string) => {
    return (
      ((Number(formData.monthlyElectricUsage[month.toLowerCase() as keyof MonthlyUsage]) - formData.baseElectricUsage) * btuInkWh * acCop) +
      ((Number(formData.monthlyGasUsage[month.toLowerCase() as keyof MonthlyUsage]) - formData.baseGasUsage) * btuInCcf * furnaceEfficiency)
    ) / 1000;
  });

  const ddMonths = months.map((month) => Number(formData.degreeDayData.cooling[month.toLowerCase() as keyof MonthlyUsage]) + Number(formData.degreeDayData.heating[month.toLowerCase() as keyof MonthlyUsage]));

  const averageBtuDd = realBtuMonths.reduce((acc, next, i) => (acc + (next / ddMonths[i])), 0) / 12;

  console.log(averageBtuDd);

  const getDollarsMonth = (month: string) => {
    return (
      ((Number(formData.monthlyElectricUsage[month.toLowerCase() as keyof MonthlyUsage]) - formData.baseElectricUsage) * electricPrice) +
      ((Number(formData.monthlyGasUsage[month.toLowerCase() as keyof MonthlyUsage]) - formData.baseGasUsage) * gasPrice)
    );
  };

  // Calculate the average real kBTU used per dd, regardless of source.
  // Make a line based on degree days that indicates, based on the above average, how much kBTU your house will need in that month
  // Generate an area line that takes into account that heating months will actually see less energy usage due to solar heat gain
  //  and cooling months will see more energy usage due to SHG.
  // Heating reduction (10-25%)
  // Cooling increase (5-15%)

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

  // For some reason, importing an alias to a const string[] breaks multi axis... no idea why.
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Used kBTU',
        data: realBtuMonths,
        borderColor: getLinearGradient(chartRefBtu),
        yAxisID: 'y',
      },
      {
        label: 'Estimated kBTU',
        data: months.map((month) => getDollarsMonth(month)),
        borderColor: 'green',
        yAxisID: 'y1',
      },
    ],
  };

  const btuOptions = {
      stacked: false,
      responsive: true,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      scales: {
        x: {
          beginAtZero: true,
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
        },
        y1: {
          type: 'linear' as const,
          beginAtZero: true,
          title: {
            text: '$ per month',
            display: true,
            color: theme.palette.text.primary,
          },
          display: true,
          position: 'right' as const,
          ticks: {
            color: theme.palette.text.primary,
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'Estimated kBTU needs',
          color: theme.palette.text.primary,
          font: {
            size: 18
          }
        },
      },
    };

  return (
    <Line
      ref={chartRefBtu}
      key='yearRawBtuGraph'
      title='Estimated kBTU needs'
      data={data}
      width={500}
      height={500}
      options={btuOptions}
    />
  );
}

export default YearBtuNeedsGraph;
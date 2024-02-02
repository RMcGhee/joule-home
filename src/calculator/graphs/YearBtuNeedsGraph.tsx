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
  setAveragekBTUdd: (e: number) => void;
};

const YearBtuNeedsGraph: React.FC<YearBtuNeedsGraphProps> = ({
  formData,
  setAveragekBTUdd,
}) => {
  const theme = useTheme();
  ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip, Title);

  const chartRefBtu = useRef <ChartJSOrUndefined<"line", number[], unknown>>(null);

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

  const naiveBtuNeeds = ddMonths.map((dd) => dd * averageBtuDd);

  const estimatedBtuNeeds = months.map((month) => ((Number(formData.degreeDayData.cooling[month.toLowerCase() as keyof MonthlyUsage]) * 1.10) + (Number(formData.degreeDayData.heating[month.toLowerCase() as keyof MonthlyUsage]) * 0.85)) * averageBtuDd);

  useEffect(() => {
    setAveragekBTUdd(averageBtuDd);
  }, [averageBtuDd]);

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
        label: 'Naive kBTU Needs',
        data: naiveBtuNeeds,
        borderColor: theme.palette.text.secondary,
        yAxisID: 'y',
      },
      {
        label: 'Est. kBTU Needs',
        data: estimatedBtuNeeds,
        borderColor: 'gold',
        yAxisID: 'y',
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
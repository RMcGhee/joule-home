import React, { useEffect, useRef } from 'react';
import { FormData } from '../../entities/FormData';
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip, Title, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { useTheme } from '@mui/material';
import { btuInkWh, copInSeer, months } from '../../common/Basic';
import { DegreeDayMonths } from '../../entities/DegreeDayData';

type NewSystemGraphProps = {
  formData: FormData;
};

const NewSystemGraph: React.FC<NewSystemGraphProps> = ({
  formData,
}) => {
  const theme = useTheme();
  ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip, Title);

  const chartRefBtu = useRef <ChartJSOrUndefined<"line", number[], unknown>>(null);

  const hpCoolCop = Number(formData.desiredHeatPumpSeer) * copInSeer;
  const hpHeatCop = Number(formData.desiredHeatPumpHspf) * copInSeer;
  const electricPrice = Number(formData.electricPrice);
  const gasPrice = Number(formData.gasPrice);

  const estimatedBtuNeeds = months.map((month) => ((Number(formData.degreeDayData.cooling[month.toLowerCase() as keyof DegreeDayMonths]) * 1.10) + (Number(formData.degreeDayData.heating[month.toLowerCase() as keyof DegreeDayMonths]) * 0.85)) * formData.averagekBTUdd);

  const monthlyHVACkWh = months.map((month) => {
    let cdd = Number(formData.degreeDayData.cooling[month.toLowerCase() as keyof DegreeDayMonths]);
    let hdd = Number(formData.degreeDayData.heating[month.toLowerCase() as keyof DegreeDayMonths]);
    let kWh = 0;
    if (cdd > 0) {
      kWh += (((cdd * formData.averagekBTUdd) / hpCoolCop / btuInkWh * 1000) * 1.10);
    }
    if (hdd > 0) {
      kWh += (((hdd * formData.averagekBTUdd) / hpHeatCop / btuInkWh * 1000) * 0.85);
    }
    return kWh;
  });

  const monthlyHVACCost = monthlyHVACkWh.map((kWh) => kWh * electricPrice);

  const monthlyTotalCost = monthlyHVACkWh.map((kWh) => {
    return (
      ((kWh + formData.baseElectricUsage) * electricPrice) +
      (formData.baseGasUsage * gasPrice)
    );
  });

  const currentYearHVACCost = monthlyHVACCost.reduce((acc, next) => acc + next);
  const currentYearTotalCost = monthlyTotalCost.reduce((acc, next) => acc + next);

  console.log(`desired hvac cost: $${currentYearHVACCost} | total: $${currentYearTotalCost}`);

  // useEffect(() => {}, []);

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
        label: 'Est kBTU Needs',
        data: estimatedBtuNeeds,
        borderColor: 'gold',
        showLine: false,
        yAxisID: 'y',
        lineTension: 0.3,
      },
      {
        label: 'HVAC Cost',
        data: monthlyHVACCost,
        borderColor: getLinearGradient(chartRefBtu),
        yAxisID: 'y1',
        lineTension: 0.3,
      },
      {
        label: 'Total Cost',
        data: monthlyTotalCost,
        borderColor: 'green',
        yAxisID: 'y1',
        lineTension: 0.3,
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
            text: 'Est. kBTU per month',
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
          text: 'New System Estimate',
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
      key='newSystemGraph'
      title='New System Estimate'
      data={data}
      width={500}
      height={500}
      options={btuOptions}
    />
  );
}

export default NewSystemGraph;
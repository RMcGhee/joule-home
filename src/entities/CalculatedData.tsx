import { months } from "../common/Basic";

export type CalculatedData = {
  baseElectricUsage: number;
  baseGasUsage: number;
  averagekBTUdd: number;
  estimatedkBTUmonths: MonthData;
};

export type MonthData = {
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
};

export const initMonthData = (data: number[]) => {
  return Object.fromEntries(months.map((month, i) => [month, data[i]])) as unknown as MonthData;
};
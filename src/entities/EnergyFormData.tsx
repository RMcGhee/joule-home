import { FormData } from "./FormData";

export type EnergyFormData = {
  energyResolution: 'biannual' | 'monthly';
  summerElectricUsage: string;
  summerGasUsage: string;
  winterElectricUsage: string;
  winterGasUsage: string;
  electricPrice: string;
  monthlyGasUsage: MonthlyUsage;
  monthlyElectricUsage: MonthlyUsage;
  gasPrice: string;
  gasUnits: 'ccf' | 'therm';
};

export type MonthlyUsage = {
  jan: string;
  feb: string;
  mar: string;
  apr: string;
  may: string;
  jun: string;
  jul: string;
  aug: string;
  sep: string;
  oct: string;
  nov: string;
  dec: string;
};

export const defaultMonthlyUsage = {
  jan: '',
  feb: '',
  mar: '',
  apr: '',
  may: '',
  jun: '',
  jul: '',
  aug: '',
  sep: '',
  oct: '',
  nov: '',
  dec: '',
};

export const initEnergyForm = (formData: FormData): EnergyFormData => {
  return {
    energyResolution: formData.energyResolution,
    summerElectricUsage: formData.summerElectricUsage,
    summerGasUsage: formData.summerGasUsage,
    winterElectricUsage: formData.winterElectricUsage,
    winterGasUsage: formData.winterGasUsage,
    electricPrice: formData.electricPrice,
    monthlyGasUsage: {...formData.monthlyGasUsage},
    monthlyElectricUsage: {...formData.monthlyElectricUsage},
    gasPrice: formData.gasPrice,
    gasUnits: formData.gasUnits,
  } as EnergyFormData;
};
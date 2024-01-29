import { isNumeric } from "../common/Util";
import { FormData } from "./FormData";

export type EnergyFormData = {
  energyResolution: 'biannual' | 'monthly';
  summerElectricUsage: string;
  summerGasUsage: string;
  winterElectricUsage: string;
  winterGasUsage: string;
  monthlyGasUsage: MonthlyUsage;
  monthlyElectricUsage: MonthlyUsage;
  electricPrice: string;
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
    monthlyGasUsage: {...formData.monthlyGasUsage},
    monthlyElectricUsage: {...formData.monthlyElectricUsage},
    electricPrice: formData.electricPrice,
    gasPrice: formData.gasPrice,
    gasUnits: formData.gasUnits,
  } as EnergyFormData;
};

// TODO: only validating when monthly used, not summer/winter
export const validateEnergyFormData = (formData: FormData): boolean => {
  return (
      formData.energyResolution === 'monthly' &&
      Object.entries(formData.monthlyElectricUsage).map(([_month, usage]) => isNumeric(usage)).every((entry) => entry) &&
      Object.entries(formData.monthlyGasUsage).map(([_month, usage]) => isNumeric(usage)).every((entry) => entry)
    ) &&
    isNumeric(formData.electricPrice) &&
    isNumeric(formData.gasPrice);
  return true;
};
export type EnergyFormData = {
  energyResolution: 'biannual' | 'monthly';
  summerElectricBill: string;
  summerGasBill: string;
  winterElectricBill: string;
  winterGasBill: string;
  electricPrice: string;
  monthlyGasBill: MonthlyBill;
  monthlyElectricBill: MonthlyBill;
  gasPrice: string;
  gasUnits: 'ccf' | 'therm';
};

export type MonthlyBill = {
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

export const defaultMonthlyBill = {
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
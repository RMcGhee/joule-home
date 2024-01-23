export type EnergyFormData = {
  energyResolution: 'biannual' | 'monthly';
  summerElectricBill: string;
  summerGasBill: string;
  winterElectricBill: string;
  winterGasBill: string;
  electricPrice: string;
  gasPrice: string;
  gasUnits: 'ccf' | 'therm';
};
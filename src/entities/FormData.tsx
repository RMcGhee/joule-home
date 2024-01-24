import { CurrentSystemData } from "./CurrentSystemData";
import { EnergyFormData, MonthlyBill, defaultMonthlyBill, } from "./EnergyFormData";
import { ZipDist } from "./ZipDist";

export type FormData = CurrentSystemData & EnergyFormData & {};

export const defaultFormData: FormData = {
    currentACSeer: '',
    currentFurnaceEfficiency: '',
    currentHeatPumpHspf: '',
    currentHeatPumpSeer: '',
    zipCode: '',
    selectedClimate: '',
    zipDistData: {} as ZipDist,
    energyResolution: 'biannual',
    summerElectricBill: '',
    summerGasBill: '',
    winterElectricBill: '',
    winterGasBill: '',
    monthlyGasBill: defaultMonthlyBill,
    monthlyElectricBill: defaultMonthlyBill,
    electricPrice: '',
    gasPrice: '',
    gasUnits: 'ccf',
};
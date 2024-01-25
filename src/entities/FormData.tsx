import { CurrentSystemData } from "./CurrentSystemData";
import { EnergyFormData, defaultMonthlyUsage, } from "./EnergyFormData";
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
    summerElectricUsage: '',
    summerGasUsage: '',
    winterElectricUsage: '',
    winterGasUsage: '',
    monthlyGasUsage: defaultMonthlyUsage,
    monthlyElectricUsage: defaultMonthlyUsage,
    electricPrice: '',
    gasPrice: '',
    gasUnits: 'ccf',
};
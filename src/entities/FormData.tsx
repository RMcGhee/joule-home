import { CurrentSystemData } from "./CurrentSystemData";
import { DegreeDayData } from "./DegreeDayData";
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
    degreeDayData: {} as DegreeDayData,
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
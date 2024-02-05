import { CalculatedData, MonthData } from "./CalculatedData";
import { CurrentSystemData } from "./CurrentSystemData";
import { DegreeDayData } from "./DegreeDayData";
import { EnergyFormData, defaultMonthlyUsage, } from "./EnergyFormData";
import { ZipDist } from "./ZipDist";

export type FormData = CurrentSystemData & EnergyFormData & CalculatedData & {};

export const defaultFormData: FormData = {
    currentACSeer: '',
    currentFurnaceEfficiency: '',
    desiredHeatPumpHspf: '',
    desiredHeatPumpSeer: '',
    zipCode: '',
    selectedClimate: '',
    zipDistData: {} as ZipDist,
    degreeDayData: {} as DegreeDayData,
    dataYear: 2023,
    monthlyGasUsage: defaultMonthlyUsage,
    monthlyElectricUsage: defaultMonthlyUsage,
    electricPrice: '',
    gasPrice: '',
    gasUnits: 'ccf',
    baseElectricUsage: 0,
    baseGasUsage: 0,
    averagekBTUdd: 0,
    estimatedkBTUmonths: {} as MonthData,
    currentHVACCost: 0,
    currentTotalCost: 0,
    desiredHVACCost: 0,
    desiredTotalCost: 0,
};
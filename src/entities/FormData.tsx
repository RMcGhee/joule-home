import { CurrentSystemData } from "./CurrentSystemData";
import { EnergyFormData } from "./EnergyFormData";
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
    summerElectricBill: '',
    summerGasBill: '',
    winterElectricBill: '',
    winterGasBill: '',
    electricPrice: '',
    gasPrice: '',
    gasUnits: 'ccf',
};
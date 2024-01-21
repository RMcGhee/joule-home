import { CurrentSystemData } from "../calculator/CurrentSystemForm";
import { EnergyFormData } from "../calculator/EnergyUsageForm";
import { ZipDist } from "./ZipDist";

export type FormData = CurrentSystemData & EnergyFormData & {};

export const defaultFormData: FormData = {
    currentACSeer: "",
    currentFurnaceEfficiency: "",
    currentHeatPumpHspf: "",
    currentHeatPumpSeer: "",
    zipCode: "",
    selectedClimate: "",
    zipDistData: {} as ZipDist,
    summerElectricBill: "",
    summerGasBill: "",
    winterElectricBill: "",
    winterGasBill: ""
};
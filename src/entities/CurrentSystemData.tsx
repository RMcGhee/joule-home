import { DegreeDayData } from "./DegreeDayData";
import { ZipDist } from "./ZipDist";
import { FormData } from "./FormData";
import { isEmpty, isNumeric, validateZip } from "../common/Util";

export type CurrentSystemData = {
    currentACSeer: string
    currentFurnaceEfficiency: string
    currentHeatPumpHspf: string
    currentHeatPumpSeer: string
    zipCode: string
    selectedClimate: string
    zipDistData: ZipDist
    degreeDayData: DegreeDayData
  };

export const initCurrentSystem = (formData: FormData): CurrentSystemData => {
  return {
    currentACSeer: formData.currentACSeer,
    currentFurnaceEfficiency: formData.currentFurnaceEfficiency,
    currentHeatPumpHspf: formData.currentHeatPumpHspf,
    currentHeatPumpSeer: formData.currentHeatPumpSeer,
    zipCode: formData.zipCode,
    selectedClimate: formData.selectedClimate,
    zipDistData: {...formData.zipDistData},
    degreeDayData: {...formData.degreeDayData},
  } as CurrentSystemData;
};

export const validateCurrentSystemData = (formData: FormData): boolean => {
  return (
      (isNumeric(formData.currentHeatPumpHspf) && isNumeric(formData.currentHeatPumpSeer)) || 
      (isNumeric(formData.currentACSeer) && isNumeric(formData.currentFurnaceEfficiency))
    ) &&
    validateZip(formData.zipCode) &&
    !isEmpty(formData.zipDistData);
  return true;
};
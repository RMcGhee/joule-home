import { DegreeDayData } from "./DegreeDayData";
import { ZipDist } from "./ZipDist";
import { FormData } from "./FormData";

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
}
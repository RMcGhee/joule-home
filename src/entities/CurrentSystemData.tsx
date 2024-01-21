import { ZipDist } from "./ZipDist";

export type CurrentSystemData = {
    currentACSeer: string
    currentFurnaceEfficiency: string
    currentHeatPumpHspf: string
    currentHeatPumpSeer: string
    zipCode: string
    selectedClimate: string
    zipDistData: ZipDist
  };
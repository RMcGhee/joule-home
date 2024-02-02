import React, { useEffect, useState } from 'react';
import { Box, IconButton, } from '@mui/material';
import { LeftGrow } from '../common/Basic';
import { FormData } from '../entities/FormData';
import { QuestionMark } from '@mui/icons-material';
import { HelpPopover } from '../common/HelpPopover';
import { EnergyFormData, initEnergyForm, } from '../entities/EnergyFormData';
import SeasonElectricGraph from './graphs/SeasonElectricGraph';
import SeasonGasGraph from './graphs/SeasonGasGraph';
import { Updater } from 'use-immer';
import YearBtuGraph from './graphs/YearBtuGraph';
import YearBtuNeedsGraph from './graphs/YearBtuNeedsGraph';

export type MonthDataEntry = [string, [number, number]];

type EnergyUsageAnalysisProps = {
  formData: FormData;
  setFormData: Updater<FormData>;
};

const EnergyUsageAnalysis: React.FC<EnergyUsageAnalysisProps> = ({
  formData,
  setFormData,
}) => {
  const [energyFormData, setEnergyFormData] = useState<EnergyFormData>(initEnergyForm(formData));

  const [showHelpPopover, setShowHelpPopover] = useState(false);

  const [baseElectricUsage, setBaseElectricUsage] = useState(0);
  const [baseGasUsage, setBaseGasUsage] = useState(0);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    setFormData((formDataDraft) => {
      formDataDraft.baseElectricUsage = baseElectricUsage;
      formDataDraft.baseGasUsage = baseGasUsage;
    });
  }, [energyFormData, baseElectricUsage, baseGasUsage]);

  const helpText = (
    <div>
      <h3>kWh per Season</h3>
      <p>This represents the kWh that your household uses (heating or cooling), versus the total degree days seen in a month.
        A heating season is one in which your heating needs exceed your cooling needs, and vice versa for the cooling season.
        Since an HVAC system uses electricity to run the air handler for the furnace, the calculation of base kWh load for
        your household takes this into account.
      </p>
      <hr />
      <h3>Gas ({formData.gasUnits}) per Season</h3>
      <p>This represents the gas that your household uses, and heating/cooling season is determined as above. Since gas is not
        used to run an air conditioner, the base gas usage for your household is calculated as an average of the usage
        during cooling months. While not perfectly accurate, it's pretty close.
      </p>
      <hr />
      <h3>HVAC energy transfer/month</h3>
      <p>This graph shows the raw kBTUs used by your household for heating and cooling each month (less your base usage). It
        also shows the 'Real' kBTU transfered by your system, taking into account furnace efficiency, and COP of your AC.
        Since AC's can move more heat than the energy content of the electricity they use, 'Real' kBTU will be higher in
        the summer, and lower in the winter. This graph also shows the cost to purchase this energy, based on the electric and
        gas cost you provided.
      </p>
      <hr />
      <h3>Estimated kBTU needs</h3>
      <p>This graph shows the approximate kBTUs need to heat and cool your home based on your current energy usage and solar
        heat gain. In the winter, your heating needs are decreased by this (~15%), and in the summer, your cooling needs are
        increased (~10%). This is only an estimate, and is influenced by the efficiency of your current system. If your actual
        cooling or heating needs deviate from this significantly, it may indicate that your current system isn't running
        at the efficiency expected, that other activities are increasing your heating and cooling needs, or that your home
        may have a larger or smaller influence from solar heat gain than the average home.
      </p>
      <hr />
    </div>
  );

  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        <div id='seasonElectricGraph' style={{ width: '1'}}>
          <SeasonElectricGraph formData={formData} setBaseElectricUsage={setBaseElectricUsage}/>
        </div>
        <div id='seasonGasGraph' style={{ width: '1'}}>
          <SeasonGasGraph formData={formData} setBaseGasUsage={setBaseGasUsage}/>
        </div>
        <div id='yearBtuGraph' style={{ width: '1'}}>
          <YearBtuGraph formData={formData}/>
        </div>
        <div id='yearBtuNeedsGraph' style={{ width: '1'}}>
          <YearBtuNeedsGraph formData={formData}/>
        </div>
        <IconButton
          color='primary'
          sx={{ alignSelf: 'flex-end', marginLeft: 'auto', marginRight: '5%' }}
          onClick={() => setShowHelpPopover(!showHelpPopover)}
        >
          <QuestionMark />
        </IconButton>
        <HelpPopover helpText={helpText} isOpen={showHelpPopover} onClose={() => setShowHelpPopover(false)}></HelpPopover>
      </Box>
    </LeftGrow>
  );
}

export default EnergyUsageAnalysis;

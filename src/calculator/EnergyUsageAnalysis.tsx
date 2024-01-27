import React, { useEffect, useState } from 'react';
import { Box, IconButton, } from '@mui/material';
import { LeftGrow } from '../common/Basic';
import { FormData } from '../entities/FormData';
import { QuestionMark } from '@mui/icons-material';
import { HelpPopover } from '../common/HelpPopover';
import { EnergyFormData, MonthlyUsage, } from '../entities/EnergyFormData';
import SeasonKwhGraph from './graphs/SeasonKwhGraph';

export type MonthDataEntry = [string, [number, number]];

type EnergyUsageAnalysisProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

const EnergyUsageAnalysis: React.FC<EnergyUsageAnalysisProps> = ({
  formData,
  setFormData,
}) => {
  const [energyFormData, setEnergyFormData] = useState<EnergyFormData>({ ...formData } as EnergyFormData);

  const [showHelpPopover, setShowHelpPopover] = useState(false);

  const [baseElectricUsage, setBaseElectricUsage] = useState(0);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    console.log(`Calculated base load: ${baseElectricUsage}`);
    setFormData({
      ...formData, ...energyFormData, baseElectricUsage: baseElectricUsage
    });
  }, [energyFormData, baseElectricUsage]);

  const helpText = (
    <div>
      <h3>Summer/winter electric or gas usage</h3>
      <p>These should be the average of the three hottest (summer) and coldest (winter) months. For example, to get winter gas usage,
        average your gas usages for December, January, and Febuary (if these are the coldest months for your area). For summer,
        you would average months June, July, and August. If you use a different energy source (propane, oil, kerosene, etc), then
        use your units for this for winter and summer gas usage. As long as you use the same units, most calculations will be accurate.
        If you don't use a fossil fuel for heating, leave these blank.
      </p>
      <hr />
    </div>
  );

  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        <SeasonKwhGraph formData={formData} setBaseElectricUsage={setBaseElectricUsage}/>
        <IconButton
          color='primary'
          sx={{ alignSelf: 'flex-end', marginLeft: 'auto', marginRight: '5%' }}
          onClick={() => setShowHelpPopover(!showHelpPopover)}
        ><QuestionMark /></IconButton>
        <HelpPopover helpText={helpText} isOpen={showHelpPopover} onClose={() => setShowHelpPopover(false)}></HelpPopover>
      </Box>
    </LeftGrow>
  );
}

export default EnergyUsageAnalysis;

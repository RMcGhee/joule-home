import { useEffect, useState } from 'react';
import { Button, Container, ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import theme from './base-theme';

import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/system';
import BottomNav from './bottom-nav/BottomNav';
import { LeftGrow } from './common/Basic';
import CurrentSystemForm from './calculator/CurrentSystemForm';
import Introduction from './calculator/Introduction';
import { FormData, defaultFormData } from './entities/FormData';
import { isEmpty } from './common/Util';
import EnergyUsageForm from './calculator/EnergyUsageForm';
import EnergyUsageAnalysis from './calculator/EnergyUsageAnalysis';
import { DegreeDayData, initDegreeDayMonths } from './entities/DegreeDayData';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({...defaultFormData} as FormData);

  useEffect(() => {
    // Load cached data from localStorage
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      let loadedData = {...defaultFormData, ...JSON.parse(savedData)}
      setFormData(loadedData);
    }
  }, []);

  // Save form data 3 seconds after it's updated.
  useEffect(() => {
    if (!isEmpty(formData)) {
      const timer = setTimeout(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
      }, 3000);
  
      // Return clearTimeout as the cleanup so that it clears if unmounted or called again.
      return () => clearTimeout(timer);
    }
  }, [formData]);
  
  const validateZip = (zipCode: string) => {
    if (zipCode.length !== 5) return false;
    if (!/^[0-9]*\.?[0-9]*$/.test(zipCode)) return false;
    return true;
  };

  const handleNextStep = async (stepChange = 1) => {
    setCurrentStep(currentStep + stepChange);

    // also get data for degree days
    if (currentStep + stepChange === 2) {
      if (validateZip(formData.selectedClimate)) {
        const edgeFunction = 'http://127.0.0.1:54321/functions/v1/get-dd'
        // Need to validate here too, since the setter is always called after validation, even
        // if validation fails.
        const response = await fetch(edgeFunction, {
          method: 'POST',
          body: JSON.stringify({ 'zip': formData.selectedClimate }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const responseData = await response.json();
        const data = responseData.data[0] as DegreeDayData;
        data.cooling = initDegreeDayMonths(data.cooling);
        data.heating = initDegreeDayMonths(data.heating);
        setFormData({ ...formData, degreeDayData: data });
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CurrentSystemForm formData={formData} setFormData={setFormData} />;
      case 2:
        return <EnergyUsageForm formData={formData} setFormData={setFormData} />;
      case 3:
        return <EnergyUsageAnalysis formData={formData} setFormData={setFormData} />;
      // case 4:
      //   return <BasicValuesComponent formData={formData} setFormData={setFormData} />;
      // case 4:
      //   return <BasicValuesComponent formData={formData} setFormData={setFormData} />;
      default:
        return <Introduction />;
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline>
    <Container sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <LeftGrow><Box sx={{ flexGrow: 0}} style={{ marginTop: 15 }}>
        <h1>joule-home</h1>
      </Box></LeftGrow>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '400px',
      }}>
        {renderStep()}

        <Box sx={{ position: 'relative', padding: 2, marginBottom: '30px' }}>
          <Button
            onClick={() => handleNextStep(-1)}
            style={{
              width: currentStep !== 0 ? '50%' : '0%',
              opacity: currentStep !== 0 ? 1 : 0,
              transition: 'width 0.5s ease-in-out, opacity 0.5s ease-in-out',
              position: 'absolute',
              left: 0,
            }}
          >
            Previous
          </Button>
          <Button
            onClick={() => handleNextStep()}
            style={{
              width: currentStep !== 0 ? '50%' : '100%',
              transition: 'width 0.5s ease-in-out, opacity 0.5s ease-in-out',
              flexGrow: currentStep === 0 ? 1 : 0,
              position: 'absolute',
              right: 0,
            }}  
          >
            Next
          </Button>
        </Box>
      </Box>
      <BottomNav/>
    </Container>
    </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

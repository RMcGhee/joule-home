import { Link, Divider, Stack, Grow } from '@mui/material';

import '../App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LeftGrow from '../common/Basic';

const user_home_url = 'https://rmcghee.github.io/'

interface BottomNavProps {
  animate?: boolean;
}

const BottomNav: React.FC = () => {
  return (
    <LeftGrow>
      <Stack
        direction={'row'}
        spacing={3}
        alignItems={'flex-end'}
        justifyContent={'flex-start'}
      >
        <h2>r.mcghee</h2>
        <Divider orientation='vertical'/>
        <Link href={user_home_url + "synbio.html"}>Synthetic Biology</Link><br />
        <Link href={user_home_url + "photography.html"}>Photography</Link><br />
        <Link href="/">joule-home</Link><br />
      </Stack>
    </LeftGrow>
  );
}

export default BottomNav;

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      {/* <Header /> */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </Box>

      {/* <Footer /> */}
    </Box>
  );
}

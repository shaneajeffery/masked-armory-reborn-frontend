'use client';

import Box from '@mui/material/Box';
import React from 'react';

import MainLayout from '@/components/main';

export default function CreateProfile() {
  return (
    <MainLayout>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      ></Box>
    </MainLayout>
  );
}

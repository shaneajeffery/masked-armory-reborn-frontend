import 'src/global.css';

import React from 'react';

import ThemeProvider from '@/theme';
import { primaryFont } from '@/theme/typography';

import ProgressBar from '@/components/progress-bar';
import { SettingsDrawer, SettingsProvider } from '@/components/settings';

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'Masked Armory',
  description: '',
  keywords: '',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <SettingsDrawer />
            <ProgressBar />
            {children}
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}

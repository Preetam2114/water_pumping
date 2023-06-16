import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mizunohana.app',
  appName: 'MizunoHana',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

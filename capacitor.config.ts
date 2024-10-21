import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'property.management.contract.writer',
  appName: 'property-management-contract-writer',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;

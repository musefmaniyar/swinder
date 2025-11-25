import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.swinder.app',
    appName: 'Swinder',
    webDir: 'out',
    server: {
        url: 'https://swinder-sable.vercel.app',
        cleartext: false
    },
    android: {
        buildOptions: {
            keystorePath: undefined,
            keystoreAlias: undefined,
        }
    }
};

export default config;

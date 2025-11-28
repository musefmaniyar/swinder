import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.swinder.app',
    appName: 'Swinder',
    webDir: 'public',
    server: {
        url: 'https://swinder-sable.vercel.app',
        cleartext: false
    }
};

export default config;

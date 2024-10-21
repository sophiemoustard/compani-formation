/* eslint-disable max-len */
import dotenv from 'dotenv';

dotenv.config();

const ENVIRONMENT_VARIABLES = {
  BASE_URL_LOCAL: process.env.BASE_URL_LOCAL,
  BASE_URL_DEV: process.env.BASE_URL_DEV,
  BASE_URL_STAGING: process.env.BASE_URL_STAGING,
  BASE_URL_PROD: process.env.BASE_URL_PROD,
  WEBAPP_URL_LOCAL: process.env.WEBAPP_URL_LOCAL,
  WEBAPP_URL_DEV: process.env.WEBAPP_URL_DEV,
  WEBAPP_URL_STAGING: process.env.WEBAPP_URL_STAGING,
  WEBAPP_URL_PROD: process.env.WEBAPP_URL_PROD,
  PROFILE: process.env.PROFILE,
  SENTRY_KEY: process.env.SENTRY_KEY,
  TEST_EMAILS: process.env.TEST_EMAILS,
  TEST_IDS: process.env.TEST_IDS,
  PLATFORM: process.env.PLATFORM,
};

const LOCAL = 'local';
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const getVariables = () => {
  switch (process.env.PROFILE) {
    case LOCAL:
      return { appName: 'Compani - local', bundleIdentifier: 'com.alenvi.compani.local' };
    case DEVELOPMENT:
      return { appName: 'Compani - Dev', bundleIdentifier: 'com.alenvi.compani.dev' };
    case PRODUCTION:
      return { appName: 'Compani', bundleIdentifier: 'com.alenvi.compani' };
    default:
      return 'Compani';
  }
};

const variables = getVariables();

export default {
  expo: {
    name: variables.appName,
    slug: 'compani',
    description: 'Nous aidons les intervenants, les managers du secteur et les dirigeants à pratiquer un accompagnement humain',
    platforms: ['ios', 'android', 'web'],
    version: '2.29.0',
    orientation: 'portrait',
    primaryColor: '#005774',
    icon: './assets/images/ios_icon.png',
    backgroundColor: '#FFFFFF',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#FFFFFF',
    },
    assetBundlePatterns: ['assets/images/*'],
    extra: {
      ...ENVIRONMENT_VARIABLES,
      eas: {
        projectId: process.env.PROJECT_ID,
      },
    },
    updates: {
      enabled: true,
      checkAutomatically: 'ON_LOAD',
      fallbackToCacheTimeout: 3000,
      url: 'https://u.expo.dev/861a9cc8-74bd-4278-9bad-783086e74994',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    notification: {
      icon: './assets/images/android_notification_icon.png',
      color: '#005774',
    },
    ios: {
      bundleIdentifier: variables.bundleIdentifier,
      requireFullScreen: true,
      icon: './assets/images/ios_icon.png',
      infoPlist: {
        NSCameraUsageDescription: 'Autorisez l\'accès à votre caméra pour pouvoir prendre une photo et la charger comme photo de profil dans Compani.',
        NSPhotoLibraryUsageDescription: 'Autorisez l\'accès à votre librairie pour pouvoir choisir une photo et la charger comme photo de profil dans Compani.',
      },
      privacyManifests: {
        NSPrivacyAccessedAPITypes: [
          {
            NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryFileTimestamp',
            NSPrivacyAccessedAPITypeReasons: ['3B52.1'],
          },
          {
            NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryDiskSpace',
            NSPrivacyAccessedAPITypeReasons: ['E174.1'],
          },
        ],
      },
    },
    android: {
      package: variables.bundleIdentifier,
      googleServicesFile: './google-services.json',
      permissions: ['CAMERA', 'READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE'],
      icon: './assets/images/android_icon_old.png',
      adaptiveIcon: {
        foregroundImage: './assets/images/android_icon.png',
        backgroundColor: '#005774',
      },
    },
    web: {
      favicon: './assets/images/android_icon_old.png',
    },
    plugins: [
      [
        'expo-build-properties',
        {
          ios: { useFrameworks: 'static' },
          android: {
            enableProguardInReleaseBuilds: true,
            enableShrinkResourcesInReleaseBuilds: true,
            extraProguardRules: '-keep public class com.horcrux.svg.** {*;}',
          },
        },
      ],
      ['expo-dev-launcher', { launchMode: 'launcher' }],
      ['@sentry/react-native/expo', { organization: 'alenvi', project: 'mobile' }],
      'expo-font',
      'expo-asset',
    ],
  },
};

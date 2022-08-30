/* eslint-disable max-len */
import 'dotenv/config';

const IS_PRODUCTION = process.env.APP_ENV === 'production';
const ENVIRONMENT_VARIABLES = {
  BASE_URL_LOCAL: process.env.BASE_URL_LOCAL,
  BASE_URL_DEV: process.env.BASE_URL_DEV,
  BASE_URL_STAGING: process.env.BASE_URL_STAGING,
  BASE_URL_PROD: process.env.BASE_URL_PROD,
  PROFILE: process.env.PROFILE,
  SENTRY_KEY: process.env.SENTRY_KEY,
  TEST_EMAILS: process.env.TEST_EMAILS,
  TEST_IDS: process.env.TEST_IDS,
  PLATFORM: process.env.PLATFORM,
};

export default {
  expo: {
    name: IS_PRODUCTION ? 'Compani' : 'Compani - Test',
    slug: 'compani',
    description: 'Nous aidons les intervenants, les managers du secteur et les dirigeants à pratiquer un accompagnement humain',
    platforms: ['ios', 'android'],
    version: '2.11.1',
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
        projectId: '861a9cc8-74bd-4278-9bad-783086e74994',
      },
      hooks: { // to be removed when using eas build - waiting for eas updates to be configures
        postPublish: [
          {
            file: 'sentry-expo/upload-sourcemaps',
            config: {
              organization: 'alenvi',
              project: 'mobile',
            },
          },
        ],
      },
    },
    updates: {
      enabled: true,
      checkAutomatically: 'ON_LOAD',
      fallbackToCacheTimeout: 3000,
    },
    notification: {
      icon: './assets/images/android_notification_icon.png',
      color: '#005774',
    },
    ios: {
      bundleIdentifier: IS_PRODUCTION ? 'com.alenvi.compani' : 'com.alenvi.compani.dev',
      buildNumber: '2.11.1',
      requireFullScreen: true,
      icon: './assets/images/ios_icon.png',
      infoPlist: {
        NSCameraUsageDescription: 'Autorisez l\'accès à votre caméra pour pouvoir prendre une photo et la charger comme photo de profil dans Compani.',
        NSPhotoLibraryUsageDescription: 'Autorisez l\'accès à votre librairie pour pouvoir choisir une photo et la charger comme photo de profil dans Compani.',
      },
      googleServicesFile: './GoogleService-Info.plist',
    },
    android: {
      package: 'com.alenvi.compani',
      permissions: ['CAMERA', 'READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE'],
      icon: './assets/images/android_icon_old.png',
      adaptiveIcon: {
        foregroundImage: './assets/images/android_icon.png',
        backgroundColor: '#005774',
      },
      versionCode: 79,
      googleServicesFile: './google-services.json',
    },
  },
};

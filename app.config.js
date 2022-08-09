/* eslint-disable max-len */
import 'dotenv/config';

const ENVIRONMENT_VARIABLES = {
  BASE_URL: process.env.BASE_URL,
  SENTRY_KEY: process.env.SENTRY_KEY,
  BASE_URL_STAGING: process.env.BASE_URL_STAGING,
  TEST_EMAIL: process.env.TEST_EMAIL,
  TEST_ID: process.env.TEST_ID,
};

export default {
  expo: {
    name: process.env.APP_ENV === 'development' ? 'Compani - Test' : 'Compani',
    slug: 'compani',
    description: 'Nous aidons les intervenants, les managers du secteur et les dirigeants à pratiquer un accompagnement humain',
    platforms: ['ios', 'android'],
    version: '2.11.0',
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
      hooks: {
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
      bundleIdentifier: process.env.APP_ENV === 'development' ? 'com.alenvi.compani.dev' : 'com.alenvi.compani',
      buildNumber: '2.11.0',
      requireFullScreen: true,
      icon: './assets/images/ios_icon.png',
      infoPlist: {
        NSCameraUsageDescription: 'Autorisez l\'accès à votre caméra pour pouvoir prendre une photo et la charger comme photo de profil dans Compani.',
        NSPhotoLibraryUsageDescription: 'Autorisez l\'accès à votre librairie pour pouvoir choisir une photo et la charger comme photo de profil dans Compani.',
      },
      googleServicesFile: './GoogleService-Info.plist',
    },
    android: {
      package: process.env.APP_ENV === 'development' ? 'com.alenvi.compani.dev' : 'com.alenvi.compani',
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

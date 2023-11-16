import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { LOCAL, DEVELOPMENT, STAGING, PRODUCTION } from './src/core/data/constants';
import asyncStorage from './src/core/helpers/asyncStorage';

const getSentryKey = (): string => Constants.expoConfig?.extra?.SENTRY_KEY || '';

const _getBaseUrlForProfile = (): string => {
  if (!Constants?.expoConfig?.extra) return '';

  if (Updates.channel) {
    if (Updates.channel === 'dev') return Constants.expoConfig.extra.BASE_URL_DEV;
    if (Updates.channel === 'staging') return Constants.expoConfig.extra.BASE_URL_STAGING;
    if (/prod/.test(Updates.channel)) return Constants.expoConfig.extra.BASE_URL_PROD;
  } else return Constants.expoConfig.extra.BASE_URL_LOCAL;

  return '';
};

const getBaseUrl = async (payload?: { email?: string, userId?: string }): Promise<string> => {
  const baseURLStaging = Constants.expoConfig?.extra?.BASE_URL_STAGING || '';
  const testEmails = (Constants.expoConfig?.extra?.TEST_EMAILS || '').split(',');
  const testIds = (Constants.expoConfig?.extra?.TEST_IDS || '').split(',');

  // used in authentication routes POST /users/authenticate and PUT /users/${userId}/password
  if ((payload?.email && testEmails.includes(payload.email)) || (payload?.userId && testIds.includes(payload.userId))) {
    return baseURLStaging;
  }

  // used for all logged routes
  const userId = await asyncStorage.getUserId();
  if (userId && testIds.includes(userId)) return baseURLStaging;

  return _getBaseUrlForProfile();
};

const _getWebappUrlForProfile = () => {
  if (!Constants?.expoConfig?.extra) return '';

  switch (Constants.expoConfig.extra.PROFILE) {
    case LOCAL:
      return Constants.expoConfig.extra.WEBAPP_URL_LOCAL || '';
    case DEVELOPMENT:
      return Constants.expoConfig.extra.WEBAPP_URL_DEV || '';
    case STAGING:
      return Constants.expoConfig.extra.WEBAPP_URL_STAGING || '';
    case PRODUCTION:
      return Constants.expoConfig.extra.WEBAPP_URL_PROD || '';
    default:
      return '';
  }
};

const getWebappUrl = async () => {
  const webappURLStaging = Constants.expoConfig?.extra?.WEBAPP_URL_STAGING || '';
  const testIds = (Constants.expoConfig?.extra?.TEST_IDS || '').split(',');

  // used for all logged routes
  const userId = await asyncStorage.getUserId();
  if (userId && testIds.includes(userId)) return webappURLStaging;

  return _getWebappUrlForProfile();
};

export default { getSentryKey, getBaseUrl, getWebappUrl };

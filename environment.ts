import Constants from 'expo-constants';
import { DEVELOPMENT, STAGING, PRODUCTION } from './src/core/data/constants';
import asyncStorage from './src/core/helpers/asyncStorage';

const getSentryKey = (): string => Constants.manifest?.extra?.SENTRY_KEY || '';

const _getBaseUrlForProfile = (): string => {
  if (!Constants?.manifest?.extra) return '';

  switch (Constants.manifest.extra.PROFILE) {
    case DEVELOPMENT:
      return Constants.manifest.extra.BASE_URL_DEV || '';
    case STAGING:
      return Constants.manifest.extra.BASE_URL_STAGING || '';
    case PRODUCTION:
      return Constants.manifest.extra.BASE_URL_PROD || '';
    default:
      return '';
  }
};

const getBaseUrl = async (payload?: { email?: string, userId?: string }): Promise<string> => {
  const baseURLStaging = Constants.manifest?.extra?.BASE_URL_STAGING || '';
  const testEmails = (Constants.manifest?.extra?.TEST_EMAILS || '').split(',');
  const testIds = (Constants.manifest?.extra?.TEST_IDS || '').split(',');

  // used in authentication routes POST /users/authenticate and PUT /users/${userId}/password
  if ((payload?.email && testEmails.includes(payload.email)) || (payload?.userId && testIds.includes(payload.userId))) {
    return baseURLStaging;
  }

  // used for all logged routes
  const userId = await asyncStorage.getUserId();
  if (userId && testIds.includes(userId)) return baseURLStaging;

  return _getBaseUrlForProfile();
};

export default { getSentryKey, getBaseUrl };

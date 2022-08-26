import Constants from 'expo-constants';
import { LOCAL, DEVELOPMENT, STAGING, PRODUCTION } from './src/core/data/constants';
import asyncStorage from './src/core/helpers/asyncStorage';

const getSentryKey = (): string => Constants.manifest?.extra?.SENTRY_KEY || '';

const _getBaseUrlForProfile = (): string => {
  if (!Constants?.manifest?.extra) return '';

  /**
   * Pour utiliser expo build:...
   * Il faudra l'enlever quand on aura totalement migrer vers EAS build
   */
  if (Constants.manifest.releaseChannel) {
    if (__DEV__) return Constants.manifest.extra.BASE_URL_LOCAL;
    if (/dev/.test(Constants.manifest.releaseChannel)) return Constants.manifest.extra.BASE_URL_DEV;
    if (/staging/.test(Constants.manifest.releaseChannel)) return Constants.manifest.extra.BASE_URL_STAGING;
    if (/prod/.test(Constants.manifest.releaseChannel)) return Constants.manifest.extra.BASE_URL_PROD;
    return '';
  }

  /**
   * Pour utiliser eas build
   */
  switch (Constants.manifest.extra.PROFILE) {
    case LOCAL:
      return Constants.manifest.extra.BASE_URL_LOCAL || '';
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

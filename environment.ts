import Constants from 'expo-constants';
import asyncStorage from './src/core/helpers/asyncStorage';

type EnvVarsType = {
  baseURL: string,
  sentryKey: string,
  baseURLStaging: string,
  testEmail: string,
  testId: string,
}

const getEnvVars = (): EnvVarsType => ({
  baseURL: Constants.manifest?.extra?.BASE_URL || '',
  sentryKey: Constants.manifest?.extra?.SENTRY_KEY || '',
  baseURLStaging: Constants.manifest?.extra?.BASE_URL_STAGING || '',
  testEmail: Constants.manifest?.extra?.TEST_EMAIL || '',
  testId: Constants.manifest?.extra?.TEST_ID || '',
});

const getBaseUrl = async (payload?: { email?: string, userId?: string }): Promise<string> => {
  const { baseURLStaging, baseURL, testEmail, testId } = getEnvVars();

  if ((payload?.email && payload?.email === testEmail) || (payload?.userId && payload?.userId === testId)) {
    return baseURLStaging;
  }

  const userId = await asyncStorage.getUserId();
  if (testId === userId) return baseURLStaging;

  return baseURL;
};

export default { getEnvVars, getBaseUrl };

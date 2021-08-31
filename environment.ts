/* eslint-disable import/extensions */
import Constants from 'expo-constants';
// @ts-ignore
import localEnv from './env/env.local';
// @ts-ignore
import devEnv from './env/env.dev';
// @ts-ignore
import stagingEnv from './env/env.staging';
// @ts-ignore
import prodEnv from './env/env.prod';
import asyncStorage from './src/core/helpers/asyncStorage';

type EnvVarsType = {
  baseURL: string,
  sentryKey: string,
  baseURLStaging: string,
  testEmail: string,
  testId: string,
}

const getEnvVars = (): EnvVarsType => {
  const env = Constants.manifest?.releaseChannel || '';

  if (__DEV__) return localEnv;
  if (/dev/.test(env)) return devEnv;
  if (/staging/.test(env)) return stagingEnv;
  if (/prod/.test(env)) return prodEnv;
  return localEnv;
};

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

import Constants from 'expo-constants';
import localEnv from './env/.env.local.js';
import stagingEnv from './env/.env.staging.js';

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) return localEnv;
  else if (env.indexOf('staging')) return stagingEnv;
  else return localEnv;
};

export default getEnvVars;

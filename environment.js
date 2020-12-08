import Constants from 'expo-constants';
import localEnv from './env/env.local.js';
import devEnv from './env/env.dev.js';
import prodEnv from './env/env.prod.js';

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) return localEnv;
  if (env === 'dev') return devEnv;
  if (env === 'prod') return prodEnv;
  return localEnv;
};

export default getEnvVars;

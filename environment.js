import Constants from 'expo-constants';
import localEnv from './env/env.local.js';
import devEnv from './env/env.dev.js';

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) return localEnv;
  else if (env === 'dev') return devEnv;
  else return localEnv;
};

export default getEnvVars;

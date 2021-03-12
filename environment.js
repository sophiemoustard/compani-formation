import Constants from 'expo-constants';
import localEnv from './env/env.local';
import devEnv from './env/env.dev';
import prodEnv from './env/env.prod';

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) return localEnv;
  if (/dev/.test(env)) return devEnv;
  if (/prod/.test(env)) return prodEnv;
  return localEnv;
};

export default getEnvVars;

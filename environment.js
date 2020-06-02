import Constants from 'expo-constants';

const ENV = {
  dev: {
    baseURL: 'ngrok_url',
  },
  staging: {
    baseURL: 'autre_url',
  },
}

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) return ENV.dev;
  else if (env.indexOf('staging')) return ENV.staging;
  else return ENV.dev;
};

export default getEnvVars;

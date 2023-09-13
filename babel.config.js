module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Reanimated plugin has to be listed last.
    plugins: ['inline-dotenv', '@babel/plugin-proposal-export-namespace-from', 'react-native-reanimated/plugin'],
  };
};

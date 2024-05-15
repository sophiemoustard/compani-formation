module.exports = function (api) {
  const platform = api.caller(caller => caller && caller.platform);
  const plugins = platform !== 'web' ? ['inline-dotenv'] : [];
  api.cache(true);
  return { presets: ['babel-preset-expo'], plugins };
};

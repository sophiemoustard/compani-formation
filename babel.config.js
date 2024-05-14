module.exports = function (api) {
  const platform = api.caller(caller => caller && caller.platform);
  api.cache(true);
  return { presets: ['babel-preset-expo'], plugins: [platform !== 'web' && 'inline-dotenv'].filter(Boolean) };
};

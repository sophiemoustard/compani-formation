import * as Analytics from 'expo-firebase-analytics';

const logScreenView = screen => Analytics.logEvent('screen_view', { screen_name: screen, screen_class: screen });

export default {
  logScreenView,
};

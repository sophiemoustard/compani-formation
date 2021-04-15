import * as Analytics from 'expo-firebase-analytics';

const logScreenView = screen => Analytics.logEvent(
  'screen_view',
  {
    screen_name: screen,
    screen_class: screen,
    page_title: screen,
    firebase_screen_class: screen,
    firebase_screen: screen,
  }
);

export default {
  logScreenView,
};

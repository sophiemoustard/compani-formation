import * as Analytics from 'expo-firebase-analytics';

const logScreenView = (routeName: string) => Analytics.logEvent(
  'screen_view',
  {
    screen_name: routeName,
    screen_class: routeName,
    page_title: routeName,
    firebase_screen_class: routeName,
    firebase_screen: routeName,
  }
);

export default {
  logScreenView,
};

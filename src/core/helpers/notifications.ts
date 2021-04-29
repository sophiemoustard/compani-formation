import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { BLENDED_COURSE_INSCRIPTION } from '../data/constants';
import { navigationRef } from '../../navigationRef';

export const registerForPushNotificationsAsync = async () => {
  if (!Constants.isDevice) return console.log('Les notifications ne sont pas disponibles sur simulateur');

  const permissions = await Notifications.getPermissionsAsync();
  let finalStatus = permissions.existingStatus;

  if (permissions.existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return console.log('Failed to get push token for push notification!');

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
};

export const _handleNotification = (notification) => {
  console.log('j\'ai reçu ceci : \n', notification);
};

export const _handleNotificationResponse = (response) => {
  const { type, _id } = response.notification.request.content.data;

  switch (type) {
    case BLENDED_COURSE_INSCRIPTION:
      navigationRef.current?.navigate('CourseProfile', { courseId: _id });
      break;
    default:
      return null;
  }
};

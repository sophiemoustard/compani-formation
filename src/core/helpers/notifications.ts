import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { BLENDED_COURSE_INSCRIPTION } from '../data/constants';
import { navigationRef } from '../../navigationRef';

export const registerForPushNotificationsAsync = async () => {
  if (!Constants.isDevice) {
    console.log('Les notifications ne sont pas disponibles sur simulateur');
    return { token: null, status: 'denied' };
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  if (finalStatus !== 'granted') {
    console.log('!granted token', token);
    console.log('Failed to get push token for push notification!');

    return { token, status: 'denied' };
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return { token, status: 'granted' };
};

export const handleNotification = (notification) => {
  console.log('j\'ai reçu ceci : \n', notification);
};

export const handleNotificationResponse = (response) => {
  const { type, _id } = response.notification.request.content.data;

  switch (type) {
    case BLENDED_COURSE_INSCRIPTION:
      return navigationRef.current?.navigate('CourseProfile', { courseId: _id });
    default:
      return null;
  }
};

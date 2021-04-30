import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { BLENDED_COURSE_INSCRIPTION, GRANTED, DENIED } from '../data/constants';
import { navigationRef } from '../../navigationRef';
import asyncStorage from './asyncStorage';
import Users from '../../api/users';

export const registerForPushNotificationsAsync = async () => {
  if (!Constants.isDevice) {
    // eslint-disable-next-line no-console
    console.log('Les notifications ne sont pas disponibles sur simulateur');
    return { token: null, status: DENIED };
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== GRANTED) {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  if (finalStatus !== GRANTED) {
    // eslint-disable-next-line no-console
    console.log('Les notifications sont désactivées sur cet appareil');

    return { token, status: DENIED };
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return { token, status: GRANTED };
};

export const handleNotification = (notification) => {
  // eslint-disable-next-line no-console
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

export const handleExpoToken = async (data) => {
  try {
    const { token, status } = data;

    const userId = await asyncStorage.getUserId();
    if (!userId) return;

    const user = await Users.getById(userId);

    if (token && status === GRANTED) {
      const expoTokenAlreadySaved = user?.formationExpoTokens?.includes(token);
      if (!expoTokenAlreadySaved) {
        await Users.updateById(userId, { formationExpoToken: token });
      }
    }

    if (status === DENIED && user?.formationExpoTokens?.includes(token)) {
      // handleDeletion of expoToken when user remove permissions
    }
  } catch (e) {
    console.error(e);
  }
};

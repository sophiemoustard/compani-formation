import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { GRANTED, DENIED } from '../data/constants';
import asyncStorage from './asyncStorage';
import Users from '../../api/users';

type ExpoTokenAndStatusType = {
  token: string | null,
  status: typeof GRANTED | typeof DENIED,
}

export const registerForPushNotificationsAsync = async (): Promise<ExpoTokenAndStatusType> => {
  if (!Device.isDevice) return { token: null, status: DENIED };

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== GRANTED) {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId: process.env.PROJECT_ID });
  await asyncStorage.setExpoToken(token);

  if (finalStatus !== GRANTED) return { token, status: DENIED };

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      }
    );
  }

  return { token, status: GRANTED };
};

export const handleExpoToken = async (data: ExpoTokenAndStatusType) => {
  try {
    const userId = await asyncStorage.getUserId();
    if (!userId) return;

    const { token, status } = data;
    if (token && status === GRANTED) await Users.addExpoToken(userId, token);
    if (token && status === DENIED) await Users.removeExpoToken(userId, token);
  } catch (e) {
    console.error(e);
  }
};

import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {
  BLENDED_COURSE_REGISTRATION,
  GRANTED, DENIED,
  NEW_ELEARNING_COURSE,
  PEDAGOGY,
  LEARNER,
} from '../data/constants';
import { navigationRef } from '../../navigationRef';
import asyncStorage from './asyncStorage';
import Users from '../../api/users';
import Courses from '../../api/courses';
import Programs from '../../api/programs';
import { BlendedCourseType, ELearningProgramType } from '../../types/CourseTypes';

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

type NotificationRequestDataType = {
  type: typeof BLENDED_COURSE_REGISTRATION | typeof NEW_ELEARNING_COURSE,
  _id: string
};

export const handleNotificationResponse = async (response: Notifications.NotificationResponse) => {
  const { type, _id } = response.notification.request.content.data as NotificationRequestDataType;

  switch (type) {
    case BLENDED_COURSE_REGISTRATION: {
      const course = await Courses.getCourse(_id, PEDAGOGY);

      return navigationRef.current?.navigate('BlendedAbout', { course: course as BlendedCourseType, mode: LEARNER });
    }
    case NEW_ELEARNING_COURSE: {
      const program = await Programs.getELearningPrograms({ _id });

      return navigationRef.current?.navigate('ElearningAbout', { program: program[0] as ELearningProgramType });
    }
    default:
      return null;
  }
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

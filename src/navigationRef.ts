import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './types/NavigationType';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name: keyof RootStackParamList, params?: any) => {
  if (navigationRef.current) navigationRef.current.navigate(name, params);
};

import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export const navigate = (name: string, params?: { screen: string, params: object }) => {
  if (navigationRef.current) navigationRef.current.navigate(name, params);
};

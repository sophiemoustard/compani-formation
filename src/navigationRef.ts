import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export const navigate = (name, params) => {
  if (navigationRef.current) navigationRef.current.navigate(name, params);
};

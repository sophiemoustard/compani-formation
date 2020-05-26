import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AuthenticationScreen from './src/screens/AuthenticationScreen';
import ProgramListScreen from './src/screens/ProgramListScreen';
import CourseListScreen from './src/screens/CourseListScreen';
import CourseProfileScreen from './src/screens/CourseProfileScreen';

const switchNavigator = createSwitchNavigator({
  authenticationFlow: createStackNavigator({
    Authentication: AuthenticationScreen,
  }),
  mainFlow: createBottomTabNavigator({
    courseflow: createStackNavigator({
      CourseList: CourseListScreen,
      CourseProfile: CourseProfileScreen,
    }),
    ProgramList: ProgramListScreen,
  })
});

export default createAppContainer(switchNavigator);

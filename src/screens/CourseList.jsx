import React from 'react';
import { Text, View } from 'react-native';
import screensStyle from '../styles/screens.style';
import PropTypes from 'prop-types';

const CourseListScreen = () => {
  return (
    <View style={screensStyle.container}>
      <Text>Mes formations</Text>
    </View>
  );
};

CourseListScreen.propTypes = {
  navigation: PropTypes.object,
};

export default CourseListScreen;

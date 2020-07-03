
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import NiButton from '../components/form/Button';
import screensStyle from '../styles/screens.style';
import PropTypes from 'prop-types';
import { Context as AuthContext } from '../context/AuthContext';

const CourseListScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={screensStyle.container}>
      <Text>List of courses</Text>
      <NiButton caption="Déconnexion" onPress={signOut} />
    </View>
  );
};

CourseListScreen.propTypes = {
  navigation: PropTypes.object,
};

export default CourseListScreen;

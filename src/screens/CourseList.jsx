
import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import NiButton from '../components/form/Button';
import screensStyle from '../styles/screens.style';

const CourseListScreen = ({ navigation }) => {
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Authentication');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={screensStyle.container}>
      <Text>List of courses</Text>
      <NiButton caption="Déconnexion" onPress={logOut} />
    </View>
  );
}

export default CourseListScreen;

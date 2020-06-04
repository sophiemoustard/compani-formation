
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import NiButton from '../components/form/Button';

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
    <View style={styles.container}>
      <Text>List of courses</Text>
      <NiButton style={styles.button} caption="Déconnexion" onPress={logOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CourseListScreen;


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CourseProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Course profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  },
});

export default CourseProfileScreen;

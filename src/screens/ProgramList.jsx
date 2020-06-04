
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProgramListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>List of programs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProgramListScreen;

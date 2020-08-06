
import React from 'react';
import { Text } from 'react-native';
import commonStyles from '../styles/common';
import { ScrollView } from 'react-native-gesture-handler';

const ProgramListScreen = () => {
  return (
    <ScrollView style={commonStyles.container}>
      <Text style={commonStyles.title}>Catalogue</Text>
    </ScrollView>
  );
};

export default ProgramListScreen;

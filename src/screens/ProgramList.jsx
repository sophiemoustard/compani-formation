import React from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import commonStyles from '../styles/common';

const ProgramListScreen = () => (
  <ScrollView style={commonStyles.container}>
    <Text style={commonStyles.title}>Catalogue</Text>
  </ScrollView>
);

export default ProgramListScreen;

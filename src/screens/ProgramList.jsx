import React from 'react';
import { Text, ScrollView } from 'react-native';
import commonStyles from '../styles/common';

const ProgramListScreen = () => (
  <ScrollView style={commonStyles.container}>
    <Text style={commonStyles.title}>Catalogue</Text>
  </ScrollView>
);

export default ProgramListScreen;

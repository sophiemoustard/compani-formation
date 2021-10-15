import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { GREY } from '../../styles/colors';
import commonStyle from '../../styles/common';

const Spinner = () => (
  <View style={styles.spinner}>
    <ActivityIndicator style={commonStyle.disabled} color={GREY[800]} size="small" />
  </View>
);

export default Spinner;

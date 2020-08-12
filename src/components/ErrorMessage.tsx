import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { MARGIN } from '../styles/metrics';
import { RED } from '../styles/colors';
import { FIRA_SANS_REGULAR } from '../styles/fonts';

const NiErrorMessage = ({ style, message, show }: NiErrorMessageProps) => (
  <View style={style}>
    { show && <Text style={styles.message}>{message}</Text> }
  </View>
);

interface NiErrorMessageProps {
  style?: object,
  message: string,
  show: boolean,
}

const styles = StyleSheet.create({
  message: {
    ...FIRA_SANS_REGULAR.SM,
    marginBottom: MARGIN.SM,
    color: RED,
  },
});

export default NiErrorMessage;

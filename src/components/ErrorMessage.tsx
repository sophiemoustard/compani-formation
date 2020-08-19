import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { MARGIN } from '../styles/metrics';
import { RED } from '../styles/colors';
import { FIRA_SANS_REGULAR } from '../styles/fonts';

interface ErrorMessageProps {
  style?: object,
  message: string,
  show: boolean,
}

const ErrorMessage = ({ style, message, show }: ErrorMessageProps) => (
  <View style={style}>
    { show && <Text style={styles.message}>{message}</Text> }
  </View>
);

const styles = StyleSheet.create({
  message: {
    ...FIRA_SANS_REGULAR.SM,
    marginBottom: MARGIN.SM,
    color: RED,
  },
});

export default ErrorMessage;

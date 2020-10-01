import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GREY, TRANSPARENT_GRADIENT } from '../../styles/colors';
import { BUTTON_HEIGHT, INPUT_HEIGHT, MARGIN } from '../../styles/metrics';

const FooterGradient = () => (
  <LinearGradient style={styles.gradient} colors={[TRANSPARENT_GRADIENT, GREY[100]]} />
);

const styles = StyleSheet.create({
  gradient: {
    height: INPUT_HEIGHT,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: BUTTON_HEIGHT + MARGIN.XL,
  },
});

export default FooterGradient;

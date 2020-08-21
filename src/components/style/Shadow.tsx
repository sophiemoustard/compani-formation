import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GREY } from '../../styles/colors';
import { BORDER_RADIUS } from '../../styles/metrics';

interface ShadowProps {
  backgroundColor?: string,
  borderRadius?: number,
}

const Shadow = ({ backgroundColor = GREY[200], borderRadius = BORDER_RADIUS.SM }: ShadowProps) => (
  <View style={styles(backgroundColor, borderRadius).shadow} />
);

export const styles = (backgroundColor, borderRadius) => StyleSheet.create({
  shadow: {
    position: 'absolute',
    top: 0,
    bottom: -3,
    left: 0,
    right: 0,
    backgroundColor,
    zIndex: -1,
    borderRadius,
  },
});

export default Shadow;
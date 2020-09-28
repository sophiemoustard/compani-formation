import React from 'react';
import { View } from 'react-native';
import { GREY } from '../../styles/colors';
import { BORDER_RADIUS } from '../../styles/metrics';
import { shadowCommonStyle } from './shadowCommonStyle';

interface ShadowProps {
  backgroundColor?: string,
  borderRadius?: number,
  size: any,
}

const Shadow = ({ backgroundColor = GREY[200],
  borderRadius = BORDER_RADIUS.SM,
  size = {
    top: 0,
    bottom: -3,
    left: 0,
    right: 0,
  } }: ShadowProps) => (
  <View style={shadowCommonStyle(backgroundColor, borderRadius, size).shadow} />
);

export default Shadow;

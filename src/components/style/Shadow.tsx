import React from 'react';
import { View } from 'react-native';
import { GREY } from '../../styles/colors';
import { BORDER_RADIUS } from '../../styles/metrics';
import { shadowCommonStyle } from './shadowCommonStyle';

interface ShadowProps {
  backgroundColor?: string,
  borderRadius?: number,
  relativePosition?: { top: number, bottom: number, left: number, right: number},
}

// You should add relative position on parent container
const Shadow = ({
  backgroundColor = GREY[200],
  borderRadius = BORDER_RADIUS.SM,
  relativePosition = { top: 0, bottom: -3, left: 0, right: 0 },
}: ShadowProps) => (
  <View style={shadowCommonStyle(backgroundColor, borderRadius, relativePosition).shadow} />
);

export default Shadow;

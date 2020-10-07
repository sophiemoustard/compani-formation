import React from 'react';
import { View } from 'react-native';
import { BORDER_RADIUS } from '../../styles/metrics';
import { shadowCommonStyle } from '../../styles/shadowCommonStyle';

interface ShadowProps {
  borderRadius?: number,
  customStyle?: any,
  relativePosition?: { top: number, bottom: number, left: number, right: number},
}

// You should add relative position on parent container
const Shadow = ({
  borderRadius = BORDER_RADIUS.SM,
  customStyle,
  relativePosition = { top: 0, bottom: -3, left: 0, right: 0 },
}: ShadowProps) => (
  <View style={[shadowCommonStyle(
    borderRadius,
    relativePosition
  ).shadow, customStyle]} />
);

export default Shadow;

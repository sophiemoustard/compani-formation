import React from 'react';
import { View } from 'react-native';
import { GREY } from '../../styles/colors';
import { BORDER_RADIUS } from '../../styles/metrics';
import { shadowCommonStyle } from './shadowCommonStyle';

interface ShadowProps {
  backgroundColor?: string,
  borderRadius?: number,
  borderTopLeftRadius?: number,
  borderTopRightRadius?: number,
  borderBottomLeftRadius?: number,
  borderBottomRightRadius?: number,
  relativePosition?: { top: number, bottom: number, left: number, right: number},
}

// You should add relative position on parent container
const Shadow = ({
  backgroundColor = GREY[200],
  borderRadius = BORDER_RADIUS.SM,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  relativePosition = { top: 0, bottom: -3, left: 0, right: 0 },
}: ShadowProps) => (
  <View style={shadowCommonStyle(
    backgroundColor,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    relativePosition
  ).shadow} />
);

export default Shadow;

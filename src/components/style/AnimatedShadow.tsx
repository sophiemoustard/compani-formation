import React from 'react';
import { Animated } from 'react-native';
import { BORDER_RADIUS } from '../../styles/metrics';
import { shadowCommonStyle } from '../../styles/shadowCommonStyle';

interface AnimatedShadowProps {
  borderRadius?: number,
  customStyle?: any,
  relativePosition?: {top: number, bottom: number, left: number, right: number},
  animatedStyle,
}

// You should add relative position on parent container
const AnimatedShadow = ({
  borderRadius = BORDER_RADIUS.SM,
  customStyle,
  relativePosition = { top: 0, bottom: -3, left: 0, right: 0 },
  animatedStyle,
}: AnimatedShadowProps) => (
  <Animated.View style={[shadowCommonStyle(
    borderRadius,
    relativePosition
  ).shadow, customStyle, animatedStyle]} />
);

export default AnimatedShadow;

import React from 'react';
import { Animated } from 'react-native';
import { GREY } from '../../styles/colors';
import { BORDER_RADIUS } from '../../styles/metrics';
import { shadowCommonStyle } from './shadowCommonStyle';

interface AnimatedShadowProps {
  backgroundColor?: string,
  borderRadius?: number,
  size: any,
  animatedStyle,
}

// You should add relative position on parent container
const AnimatedShadow = ({
  backgroundColor = GREY[200],
  borderRadius = BORDER_RADIUS.SM,
  size = {
    top: 0,
    bottom: -3,
    left: 0,
    right: 0,
  },
  animatedStyle,
}: AnimatedShadowProps) => (
  <Animated.View style={[shadowCommonStyle(backgroundColor, borderRadius, size).shadow, animatedStyle]} />
);

export default AnimatedShadow;

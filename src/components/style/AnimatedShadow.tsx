import React from 'react';
import { Animated } from 'react-native';
import { GREY } from '../../styles/colors';
import { BORDER_RADIUS } from '../../styles/metrics';
import { shadowStyle } from './style';

interface AnimatedShadowProps {
  backgroundColor?: string,
  borderRadius?: number,
  animatedStyle,
}

// You should add relative position on parent container
const AnimatedShadow = ({
  backgroundColor = GREY[200],
  borderRadius = BORDER_RADIUS.SM,
  animatedStyle,
}: AnimatedShadowProps) => (
  <Animated.View style={[shadowStyle(backgroundColor, borderRadius).shadow, animatedStyle]} />
);

export default AnimatedShadow;

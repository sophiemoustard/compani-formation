import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { GREY } from '../../styles/colors';
import { BORDER_RADIUS } from '../../styles/metrics';

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
  <Animated.View style={[styles(backgroundColor, borderRadius).shadow, animatedStyle]} />
);

const styles = (backgroundColor, borderRadius) => StyleSheet.create({
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

export default AnimatedShadow;

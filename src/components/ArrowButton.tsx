import React from 'react';
import { StyleSheet } from 'react-native';
import { ICON, BORDER_RADIUS, BORDER_WIDTH, BUTTON_HEIGHT } from '../styles/metrics';
import commonStyle from '../styles/common';
import IconButton from './IconButton';
import { PINK } from '../styles/colors';
import { LEFT, RIGHT } from '../core/data/constants';

interface ArrowButtonProps {
  direction: typeof LEFT | typeof RIGHT,
  onPress: () => void,
  disabled?: boolean,
  color?: string,
}

interface StylesProps {
  borderColor: string,
}

const ArrowButton = ({ direction, onPress, disabled = false, color = PINK['500'] }: ArrowButtonProps) => {
  const coloredStyle = styles({ borderColor: color });

  return (
    <IconButton disabled={disabled} name={direction === LEFT ? 'arrow-left' : 'arrow-right' } onPress={onPress}
      size={ICON.MD} color={color} style={[coloredStyle.container, disabled && commonStyle.disabled]} />
  );
};

const styles = ({ borderColor }: StylesProps) => StyleSheet.create({
  container: {
    height: BUTTON_HEIGHT,
    width: BUTTON_HEIGHT,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ArrowButton;

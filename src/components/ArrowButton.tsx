import React from 'react';
import { StyleSheet } from 'react-native';
import { MARGIN, ICON, BORDER_RADIUS, BORDER_WIDTH } from '../styles/metrics';
import commonStyle from '../styles/common';
import IconButton from './IconButton';
import { GREY } from '../styles/colors';
import { LEFT, RIGHT } from '../core/data/constants';

interface ArrowButtonProps {
  direction: typeof LEFT | typeof RIGHT,
  onPress: () => void,
  disabled?: boolean,
  color?: string,
}

const ArrowButton = ({ direction, onPress, disabled = false, color = GREY['700'] }: ArrowButtonProps) => (
  <IconButton disabled={disabled} name={direction === LEFT ? 'arrow-left' : 'arrow-right' } onPress={onPress}
    size={ICON.LG} color={color}
    style={[{ ...styles.container, borderColor: color }, disabled && commonStyle.disabled]} />
);

const styles = StyleSheet.create({
  container: {
    marginBottom: MARGIN.XL,
    marginHorizontal: MARGIN.MD,
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: BORDER_WIDTH,
    padding: MARGIN.MD,
  },
});

export default ArrowButton;

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MARGIN, ICON, BORDER_RADIUS, BORDER_WIDTH } from '../styles/metrics';
import commonStyle from '../styles/common';
import IconButton from './IconButton';
import { GREY } from '../styles/colors';

interface ArrowButtonProps {
  direction: 'left' | 'right',
  onPress: () => void,
  disabled?: boolean,
  color?: string,
}

const ArrowButton = ({ direction, onPress, disabled = false, color = GREY['700'] }: ArrowButtonProps) => (
  <TouchableOpacity disabled={disabled}
    style={[{ ...styles.container, borderColor: color }, disabled && commonStyle.disabled]}>
    <IconButton disabled={disabled} name={direction === 'left' ? 'arrow-left' : 'arrow-right' } onPress={onPress}
      size={ICON.LG} color={color} style={styles.closeButton} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: MARGIN.XL,
    marginHorizontal: MARGIN.MD,
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: BORDER_WIDTH,
  },
  closeButton: {
    margin: MARGIN.MD,
  },
});

export default ArrowButton;

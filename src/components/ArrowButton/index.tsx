import React from 'react';
import { ICON } from '../../styles/metrics';
import commonStyle from '../../styles/common';
import IconButton from '../IconButton';
import { PINK } from '../../styles/colors';
import { LEFT, RIGHT } from '../../core/data/constants';
import styles from './styles';

interface ArrowButtonProps {
  direction: typeof LEFT | typeof RIGHT,
  onPress: () => void,
  disabled?: boolean,
  color?: string,
}

const ArrowButton = ({ direction, onPress, disabled = false, color = PINK[500] }: ArrowButtonProps) => {
  const coloredStyle = styles({ borderColor: color });

  return (
    <IconButton disabled={disabled} name={direction === LEFT ? 'arrow-left' : 'arrow-right' } onPress={onPress}
      size={ICON.MD} color={color} style={[coloredStyle.container, disabled && commonStyle.disabled]} />
  );
};

export default ArrowButton;

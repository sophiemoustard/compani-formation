import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import commonStyle from '../styles/common';
import { FEATHER } from '../core/data/constants';

interface IconButtonProps {
  iconFamily?: string,
  onPress: () => void,
  color: string,
  name: string,
  size: number,
  style?: object,
  disabled?: boolean,
}

const IconButton = ({ iconFamily = FEATHER, onPress, name, color, size, style, disabled = false }: IconButtonProps) => {
  if (iconFamily === FEATHER) {
    return (
      <TouchableOpacity disabled={disabled} onPress={onPress} style={[style, disabled && commonStyle.disabled]}>
        <Feather name={name} size={size} color={color} />
      </TouchableOpacity>
    );
  }

  return null;
};

export default IconButton;

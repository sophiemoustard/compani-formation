import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FEATHER } from '../core/data/constants';

interface IconButtonProps {
  iconFamily: string,
  onPress: () => {},
  color: string,
  name: string,
  size: number,
  style?: object,
}

const IconButton = ({ iconFamily, onPress, name, color, size, style }: IconButtonProps) => {
  if (iconFamily === FEATHER) {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <Feather name={name} size={size} color={color} />
      </TouchableOpacity>
    );
  }

  return null;
};

IconButton.defaultProps = {
  iconFamily: FEATHER,
};

export default IconButton;

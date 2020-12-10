import React from 'react';
import { TouchableOpacity, Insets } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import commonStyle from '../../styles/common';
import { FEATHER, IONICONS } from '../../core/data/constants';
import styles from './styles';

interface IconButtonProps {
  iconFamily?: string,
  onPress: () => void,
  color: string,
  name: string,
  size: number,
  style?: object,
  disabled?: boolean,
  hitSlop?: Insets,
}

const IconButton = ({
  iconFamily = FEATHER,
  onPress,
  name,
  color,
  size,
  style,
  disabled = false,
  hitSlop = { top: 12, bottom: 12, left: 12, right: 12 },
}: IconButtonProps) => {
  const renderIcon = () => {
    switch (iconFamily) {
      case FEATHER:
        return (<Feather name={name} size={size} color={color} />);
      case IONICONS:
        return (<Ionicons name={name} size={size} color={color} />);
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={[style, disabled && commonStyle.disabled, styles.button]}
      disabled={disabled} hitSlop={hitSlop}>
      {renderIcon()}
    </TouchableOpacity>
  );
};

export default IconButton;

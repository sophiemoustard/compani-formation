import React from 'react';
import { TouchableOpacity, Insets } from 'react-native';
import { Feather } from '@expo/vector-icons';
import commonStyle from '../../../styles/common';
import { FeatherType } from '../../../types/FeatherType';

interface FeatherButtonProps {
  onPress: () => void,
  name: FeatherType,
  color: string,
  size: number,
  style?: object,
  disabled?: boolean,
  hitSlop?: Insets,
}

const FeatherButton = ({
  onPress,
  name,
  color,
  size,
  style,
  disabled = false,
  hitSlop = { top: 12, bottom: 12, left: 12, right: 12 },
}: FeatherButtonProps) => (
  <TouchableOpacity onPress={onPress} style={[style, disabled && commonStyle.disabled, commonStyle.iconButton]}
    disabled={disabled} hitSlop={hitSlop}>
    <Feather name={name} size={size} color={color} />
  </TouchableOpacity>
);

export default FeatherButton;

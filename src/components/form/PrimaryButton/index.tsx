import React from 'react';
import NiButton from '../Button';
import { PINK, WHITE } from '../../../styles/colors';

interface PrimaryButtonProps {
  customStyle?: Object,
  caption: string,
  onPress: () => void,
  loading?: boolean,
  bgColor?: string,
  color?: string,
  disabled?: boolean,
}

const PrimaryButton = ({
  customStyle,
  caption,
  onPress,
  loading = false,
  bgColor = PINK[500],
  color = WHITE,
  disabled = false,
}: PrimaryButtonProps) => (
  <NiButton customStyle={customStyle} caption={caption} onPress={onPress} loading={loading} disabled={disabled}
    bgColor={bgColor} borderColor={bgColor} color={color} />
);

export default PrimaryButton;

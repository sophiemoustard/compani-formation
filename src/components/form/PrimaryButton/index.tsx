import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import commonStyle from '../../../styles/common';
import { PINK, WHITE } from '../../../styles/colors';
import styles from './styles';

interface PrimaryButtonProps {
  style?: Object,
  caption: string,
  onPress: () => void,
  loading?: boolean,
  bgColor?: string,
  color?: string,
  disabled?: boolean,
}

const PrimaryButton = (
  {
    style,
    caption,
    onPress,
    loading = false,
    bgColor = PINK[500],
    color = WHITE,
    disabled = false,
  }: PrimaryButtonProps
) => {
  const buttonStyle = { ...styles.button, backgroundColor: bgColor, borderColor: bgColor };

  return (
    <TouchableOpacity style={[style, buttonStyle]} onPress={onPress} disabled={loading || disabled} testID={caption}>
      {!loading && <Text style={{ ...styles.textButton, color }}>{caption}</Text>}
      {loading && <ActivityIndicator style={commonStyle.disabled} color={color} size="small" />}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

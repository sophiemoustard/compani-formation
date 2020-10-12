import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import commonStyle from '../../../styles/common';
import { PINK, WHITE } from '../../../styles/colors';
import styles from './styles';

interface ButtonProps {
  style?: Object,
  caption: string,
  onPress: () => void,
  loading?: boolean,
  bgColor?: string,
  color?: string,
  borderColor?: string,
  disabled?: boolean,
}

const Button = (
  {
    style,
    caption,
    onPress,
    loading = false,
    bgColor = PINK[500],
    color = WHITE,
    borderColor = PINK[500],
    disabled = false,
  }: ButtonProps
) => {
  const buttonStyle = { ...styles.button, backgroundColor: bgColor, borderColor };

  return (
    <TouchableOpacity style={[style, buttonStyle]} onPress={onPress} disabled={loading || disabled} testID={caption}>
      {!loading && <Text style={{ ...styles.textButton, color }}>{caption}</Text>}
      {loading && <ActivityIndicator style={commonStyle.disabled} color={color} size="small" />}
    </TouchableOpacity>
  );
};

export default Button;

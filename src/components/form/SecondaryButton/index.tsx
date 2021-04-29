import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import commonStyle from '../../../styles/common';
import { GREY } from '../../../styles/colors';
import styles from './styles';

interface SecondaryButtonProps {
  style?: Object,
  caption: string,
  onPress: () => void,
  loading?: boolean,
  bgColor?: string,
  color?: string,
  borderColor?: string,
  disabled?: boolean,
}

const SecondaryButton = (
  {
    style,
    caption,
    onPress,
    loading = false,
    bgColor = GREY[100],
    color = GREY[600],
    disabled = false,
  }: SecondaryButtonProps
) => {
  const buttonStyle = { ...styles.button, backgroundColor: bgColor, borderColor: color };

  return (
    <TouchableOpacity style={[style, buttonStyle]} onPress={onPress} disabled={loading || disabled} testID={caption}>
      {!loading && <Text style={{ ...styles.textButton, color }}>{caption}</Text>}
      {loading && <ActivityIndicator style={commonStyle.disabled} color={color} size="small" />}
    </TouchableOpacity>
  );
};

export default SecondaryButton;

import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import commonStyle from '../../../styles/common';
import { PINK, WHITE } from '../../../styles/colors';
import styles from './styles';

interface PrimaryButtonProps {
  customStyle?: Object,
  caption: string,
  onPress: () => void,
  loading?: boolean,
  bgColor?: string,
  color?: string,
  disabled?: boolean,
}

const PrimaryButton = (
  {
    customStyle,
    caption,
    onPress,
    loading = false,
    bgColor = PINK[500],
    color = WHITE,
    disabled = false,
  }: PrimaryButtonProps
) => {
  const [style, setStyle] = useState<{ button: object, textButton: object}>(styles(bgColor, color));

  useEffect(() => { setStyle(styles(bgColor, color)); }, [bgColor, color]);

  return (
    <TouchableOpacity style={[style.button, customStyle]} onPress={onPress} disabled={loading || disabled}
      testID={caption}>
      {!loading && <Text style={{ ...style.textButton, color }}>{caption}</Text>}
      {loading && <ActivityIndicator style={commonStyle.disabled} color={color} size="small" />}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

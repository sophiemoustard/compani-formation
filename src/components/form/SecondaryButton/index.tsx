import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import commonStyle from '../../../styles/common';
import { GREY } from '../../../styles/colors';
import styles from './styles';

interface SecondaryButtonProps {
  customStyle?: Object,
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
    customStyle,
    caption,
    onPress,
    loading = false,
    bgColor = GREY[100],
    color = GREY[600],
    disabled = false,
  }: SecondaryButtonProps
) => {
  const [style, setStyle] = useState<{ button: object, textButton: object}>(styles(bgColor, color));

  useEffect(() => { setStyle(styles(bgColor, color)); }, [bgColor, color]);

  return (
    <TouchableOpacity style={[customStyle, style.button]} onPress={onPress} disabled={loading || disabled}
      testID={caption}>
      {!loading && <Text style={{ ...style.textButton, color }}>{caption}</Text>}
      {loading && <ActivityIndicator style={commonStyle.disabled} color={color} size="small" />}
    </TouchableOpacity>
  );
};

export default SecondaryButton;

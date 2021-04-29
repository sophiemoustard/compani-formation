import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import commonStyle from '../../../styles/common';
import styles, { ButtonStyleType } from './styles';

interface ButtonProps {
  customStyle?: Object,
  caption: string,
  onPress: () => void,
  loading: boolean,
  bgColor: string,
  borderColor: string,
  color: string,
  disabled: boolean,
}

const Button = ({
  customStyle,
  caption,
  onPress,
  loading,
  bgColor,
  borderColor,
  color,
  disabled,
}: ButtonProps) => {
  const [style, setStyle] = useState<ButtonStyleType>(styles(bgColor, borderColor, color));

  useEffect(() => { setStyle(styles(bgColor, borderColor, color)); }, [bgColor, borderColor, color]);

  return (
    <TouchableOpacity style={[style.button, customStyle]} onPress={onPress} disabled={loading || disabled}
      testID={caption}>
      {!loading && <Text style={{ ...style.textButton, color }}>{caption}</Text>}
      {loading && <ActivityIndicator style={commonStyle.disabled} color={color} size="small" />}
    </TouchableOpacity>
  );
};

export default Button;

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { BORDER_RADIUS, INPUT_HEIGHT, MARGIN, BORDER_WIDTH } from '../../styles/metrics';
import commonStyle from '../../styles/common';
import { PINK, WHITE } from '../../styles/colors';
import { FIRA_SANS_BLACK } from '../../styles/fonts';

interface ButtonProps {
  style?: Object,
  caption: string,
  onPress: () => void,
  loading?: boolean,
  bgColor?: string,
  color?: string,
  borderColor?: string
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
  }: ButtonProps
) => {
  const buttonStyle = { ...styles.button, backgroundColor: bgColor, borderColor };

  return (
    <TouchableOpacity style={[style, buttonStyle]}
      onPress={onPress} disabled={loading} testID={caption}>
      { !loading && <Text style={{ ...styles.textButton, color }}>{caption}</Text> }
      { loading && <ActivityIndicator style={commonStyle.disabled} color={color} size="small" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    height: INPUT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  textButton: {
    ...FIRA_SANS_BLACK.MD,
    marginHorizontal: MARGIN.SM,
  },
});

export default Button;

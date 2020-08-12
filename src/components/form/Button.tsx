import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { BORDER_RADIUS, INPUT_HEIGHT, MARGIN, BORDER_WIDTH } from '../../styles/metrics';
import { PINK, WHITE } from '../../styles/colors';
import { FIRA_SANS_BLACK } from '../../styles/fonts';

interface NiButtonProps {
  style?: Object,
  caption: string,
  onPress: () => void,
  loading?: boolean,
  bgColor: string,
  color: string,
  borderColor: string
}

const NiButton = ({ style, caption, onPress, loading, bgColor, color, borderColor }: NiButtonProps) => {
  const buttonStyle = { ...styles.button, backgroundColor: bgColor, borderColor };

  return (
    <TouchableOpacity style={[style, loading ? styles.loading : '', buttonStyle]}
      onPress={onPress} disabled={loading} testID={caption}>
      { !loading && <Text style={{ ...styles.textButton, color }}>{caption}</Text> }
      { loading && <ActivityIndicator style={styles.loading} color={color} size="small" />}
    </TouchableOpacity>
  );
};

NiButton.defaultProps = {
  loading: false,
  bgColor: PINK[500],
  color: WHITE,
  borderColor: PINK[500],
};

const styles = StyleSheet.create({
  loading: {
    opacity: 0.6,
  },
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

export default NiButton;

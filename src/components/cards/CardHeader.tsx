import React from 'react';
import { StyleSheet } from 'react-native';
import IconButton from '../IconButton';
import { ICON, ICON_BUTTON_HEIGHT } from '../../styles/metrics';
import { GREY } from '../../styles/colors';

interface CardHeaderProps {
  onPress: () => void,
  color?: string,
}

const CardHeader = ({ onPress, color = GREY['700'] }: CardHeaderProps) => (
  <IconButton name='x-circle' onPress={onPress} size={ICON.LG} color={color} style={styles.closeButton} />
);

const styles = StyleSheet.create({
  closeButton: {
    width: ICON_BUTTON_HEIGHT,
    height: ICON_BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardHeader;

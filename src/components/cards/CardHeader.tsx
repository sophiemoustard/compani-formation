import React from 'react';
import { StyleSheet } from 'react-native';
import IconButton from '../IconButton';
import { ICON, MARGIN } from '../../styles/metrics';
import { GREY } from '../../styles/colors';

interface CardHeaderProps {
  onPress: () => void,
}

const CardHeader = ({ onPress }: CardHeaderProps) => (
  <IconButton name='x-circle' onPress={() => onPress() } size={ICON.LG}
    color={GREY['700']} style={styles.closeButton} />
);

const styles = StyleSheet.create({
  closeButton: {
    margin: MARGIN.MD,
  },
});

export default CardHeader;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../IconButton';
import { ICON, MARGIN } from '../../styles/metrics';
import { GREY } from '../../styles/colors';

interface CardHeaderProps {
  onPress: () => void,
  color?: string,
}

const CardHeader = ({ onPress, color = GREY['700'] }: CardHeaderProps) => (
  <View style={styles.container}>
    <IconButton name='x-circle' onPress={onPress} size={ICON.LG} color={color} style={styles.closeButton} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: MARGIN.XL,
    marginTop: MARGIN.MD,
    marginLeft: MARGIN.MD,
  },
  closeButton: {
    width: ICON.LG,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardHeader;

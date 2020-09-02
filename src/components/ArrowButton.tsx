import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MARGIN, ICON, BORDER_RADIUS, BORDER_WIDTH } from '../styles/metrics';
import IconButton from './IconButton';
import { GREY } from '../styles/colors';

interface ArrowButtonProps {
  direction: 'left' | 'right',
  onPress: () => void,
}

const ArrowButton = ({ direction, onPress }: ArrowButtonProps) => (
  <TouchableOpacity style={styles.container}>
    <IconButton name={direction === 'left' ? 'arrow-left' : 'arrow-right' } onPress={onPress} size={ICON.LG}
      color={GREY['000']} style={styles.closeButton} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: MARGIN.DOUBLEMD,
    marginHorizontal: MARGIN.MD,
    borderRadius: BORDER_RADIUS.LG,
    borderColor: GREY['000'],
    borderWidth: BORDER_WIDTH,
  },
  closeButton: {
    margin: MARGIN.MD,
  },
});

export default ArrowButton;

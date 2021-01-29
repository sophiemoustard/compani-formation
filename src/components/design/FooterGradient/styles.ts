import { StyleSheet } from 'react-native';

const styles = (bottomPosition: number, height: number) => StyleSheet.create({
  gradient: {
    height,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: bottomPosition,
  },
});

export default styles;

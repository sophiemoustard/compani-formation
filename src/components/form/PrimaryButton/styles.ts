import { StyleSheet } from 'react-native';
import commonStyle from '../../../styles/common';

const styles = (bgColor, color) => StyleSheet.create({
  button: {
    backgroundColor: bgColor,
    borderColor: bgColor,
    ...commonStyle.button,
  },
  textButton: {
    color,
    ...commonStyle.textButton,
  },
});

export default styles;

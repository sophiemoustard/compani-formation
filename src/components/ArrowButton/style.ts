import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BORDER_WIDTH, BUTTON_HEIGHT } from '../../styles/metrics';

interface StylesProps {
  borderColor: string,
}

const styles = ({ borderColor }: StylesProps) => StyleSheet.create({
  container: {
    height: BUTTON_HEIGHT,
    width: BUTTON_HEIGHT,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;

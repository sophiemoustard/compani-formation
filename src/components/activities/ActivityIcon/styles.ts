import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BORDER_WIDTH, PADDING, MARGIN } from '../../../styles/metrics';

interface StylesProps {
  buttonBorderColor: string,
  buttonBackgroundColor: string,
}

const styles = ({ buttonBorderColor, buttonBackgroundColor }: StylesProps) => StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: MARGIN.SM,
  },
  button: {
    backgroundColor: buttonBackgroundColor,
    borderRadius: BORDER_RADIUS.MD,
    borderColor: buttonBorderColor,
    borderWidth: BORDER_WIDTH,
    padding: PADDING.LG,
  },
  icon: {
    alignSelf: 'center',
  },
  shadow: {
    backgroundColor: buttonBorderColor,
    borderRadius: BORDER_RADIUS.MD,
  },
});

export default styles;

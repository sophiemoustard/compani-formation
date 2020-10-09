import { StyleSheet } from 'react-native';
import { GREEN, YELLOW } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, PADDING, MARGIN } from '../../../styles/metrics';

interface StylesProps {
  buttonBorderColor: string,
  isCompleted: Boolean,
}

const styles = ({ buttonBorderColor, isCompleted }: StylesProps) => StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: MARGIN.SM,
  },
  button: {
    backgroundColor: isCompleted ? GREEN[300] : YELLOW[300],
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

import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BORDER_WIDTH, PADDING, MARGIN } from '../../../styles/metrics';

interface StylesProps {
  borderColor: string,
  backgroundColor: string,
}

const styles = ({ borderColor, backgroundColor }: StylesProps) => StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: MARGIN.SM,
  },
  button: {
    backgroundColor,
    borderRadius: BORDER_RADIUS.MD,
    borderColor,
    borderWidth: BORDER_WIDTH,
    padding: PADDING.LG,
  },
  icon: {
    alignSelf: 'center',
  },
  shadow: {
    backgroundColor: borderColor,
    borderRadius: BORDER_RADIUS.MD,
  },
});

export default styles;

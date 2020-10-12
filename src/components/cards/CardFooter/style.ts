import { StyleSheet } from 'react-native';
import { BUTTON_HEIGHT, MARGIN } from '../../../styles/metrics';

interface StylesProps {
  justifyContent: 'flex-end' | 'space-between' | 'flex-start',
}

const styles = ({ justifyContent }: StylesProps) => StyleSheet.create({
  container: {
    minHeight: BUTTON_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    justifyContent,
    marginBottom: MARGIN.XL,
    marginHorizontal: MARGIN.LG,
  },
});

export default styles;

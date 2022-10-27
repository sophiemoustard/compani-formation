import { StyleSheet } from 'react-native';
import { BUTTON_HEIGHT, MARGIN } from '../../../styles/metrics';

export type StylesPropsType = {
  justifyContent: 'flex-end' | 'space-between' | 'flex-start',
}

const styles = ({ justifyContent }: StylesPropsType) => StyleSheet.create({
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

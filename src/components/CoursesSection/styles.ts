import { StyleSheet } from 'react-native';
import { MAIN_MARGIN_LEFT, MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  courseContainer: {
    paddingHorizontal: MAIN_MARGIN_LEFT,
  },
  sectionContainer: {
    marginBottom: MARGIN.LG,
  },
  separator: {
    marginRight: MARGIN.SM,
  },
});

export default styles;

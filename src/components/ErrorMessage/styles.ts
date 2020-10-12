import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { RED } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';

const styles = StyleSheet.create({
  message: {
    ...FIRA_SANS_REGULAR.SM,
    marginBottom: MARGIN.SM,
    color: RED,
  },
});

export default styles;

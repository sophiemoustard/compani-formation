import { StyleSheet } from 'react-native';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 128,
    alignItems: 'center',
  },
  activityName: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'center',
  },
});

export default styles;

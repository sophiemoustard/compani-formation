import { StyleSheet } from 'react-native';
import { PINK } from '../../styles/colors';
import { MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: MARGIN.MD,
  },
  buttonText: {
    ...FIRA_SANS_MEDIUM.MD,
    color: PINK[500],
  },
  modalGoBack: {
    alignSelf: 'flex-end',
  },
  loading: {
    paddingHorizontal: PADDING.SM,
    position: 'absolute',
    right: 40,
  },
  goBack: {
    alignSelf: 'flex-end',
  },
});

export default styles;

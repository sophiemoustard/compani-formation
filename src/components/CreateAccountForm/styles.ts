import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_ITALIC } from '../../styles/fonts';
import { GREY } from '../../styles/colors';

export default StyleSheet.create({
  modalText: {
    ...FIRA_SANS_ITALIC.SM,
    color: GREY[600],
    marginBottom: MARGIN.LG,
  },
  modalLink: {
    textDecorationLine: 'underline',
  },
});

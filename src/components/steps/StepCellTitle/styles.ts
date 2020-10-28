import { StyleSheet } from 'react-native';
import { MARGIN } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import { NUNITO_SEMI, FIRA_SANS_MEDIUM } from '../../../styles/fonts';

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    marginLeft: MARGIN.LG,
  },
  stepType: {
    ...NUNITO_SEMI.XS,
    color: GREY[600],
  },
  stepName: {
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY[800],
  },
});

export default styles;

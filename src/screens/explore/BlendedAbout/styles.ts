import { StyleSheet } from 'react-native';
import { GREY } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_BOLD, NUNITO_SEMI } from '../../../styles/fonts';

const styles = StyleSheet.create({
  content: {
    marginHorizontal: MARGIN.MD,
  },
  sectionTitle: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.MD,
    color: GREY[900],
  },
  internalRulesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GREY[200],
    marginVertical: MARGIN.LG,
  },
  internalRules: {
    marginVertical: MARGIN.XXL,
    ...NUNITO_SEMI.XS,
    color: GREY[600],
    textDecorationLine: 'underline',
  },
});

export default styles;

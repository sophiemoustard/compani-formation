import { StyleSheet } from 'react-native';
import { GREY, TRANSPARENT_GREY } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, ICON, MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_REGULAR, FIRA_SANS_BOLD, FIRA_SANS_MEDIUM, NUNITO_SEMI } from '../../../styles/fonts';

const styles = StyleSheet.create({
  content: {
    marginHorizontal: MARGIN.MD,
  },
  sectionTitle: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.MD,
    color: GREY[900],
  },
  sectionContent: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREY[800],
    marginBottom: MARGIN.MD,
  },
  subSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: MARGIN.SM,
  },
  subSectionTitle: {
    ...FIRA_SANS_MEDIUM.LG,
    color: GREY[900],
    flexWrap: 'wrap',
    flex: 1,
  },
  trainerPicture: {
    height: ICON.XXL,
    width: ICON.XXL,
    marginRight: MARGIN.MD,
    borderRadius: BORDER_RADIUS.XXL,
    borderWidth: BORDER_WIDTH,
    borderColor: TRANSPARENT_GREY,
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

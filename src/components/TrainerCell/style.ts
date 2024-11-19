import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BORDER_WIDTH, ICON, MARGIN } from '../../styles/metrics';
import { GREY, TRANSPARENT_GREY } from '../../styles/colors';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../styles/fonts';

const styles = StyleSheet.create({
  sectionContent: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREY[800],
    marginBottom: MARGIN.MD,
  },
  subSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: MARGIN.SM,
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
});

export default styles;

import { StyleSheet } from 'react-native';
import { GREY, TRANSPARENT_GREY, GREEN, ORANGE } from '../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, ICON, MARGIN } from '../../styles/metrics';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: MARGIN.SM,
  },
  image: {
    height: ICON.XXL,
    width: ICON.XXL,
    marginRight: MARGIN.MD,
    borderRadius: BORDER_RADIUS.XXL,
    borderWidth: BORDER_WIDTH,
    borderColor: TRANSPARENT_GREY,
  },
  text: {
    flex: 1,
  },
  name: {
    ...FIRA_SANS_MEDIUM.LG,
    color: GREY[900],
  },
  email: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREY[500],
  },
  connected: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREEN[500],
  },
  code: {
    ...FIRA_SANS_REGULAR.MD,
    color: ORANGE[500],
  },
});

export default styles;

import { StyleSheet } from 'react-native';
import { ORANGE, PINK } from '../../styles/colors';
import { BORDER_RADIUS, MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR, FIRA_SANS_ITALIC } from '../../styles/fonts';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: MARGIN.SM,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.MD,
    marginLeft: MARGIN.SM,
  },
  warningIcon: {
    marginTop: MARGIN.SM,
  },
  warningMessage: {
    ...FIRA_SANS_REGULAR.MD,
    backgroundColor: ORANGE[100],
    padding: PADDING.MD,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    color: ORANGE[900],
    borderRadius: BORDER_RADIUS.MD,
    marginBottom: MARGIN.MD,

  },
  body: {
    ...FIRA_SANS_REGULAR.MD,
  },
  unvalid: {
    ...FIRA_SANS_ITALIC.SM,
    color: ORANGE[600],
    marginHorizontal: MARGIN.SM,
    marginBottom: MARGIN.SM,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    marginHorizontal: MARGIN.LG,
    marginVertical: MARGIN.MD,
    flexDirection: 'row',
  },
  button: {
    ...FIRA_SANS_REGULAR.MD,
    color: PINK[500],
  },
});

export default styles;
